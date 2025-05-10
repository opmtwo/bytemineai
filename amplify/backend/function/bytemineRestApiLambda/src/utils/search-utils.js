const { updateBytemineContact, createBytemineContact, deleteBytemineContact } = require('../graphql/mutations');
const { getBytemineContact } = require('../graphql/queries');
const { apsGql } = require('./aps-utils');
const { atDataVerifyEmailAccounts } = require('./atdata-utils');
const { esGetById2, esSearch2 } = require('./es-utils-v2');
const { usageAddUsage } = require('../utils/usage-utils');

const BATCH_SIZE = 100;

const searchContactsV2 = async (body, shouldReturnError = false, mask = true, append = false, api = false) => {
	console.log('searchContactsV2', JSON.stringify({ body }));

	let response = {};

	// -------------------------------------------------------------------------
	// Unlock all?
	// -------------------------------------------------------------------------
	if (body.unlockAll) {
		mask = false;
		try {
			response = await esSearch2(body, mask, append, api);
			let response2 = {};
			response2.contacts = [];
			response.contacts.forEach(async (contact) => {
				let newContact = await atDataVerifyEmailAccounts(contact);
				response2.contacts.push(newContact);
			});
			return response2;
		} catch (err) {
			console.log('searchContacts - error - ', err);
			if (shouldReturnError) {
				return err;
			}
			return;
		}
	}

	// -------------------------------------------------------------------------
	// Search mode only - need to return masked data
	// -------------------------------------------------------------------------
	try {
		let savedFindCount = 0;
		let iter = 0;
		let response = { contacts: [] }; // Ensure `response` is initialized

		if (body.excludeExisting) {
			// Initialize the response contacts array
			response.contacts = [];

			// Keep fetching contacts until we meet the requested page size
			while (response.contacts.length < body.pageSize) {
				let newResponse;

				if (iter > 0) {
					// Fetch next batch of contacts
					newResponse = await esSearch2(body, mask, append, api);
				} else {
					// Initial fetch
					newResponse = await esSearch2(body, mask, append, api);
					response = newResponse;
				}

				if (iter > 0 && newResponse?.contacts?.length) {
					// Append new contacts only if they exist
					response.contacts = [...response.contacts, ...newResponse.contacts];
				}

				iter++;

				// Extract all PIDs from the contacts
				const pids = response.contacts.map((item) => item.pid);
				const savedContacts = await getAllSavedContacts(pids, body.teamId);

				console.log('excludeExisting - pids:', pids);
				console.log('excludeExisting - saved contacts length:', savedContacts.length);
				console.log('excludeExisting - body.teamId:', body.teamId);

				if (savedContacts?.length) {
					for (let i = 0; i < savedContacts.length; i++) {
						const saved = savedContacts[i];

						// Only exclude if the contact is unlocked
						if (saved?.is_unlocked !== true) {
							continue;
						}

						const index = response.contacts.findIndex((item) => item.pid === saved.pid);
						if (index !== -1) {
							response.contacts.splice(index, 1);
							savedFindCount++;
							console.log('savedFindCount:', savedFindCount);
						}
					}
				}

				// Advance to the next page for pagination
				body.page = body.page + 1;

				// If esSearch2 returns no more contacts, break to avoid infinite loop
				if (!newResponse?.contacts?.length) {
					break;
				}
			}

			// Trim excess contacts to meet the exact page size
			if (response.contacts.length > body.pageSize) {
				response.contacts = response.contacts.slice(0, body.pageSize);
			}

			return response;
		} else {
			// If excludeExisting is false, just return the search result
			response = await esSearch2(body, mask, append, api);
			return response;
		}
	} catch (err) {
		console.log('searchContacts - error:', err);
		if (shouldReturnError) {
			return err;
		}
		// Return undefined or null explicitly for clarity
		return null;
	}
};

const getContact = async (pid) => {
	try {
		const contact = await esGetById2(pid);
		const contactVerified = await atDataVerifyEmailAccounts(contact);
		console.log('getContact - success', JSON.stringify(contactVerified));
		return { data: contactVerified };
	} catch (err) {
		console.log('getContact - error', err);
	}
};

const getAllContacts = async (pids) => {
	console.log('getAllContacts', { pids });

	let promises = [];
	let results = [];

	// Save all contacts using batches
	for (let i = 0; i < pids.length; i++) {
		console.log('getAllContacts- fetching contact', i + 1);
		promises.push(getContact(pids[i]));

		// Execute batch if size exceeds limit
		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.all(promises));
			promises = [];
		}
	}

	// Complete final batch
	results = results.concat(await Promise.all(promises));
	console.log('getAllContacts', { results: results.length, sample: JSON.stringify(results?.[0]) });

	// Filter and extract valid contacts
	const contacts = results.filter((item) => item?.data?.pid).map((item) => item.data);
	//const validResults = results.filter((item) => item.status === 'fulfilled' && item.value?.status === 200 && item.value?.data?.pid);

	// All done
	console.log('getAllContacts', { contacts: contacts.length });
	return contacts;
};

const saveOrUpdateContact = async (contact, teamId, userId, isUpdate = false, isUnlocked = false) => {
	console.log('saveOrUpdateContact', JSON.stringify({ contact }));
	const operation = isUpdate ? updateBytemineContact : createBytemineContact;
	const input = {
		...contact,
		id: `${contact?.pid}-${teamId}`,
		owner: userId,
		userId,
		teamId,
		is_unlocked: isUnlocked,
	};
	return await apsGql(operation, { input });
};

const saveAllContacts = async (contacts, teamId, userId, isUpdate = false, isUnlocked = false) => {
	console.log('saveAllContacts', { contacts: contacts.length, teamId, userId, isUpdate, isUnlocked });

	let promises = [];
	let results = [];

	// Save all contacts using batches
	for (let i = 0; i < contacts.length; i++) {
		console.log('saveAllContacts- saving contact', i + 1);
		promises.push(saveOrUpdateContact(contacts[i], teamId, userId, isUpdate, isUnlocked));

		// Execute batch if size exceeds limit
		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.all(promises));
			promises = [];
		}
	}

	// Complete final batch
	results = results.concat(await Promise.allSettled(promises));
	console.log('saveAllContacts', { results: results.length });

	// Reset promises
	promises = [];

	// Find the contacts that were created
	let createdContacts = [];
	for (let i = 0; i < results.length; i++) {
		if (!results[i]?.value?.data?.createBytemineContact?.id) {
			continue;
		}
		createdContacts.push(results[i].value.data.createBytemineContact);
	}

	// All done
	console.log('saveAllContacts', { createdContacts: createdContacts.length });
	return createdContacts;
};

/**
 * Updates a list of contacts in batches and returns only the successfully updated contacts.
 *
 * @param {Array} contacts - Array of contact objects to update.
 * @param {String} teamId - The team ID to associate with the contacts.
 * @param {String} userId - The user ID performing the update.
 * @returns {Array} updatedContacts - Array of successfully updated contact objects.
 */
const updateAllContacts = async (contacts, teamId, userId) => {
	console.log('updateAllContacts', { contacts: contacts.length, teamId, userId });

	let promises = [];
	let results = [];

	// Iterate through each contact and queue its update
	for (let i = 0; i < contacts.length; i++) {
		console.log('updateAllContacts - updating contact', i + 1);

		// Add contact update promise to the batch
		promises.push(saveOrUpdateContact(contacts[i], teamId, userId, true, true));

		// If batch size exceeds the limit, execute current batch and reset promises
		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.all(promises));
			promises = [];
		}
	}

	// Process any remaining contacts in the final batch using Promise.allSettled to handle errors gracefully
	results = results.concat(await Promise.allSettled(promises));
	console.log('updateAllContacts', { results: results.length });

	// Reset promises array for safety
	promises = [];

	// Extract successfully updated contacts from the results
	let updatedContacts = [];
	for (let i = 0; i < results.length; i++) {
		if (!results[i]?.value?.data?.updateBytemineContact?.id) {
			continue; // Skip if update failed or missing data
		}
		updatedContacts.push(results[i].value.data.updateBytemineContact);
	}

	// Log the final count of successfully updated contacts
	console.log('updateAllContacts', { updatedContacts: updatedContacts.length });
	return updatedContacts;
};

/**
 * Retrieves contact data for given person IDs (pids), updates them, tracks credit usage, and returns updated contacts.
 *
 * @param {Array} pids - Array of person IDs to retrieve contact information for.
 * @param {String} teamId - The team ID to associate with the operation.
 * @param {String} userId - The user ID performing the action.
 * @returns {Array} savedContacts - Array of successfully updated contact objects.
 */
const getAndSaveAllContacts = async (pids, teamId, userId) => {
	console.log('getAndSaveAllContacts', { pids, pidsCount: pids.length, teamId, userId });

	// Step 1: Retrieve all contact records based on provided person IDs
	const allContacts = await getAllContacts(pids);
	console.log('savedContacts', { allContacts: allContacts.length });

	// Step 2: Update all retrieved contacts and get the list of successfully saved/updated contacts
	const savedContacts = await updateAllContacts(allContacts, teamId, userId);
	console.log('savedContacts', { savedContacts: savedContacts.length });

	// Step 3: Record usage of credits based on number of retrieved contacts
	await usageAddUsage(teamId, userId, allContacts.length);
	console.log('getAndSaveAllContacts', { credits: savedContacts.length });

	// Step 4: Return the successfully saved contacts
	return savedContacts;
};

const getSavedContact = async (pid, teamId) => {
	const options = { id: `${pid}-${teamId}` };
	let response;
	try {
		response = await apsGql(getBytemineContact, options);
	} catch (err) {
		console.log('getSavedContact - error', err);
	}
	return response;
};

const getAllSavedContacts = async (pids, teamId) => {
	console.log('getAllSavedContacts', { pids, length: pids.length });

	let promises = [];
	let results = [];

	for (let i = 0; i < pids.length; i++) {
		promises.push(getSavedContact(pids[i], teamId));

		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.allSettled(promises));
			promises = [];
		}
	}

	results = results.concat(await Promise.allSettled(promises));

	const validResults = results.filter((item) => item?.value?.data.getBytemineContact?.id).map((item) => item?.value?.data.getBytemineContact);
	console.log('getAllSavedContacts', JSON.stringify({ results: results.length, validResults: validResults.length }));

	return validResults;
};

const deleteSavedContact = async (pid, teamId) => {
	const input = { id: `${pid}-${teamId}` };
	console.log('deleteSavedContact', JSON.stringify({ input, pid, teamId }));
	try {
		const response = await apsGql(deleteBytemineContact, { input }, 'data.deleteBytemineContact');
		console.log('deleteSavedContact - success', JSON.stringify({ response }));
		return response;
	} catch (err) {
		console.log('deleteSavedContact - error', err);
	}
};

const deleteAllSavedContacts = async (pids, teamId) => {
	let promises = [];
	let results = [];

	for (let i = 0; i < pids.length; i++) {
		promises.push(deleteSavedContact(pids[i], teamId));
		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.all(promises));
			promises = [];
		}
	}

	results = results.concat(await Promise.all(promises));
	console.log('All done', JSON.stringify(results));

	return results;
};

module.exports = {
	searchContactsV2,
	getContact,
	getAllContacts,
	saveOrUpdateContact,
	saveAllContacts,
	updateAllContacts,
	getAndSaveAllContacts,
	getSavedContact,
	getAllSavedContacts,
	deleteSavedContact,
	deleteAllSavedContacts,
};

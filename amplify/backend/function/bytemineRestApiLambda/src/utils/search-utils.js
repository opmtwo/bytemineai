const { updateBytemineContact, createBytemineContact } = require('../graphql/mutations');
const { apsGql } = require('./aps-utils');
const { atDataVerifyEmailAccounts } = require('./atdata-utils');
const { esGetById2, esSearch2 } = require('./es-utils-v2');
const { usageAddUsage } = require('../utils/usage-utils');

const BATCH_SIZE = 100;

const searchContacts2 = async (body, shouldReturnError = false, mask = true, append = false, api = false) => {
	console.log('searchContacts2', JSON.stringify({ body }));

	let response = {};

	// Unlock all?
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

	try {
		let savedFindCount = 0;
		let iter = 0;
		if (body.excludeExisting) {
			response.contacts = [];
			while (response.contacts.length <= body.pageSize) {
				if (iter > 0) {
					let response2 = await esSearch2(body, mask, append, api);

					response.contacts = [...response.contacts, ...response2.contacts];
				} else {
					response = await esSearch2(body, mask, append, api);
				}
				iter++;
				const pids = response.contacts.map((item) => item.pid);
				const savedContacts = await getAllSavedContacts(pids, body.teamId);
				console.log('excludeExisting - pids - ', pids);
				console.log('excludeExisting - saved contacts length - ', savedContacts.length);
				console.log('excludeExisting -  body.teamId', body.teamId);
				if (savedContacts?.length) {
					for (let i = 0; i < savedContacts.length; i++) {
						if (savedContacts[i]?.isUnlocked !== true) {
							continue;
						}
						const index = response.contacts.findIndex((item) => item.pid === savedContacts[i]?.pid);
						if (index === -1) {
							continue;
						}
						//console.log('fetchAndMergeUnlockedContacts - found unlocked contact - ', savedContacts[i].pid);
						response.contacts.splice(index, 1);
						savedFindCount++;
						console.log('savedFindCount', savedFindCount);
					}
				}
				body.page = body.page + 1;
			}
			response.contacts.splice(body.pageSize, response.contacts.length - body.pageSize);
			return response;
		} else {
			response = await esSearch2(body, mask, append, api);
			return response;
		}
	} catch (err) {
		console.log('searchContacts - error - ', err);
		if (shouldReturnError) {
			return err;
		}
		return;
	}
};

const getContact = async (pid) => {
	try {
		const contact = await esGetById2(pid);
		const contactVerified = await atDataVerifyEmailAccounts(contact);
		return { data: contactVerified };
	} catch (err) {
		console.log('getContact - error', err);
	}
};

const getAllContacts = async (pids) => {
	console.log('getAllContacts', { pids });

	const promises = [];
	let results = [];

	// Save all contacts using batches
	for (let i = 0; i < pids.length; i++) {
		console.log('getAllContacts- etching contact', i + 1);
		promises.push(getContact(pids[i]));

		// Execute batch if size exceeds limit
		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.all(promises));
			promises = [];
		}
	}

	// Complete final batch
	results = results.concat(await Promise.all(promises));
	console.log('getAllContacts', { results: results.length });

	// Filter and extract valid contacts
	const contacts = allResults.filter((item) => item?.value?.data?.pid).map((item) => item.value.data);
	//const validResults = allResults.filter((item) => item.status === 'fulfilled' && item.value?.status === 200 && item.value?.data?.pid);

	// All done
	console.log('getAllContacts', { contacts: contacts.length });
	return contacts;
};

const saveOrUpdateContact = async (contact, teamId, userId, isUpdate = false, isUnlocked = false) => {
	const operation = isUpdate ? updateBytemineContact : createBytemineContact;
	const input = {
		id: contact?.pid + '-' + teamId,
		userId,
		teamId,
		isUnlocked: isUnlocked,
		isEmailVerified: contact?.isEmailVerified ? true : false,
		contactEmailStatusCode: contact?.contactEmailStatusCode,
		contactEmailDomainType: contact?.contactEmailDomainType,
		personalEmailStatusCode: contact?.personalEmailStatusCode,
		personalEmailDomainType: contact?.personalEmailDomainType,
		contactPersonalEmailStatusCode: contact?.contactPersonalEmailStatusCode,
		contactPersonalEmailDomainType: contact?.contactPersonalEmailDomainType,
		contactFirstName: contact?.contactFirstName,
		pid: contact?.pid,
		contactMiddleName: contact?.contactMiddleName,
		contactLastName: contact?.contactLastName,
		companyName: contact?.companyName,
		companyStartDate: contact?.companyStartDate,
		companyEndDate: contact?.companyEndDate,
		contactTitle: contact?.contactTitle,
		contactTitleLevel: contact?.contactTitleLevel,
		contactJobFunctions: contact?.contactJobFunctions,
		contactEmail: contact?.contactEmail,
		personalEmail: contact?.personalEmail,
		historicalEmails: contact?.historicalEmails,
		directDialPhone: contact?.directDialPhone,
		directDialType: contact?.directDialType,
		contactCity: contact?.contactCity,
		contactState: contact?.contactState,
		contactCountry: contact?.contactCountry,
		contactContinent: contact?.contactContinent,
		contactSkills: contact?.contactSkills,
		contactLinkedinURL: contact?.contactLinkedinURL,
		contactFacebook: contact?.contactFacebook,
		contactTwitterURL: contact?.contactTwitterURL,
		contactEducation: contact?.contactEducation,
		contactBirthDate: contact?.contactBirthDate,
		contactGender: contact?.contactGender,
		contactPhone: contact?.contactPhone,
		contactOfficeCity: contact?.contactOfficeCity,
		contactOfficeAddress: contact?.contactOfficeAddress,
		contactOfficeState: contact?.contactOfficeState,
		contactOfficeCountry: contact?.contactOfficeCountry,
		contactOfficeZipCode: contact?.contactOfficeZipCode,
		lastUpdatedDate: contact?.lastUpdatedDate,
		contactLinkedinConnectionCount: contact?.contactLinkedinConnectionCount,
		hasChangedJobRecently: contact?.hasChangedJobRecently,
		companyId: contact?.companyId,
		companyLinkedinURL: contact?.companyLinkedinURL,
		companyDomain: contact?.companyDomain,
		companyAddressLine1: contact?.companyAddressLine1,
		companyAddressLine2: contact?.companyAddressLine2,
		companyCity: contact?.companyCity,
		companyRegion: contact?.companyRegion,
		companyCountry: contact?.companyCountry,
		companyZipCode: contact?.companyZipCode,
		companyPhone: contact?.companyPhone,
		companyEmployees: contact?.companyEmployees,
		companyRevenueRange: contact?.companyRevenueRange,
		companySpecialties: contact?.companySpecialties,
		companyPrimaryIndustry: contact?.companyPrimaryIndustry,
		companySIC: contact?.companySIC,
		companyType: contact?.companyType,
		companyStatus: contact?.companyStatus,
		companyFoundedYear: contact?.companyFoundedYear,
		companyLinkedinFollowers: contact?.companyLinkedinFollowers,
		companyNAICSCode: contact?.companyNAICSCode,
		companySICCode6: contact?.companySICCode6,
		formerTitles: contact?.formerTitles,
		formerCompanies: contact?.formerCompanies,
	};
	return await apsGql(operation, { input });
};

const saveAllContacts = async (contacts, teamId, userId, isUpdate = false, isUnlocked = false) => {
	console.log('saveAllContacts', { contacts: contacts, length, teamId, userId, isUpdate, isUnlocked });

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
		if (!results[i]?.value?.data?.createContact?.id) {
			continue;
		}
		createdContacts.push(results[i].value.data.createContact);
	}

	// All done
	console.log('saveAllContacts', { createdContacts: createdContacts.length });
	return createdContacts;
};

const updateAllContacts = async (contacts, teamId, userId) => {
	console.log('updateAllContacts', { contacts: contacts.length, teamId, userId });

	let promises = [];
	let results = [];

	// Save all contacts using batches
	for (let i = 0; i < contacts.length; i++) {
		console.log('updateAllContacts- updating contact', i + 1);
		promises.push(saveOrUpdateContact(contacts[i], teamId, userId, true, true));

		// Execute batch if size exceeds limit
		if (promises.length > BATCH_SIZE) {
			results = results.concat(await Promise.all(promises));
			promises = [];
		}
	}

	// Complete final batch
	results = results.concat(await Promise.allSettled(promises));
	console.log('updateAllContacts', { results: results.length });

	// Reset promises
	promises = [];

	// Find the contacts that were upated
	let updatedContacts = [];
	for (let i = 0; i < results.length; i++) {
		if (!results[i]?.value?.data?.updateContact?.id) {
			continue;
		}
		updatedContacts.push(results[i].value.data.updateContact);
	}

	// All done
	console.log('updateAllContacts', { updatedContacts: updatedContacts.length });
	return updatedContacts;
};

const getAndSaveAllContacts = async (pids, teamId, userId) => {
	console.log('getAndSaveAllContacts', { pids, pidsCount: pids.length, teamId, userId });

	// Get all contacts
	const allContacts = await getAllContacts(pids);
	console.log('savedContacts', { allContacts: allContacts.length });

	// Save and get list of all updated contacts
	const savedContacts = await updateAllContacts(allContacts, teamId, userId);
	console.log('savedContacts', { savedContacts: savedContacts.length });

	// Add usage for used credits
	await usageAddUsage(teamId, userId, allContacts.length);
	console.log('getAndSaveAllContacts', { credits: savedContacts.length });

	// All done
	return savedContacts;
};

module.exports = {
	searchContacts2,
	getContact,
	getAllContacts,
	saveOrUpdateContact,
	saveAllContacts,
	updateAllContacts,
	getAndSaveAllContacts,
};

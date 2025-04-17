/* Amplify Params - DO NOT EDIT
	API_NYMBLRGRAPHQLAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_NYMBLRGRAPHQLAPI_GRAPHQLAPIIDOUTPUT
	AUTH_NYMBLRAPP1EAFBBE6_USERPOOLID
	ENV
	REGION
	STORAGE_NYMBLRSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

require('cross-fetch/polyfill');

const rax = require('retry-axios');
const axios = require('axios');
const moment = require('moment');
const { esSearch, esGetById } = require('./utils/es-utils');
const { esSearch2, esGetById2 } = require('./utils/es-utils-v2');
const { createNymblrSubscription } = require('./mutations');
const crypto = require('crypto');
const { apsGql } = require('./aps-utils');
const { listSubByTeamId } = require('../graphql/queries');
const { createBytemineSub } = require('../graphql/mutations');

const {
	AUTH_NYMBLRAPP1EAFBBE6_USERPOOLID,
	STORAGE_NYMBLRSTORAGE_BUCKETNAME,
	AT_DATA_API_KEY,
} = process.env;z

const getOptionValues = (optionValues) => {
	//console.log('getOptionValues - optionValues - ', optionValues);
	let values = [];
	if (!optionValues || !optionValues.length) {
		return values;
	}
	optionValues.forEach((item) => values.push(item?.value));
	values = values.filter((value) => value?.toString()?.trim()?.length !== 0);
	//console.log('getOptionValues - result - ', values);
	return values;
};

const getOptionValues2 = (optionValues) => {
	console.log('getOptionValues2 - optionValues - ', optionValues);
	let values = { include: [], exclude: [] };
	if (!optionValues || (!optionValues.include && !optionValues.exclude && !optionValues.length)) {
		return values;
	}

	console.log('getOptionValues2 - optionValues - ', optionValues);
	optionValues.forEach((item) => {
		if (item && !(typeof item === 'string' || item instanceof String) && 'value' in item && !item.excluded) {
			values.include.push(item.value);
		} else {
			values.exclude.push(item.value);
		}
	});

	values.include = values.include.filter((value) => value?.toString()?.trim()?.length !== 0);
	values.exclude = values.exclude.filter((value) => value?.toString()?.trim()?.length !== 0);
	console.log('getOptionValues - result - ', values);
	return values;
};

const getOptions = (body) => {
	const options = {
		contactTitles: getOptionValues(body.keywords), // ['string'],
		contactEducation: getOptionValues(body.schools), // ['string'],
		contactSkills: getOptionValues(body.skills), // ['string'],
		contactInterests: getOptionValues(body.interests), // ['string'],
		name_first: getOptionValues(body.firstName), // ['string'],
		name_last: getOptionValues(body.lastName), // ['string'],
		contactLevels: getOptionValues(body.seniorityLevels), // ['cxo', 'vp', 'director'],
		contactJobFunctions: getOptionValues(body.departments), // ['customer_service', 'engineering', 'real_estate'],
		countries: getOptionValues(body.hqLocations), // ['United States', 'United Kingdom'],
		cities: getOptionValues(body.cities), // ['string'],
		states: getOptionValues(body.states), // ['NY', 'CA'],
		companyIndustries: getOptionValues(body.industries), // ['accounting', 'capital markets', 'architecture & planning'],
		companySizeIds: getOptionValues(body.employeeSizes), // [5, 8],
		companyRevenueIds: getOptionValues(body.companyRevenues), // [6, 7],
		companySicCodes: getOptionValues(body.sicCodes), // ['8720', '9411', '273'],
		companyNaicsCodes: getOptionValues(body.naicsCodes), // ['8720', '9411', '273'],
		companyNames: getOptionValues(body.companyNames), // ['google', 'microsoft'],
		uRLs: getOptionValues(body.urls), // ['rampedup.io', 'google.com'],
		hasChangedJobRecently: body.hasChangedJobRecently ? true : false,
		urlsToSuppress: getOptionValues(body.urlsToSuppress), // ['microsoft.com', 'yahoo.com'],
		titlesToSuppress: getOptionValues(body.titlesToSuppress), // ['Administrator', 'Software Developer'],
		emailsToSuppress: getOptionValues(body.emailsToSuppress), // ['test@testemail.com'],
		requiredEmail: body.hasRequiredEmail ? true : false,
		validateemails: body.hasValidateEmails ? true : false,
		primaryContactsOnly: body.hasPrimaryContactsOnly ? true : false,
		personalEmailOnly: body.hasPersonalEmailOnly ? true : false,
		directDialOnly: body.hasDirectDialOnly ? true : false,
		hasPhone: body.hasPhone ? true : false,
		hasLocalAddress: body.hasLocalAddress ? true : false,
		excludeExisting: body.excludeExisting ? true : false,
		audience: body.audience ? true : false,
		page: body.page || 0, // using default page 0
		pageSize: Math.max(body.pageSize || 10, 10), // using default / max page size of 10
	};
	//console.log('getOptions - result - ', options);
	return options;
};

const getOptions2 = (body) => {
	console.log('getOptions2 body -', body);
	const options = {
		contactTitles: getOptionValues2(body.keywords), // ['string'],
		contactEducation: getOptionValues2(body.schools), // ['string'],
		contactSkills: getOptionValues2(body.skills), // ['string'],
		contactInterests: getOptionValues2(body.interests), // ['string'],
		name_first: getOptionValues2(body.firstName), // ['string'],
		name_last: getOptionValues2(body.lastName), // ['string'],
		contactLevels: getOptionValues2(body.seniorityLevels), // ['cxo', 'vp', 'director'],
		contactJobFunctions: getOptionValues2(body.departments), // ['customer_service', 'engineering', 'real_estate'],
		countries: getOptionValues2(body.hqLocations), // ['United States', 'United Kingdom'],
		cities: getOptionValues2(body.cities), // ['string'],
		states: getOptionValues2(body.states), // ['NY', 'CA'],
		companyIndustries: getOptionValues2(body.industries), // ['accounting', 'capital markets', 'architecture & planning'],
		companySizeIds: getOptionValues2(body.employeeSizes), // [5, 8],
		companyRevenueIds: getOptionValues2(body.companyRevenues), // [6, 7],
		companySicCodes: getOptionValues2(body.sicCodes), // ['8720', '9411', '273'],
		companyNaicsCodes: getOptionValues2(body.naicsCodes), // ['8720', '9411', '273'],
		companyNames: getOptionValues2(body.companyNames), // ['google', 'microsoft'],
		uRLs: getOptionValues2(body.urls), // ['rampedup.io', 'google.com'],
		hasChangedJobRecently: body.hasChangedJobRecently ? true : false,
		urlsToSuppress: getOptionValues2(body.urlsToSuppress), // ['microsoft.com', 'yahoo.com'],
		titlesToSuppress: getOptionValues2(body.titlesToSuppress), // ['Administrator', 'Software Developer'],
		emailsToSuppress: getOptionValues2(body.emailsToSuppress), // ['test@testemail.com'],
		requiredEmail: body.hasRequiredEmail ? true : false,
		validateemails: body.hasValidateEmails ? true : false,
		primaryContactsOnly: body.hasPrimaryContactsOnly ? true : false,
		personalEmailOnly: body.hasPersonalEmailOnly ? true : false,
		directDialOnly: body.hasDirectDialOnly ? true : false,
		hasPhone: body.hasPhone ? true : false,
		hasLocalAddress: body.hasLocalAddress ? true : false,
		audience: body.audience ? true : false,
		excludeExisting: body.excludeExisting ? true : false,
		page: body.page || 0, // using default page 0
		pageSize: Math.max(body.pageSize || 10, 10), // using default / max page size of 10
	};
	console.log('getOptions2 - result - ', options);
	return options;
};

const addUsage = async (teamId, userId, credits, filterId) => {
	console.log('addUsage - ', credits);
	const options = {
		input: {
			teamId,
			userId,
			filterId,
			credits,
			tenants: [teamId, 'Root'],
		},
	};
	const response1 = await appSyncMutation(mutations.createUsage, options);
	const nymblrSubResponse1 = await getNymblrSubscription(teamId);
	const items = nymblrSubResponse1?.listNymblrSubscriptionsByteamId?.items || [];
	const nysub = items[0];

	const creditsNow = await getTotalCredits(teamId, userId);
	//if (credits > 1) {credits = 1;}
	const options2 = {
		input: {
			id: nysub.id,
			currentCredits: creditsNow - credits,
		},
	};
	//console.log('updateSub obj - ',options2);
	const response = await appSyncMutation(mutations.updateNymblrSubscription, options2);
	//console.log('updateSubCredits: ',response);

	return response1;
};

const updateUsage = async (id, credits, teamId, userId) => {
	console.log('updateUsage - ', credits);
	const options = {
		input: {
			id,
			credits,
		},
	};
	const response2 = await appSyncMutation(mutations.updateUsage, options);

	const nymblrSubResponse1 = await getNymblrSubscription(teamId);
	const items = nymblrSubResponse1?.listNymblrSubscriptionsByteamId?.items || [];
	const nysub = items[0];

	const creditsNow = await getTotalCredits(teamId, userId);
	//if (credits > 1) {credits = 1;}
	const options2 = {
		input: {
			id: nysub.id,
			currentCredits: creditsNow - credits,
		},
	};
	const response = await appSyncMutation(mutations.updateNymblrSubscription, options2);
	//console.log('updateSubCredits: ',response);

	return response2;
};

const searchContacts = async (body, shouldReturnError = false, mask_contacts = true, append = false, api = false) => {
	let response;

	if (body.audience) {
		mask_contacts = false;
		body.pageSize = 10;
		body.page = 0;
	}
	if (body.unlockAll) {
		mask_contacts = false;
	}
	console.log('SEARCH CONTACTS - body -', body);
	try {
		if (body.unlockAll) {
			response = await esSearch(body, mask_contacts, append, api);
			let response2 = {};
			response2.contacts = [];
			response.contacts.forEach(async (contact) => {
				let newContact = await verifyEmailAccounts(contact);
				response2.contacts.push(newContact);
			});
			return response2;
		} else {
			response = await esSearch(body, mask_contacts, append, api);
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

const searchContacts2 = async (body, shouldReturnError = false, mask_contacts = true, append = false, api = false) => {
	let response = {};

	if (body.audience) {
		mask_contacts = false;
		body.pageSize = 10;
		body.page = 0;
	}
	if (body.unlockAll) {
		mask_contacts = false;
	}
	console.log('SEARCH CONTACTS - body -', body);
	try {
		if (body.unlockAll) {
			response = await esSearch2(body, mask_contacts, append, api);
			let response2 = {};
			response2.contacts = [];
			response.contacts.forEach(async (contact) => {
				let newContact = await verifyEmailAccounts(contact);
				response2.contacts.push(newContact);
			});
			return response2;
		} else {
			let savedFindCount = 0;
			let iter = 0;
			if (body.excludeExisting) {
				response.contacts = [];
				while (response.contacts.length <= body.pageSize) {
					if (iter > 0) {
						let response2 = await esSearch2(body, mask_contacts, append, api);

						response.contacts = [...response.contacts, ...response2.contacts];
					} else {
						response = await esSearch2(body, mask_contacts, append, api);
					}
					iter++;
					const pids = response.contacts.map((item) => item.ruid);
					const savedContacts = await getAllSavedContacts(pids, body.teamId);
					console.log('excludeExisting - pids - ', pids);
					console.log('excludeExisting - saved contacts length - ', savedContacts.length);
					console.log('excludeExisting -  body.teamId', body.teamId);
					if (savedContacts?.length) {
						for (let i = 0; i < savedContacts.length; i++) {
							if (savedContacts[i]?.isUnlocked !== true) {
								continue;
							}
							const index = response.contacts.findIndex((item) => item.ruid === savedContacts[i]?.ruid);
							if (index === -1) {
								continue;
							}
							//console.log('fetchAndMergeUnlockedContacts - found unlocked contact - ', savedContacts[i].ruid);
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
				response = await esSearch2(body, mask_contacts, append, api);
				return response;
			}
		}
	} catch (err) {
		console.log('searchContacts - error - ', err);
		if (shouldReturnError) {
			return err;
		}
		return;
	}
};

const getContact = async (ruid) => {
	let response;
	try {
		response = await esGetById(ruid);
		response = await verifyEmailAccounts(response);
		return { data: response };
	} catch (err) {
		return;
	}
};

const getAllContacts = async (pids) => {
	//console.log('getAllContacts - total number of ids - ', pids);
	const promises = [];
	for (let i = 0; i < pids.length; i++) {
		promises.push(getContact(pids[i]));
	}
	const allResults = await Promise.allSettled(promises);

	const validResults = allResults.filter(
		// (item) => item.status === 'fulfilled' && item.value?.status === 200 && item.value?.data?.ruid
		(item) => item?.value?.data?.ruid
	);
	//const validResults = allResults.filter((item) => item.status === 'fulfilled' && item.value?.status === 200 && item.value?.data?.ruid);
	//console.log('getAllContacts - total number of valid ids - ', validResults.length);
	const contacts = validResults.map((item) => item.value.data);
	return contacts;
};

const saveOrUpdateContact = async (contact, teamId, userId, isUpdate = false, isUnlocked = false) => {
	const operation = isUpdate ? mutations.updateContact : mutations.createContact;
	const options = {
		input: {
			id: contact?.ruid + '-' + teamId,
			userId,
			teamId,
			tenants: [teamId, 'Root'],
			isUnlocked: isUnlocked,
			isEmailVerified: contact?.isEmailVerified ? true : false,
			contactEmailStatusCode: contact?.contactEmailStatusCode,
			contactEmailDomainType: contact?.contactEmailDomainType,
			personalEmailStatusCode: contact?.personalEmailStatusCode,
			personalEmailDomainType: contact?.personalEmailDomainType,
			contactPersonalEmailStatusCode: contact?.contactPersonalEmailStatusCode,
			contactPersonalEmailDomainType: contact?.contactPersonalEmailDomainType,
			contactFirstName: contact?.contactFirstName,
			ruid: contact?.ruid,
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
		},
	};
	const response = await appSyncMutation(operation, options);
	return response;
};

const saveAllContacts = async (contacts, teamId, userId, isUpdate = false, isUnlocked = false) => {
	//console.log('saveAllContacts - ', { teamId, userId });
	//console.log('saveAllContacts - number of contacts - ', contacts.length);
	const promises = [];
	for (let i = 0; i < contacts.length; i++) {
		//console.log('Saving contact ', i + 1);
		promises.push(saveOrUpdateContact(contacts[i], teamId, userId, isUpdate, isUnlocked));
	}
	const results = await Promise.allSettled(promises);
	let contactModels = [];
	for (let i = 0; i < results.length; i++) {
		if (!results[i]?.value?.data?.createContact?.id) {
			continue;
		}
		contactModels.push(results[i].value.data.createContact);
	}
	return contactModels;
};

const updateAllContacts = async (contacts, teamId, userId) => {
	//console.log('updateAllContacts - ', { teamId, userId });
	//console.log('updateAllContacts - number of contacts - ', contacts.length);
	const promises = [];
	for (let i = 0; i < contacts.length; i++) {
		//console.log('Updating contact ', i + 1);
		promises.push(saveOrUpdateContact(contacts[i], teamId, userId, true, true));
	}
	const results = await Promise.allSettled(promises);
	let contactModels = [];
	for (let i = 0; i < results.length; i++) {
		if (!results[i]?.value?.data?.updateContact?.id) {
			continue;
		}
		contactModels.push(results[i].value.data.updateContact);
	}
	return contactModels;
};

const getAndSaveAllContacts = async (pids, teamId, userId) => {
	//console.log('getAndSaveAllContacts - ', { pids, teamId, userId });
	const allContacts = await getAllContacts(pids);
	const savedContacts = await updateAllContacts(allContacts, teamId, userId);
	await addUsage(teamId, userId, allContacts.length);
	return savedContacts;
};

const getSavedContact = async (ruid, teamId) => {
	const options = {
		id: ruid + '-' + teamId,
	};
	let response;
	try {
		response = await appSyncQuery(queries.getContact, options);
	} catch (err) {
		//console.log('getSavedContact - error - ', err);
	}
	return response;
};

const getAllSavedContacts = async (pids, teamId) => {
	//console.log('getAllSavedContacts - total number of ids - ', pids);
	const promises = [];
	for (let i = 0; i < pids.length; i++) {
		promises.push(getSavedContact(pids[i], teamId));
	}
	const allResults = await Promise.allSettled(promises);
	const validResults = allResults.filter((item) => item?.value?.data.getContact?.id).map((item) => item?.value?.data.getContact);
	//console.log('getAllSavedContacts - total results - ', allResults.length);
	//console.log('getAllSavedContacts - valid results - ', validResults.length);
	return validResults;
};

const deleteSavedContact = async (pid, teamId) => {
	const options = {
		input: {
			id: pid + '-' + teamId,
		},
	};
	let response;
	try {
		response = await appSyncMutation(mutations.deleteContact, options);
	} catch (err) {
		//console.log('getSavedContact - error - ', err);
	}
	return response;
};

const deleteAllSavedContacts = async (pids, teamId) => {
	//console.log('deleteAllSavedContacts - total number of ids - ', pids);
	const promises = [];
	for (let i = 0; i < pids.length; i++) {
		promises.push(deleteSavedContact(pids[i], teamId));
	}
	const allResults = await Promise.allSettled(promises);
	return allResults;
};

/**
 * @summary
 * Unlock contacts using RampedUP API
 *
 * @description
 * We need to unlock contacts without billing for already unlocked contacts
 * for the cognito group
 *
 * @description
 * fetch all saved contacts using pids
 * filter fetched contacts and find all contacts that needs to be unlocked
 * filter fetched contacts and delete any contact that is yet to be unlocked
 * delete any partial saved contact that is not yet unlocked
 * unlock the necessary contacts using api
 * save the newly unlocked contacts
 * charge only for the newly unlocked contacts with a valid email address
 * return merged list of contacts, we may also choose to fetch contacts again
 *
 * @param {string[]} pids Array of pid's to unlock
 * @param {string} teamId Cognito group name
 * @param {string} userId Cognito user id
 */
const unlockContacts = async (pids, teamId, userId) => {
	const usage = await addUsage(teamId, userId, 0);
	const savedContacts = await getAllSavedContacts(pids, teamId);
	const fullContacts = savedContacts.filter((item) => item.isUnlocked);
	const partialContacts = savedContacts.filter((item) => !item.isUnlocked);
	const unlockedpids = fullContacts.map((item) => item.pid);
	const pidsToUnlock = pids.filter((id) => !unlockedpids.includes(id));
	const pidsToDelete = partialContacts.map((item) => item.pid);
	await deleteAllSavedContacts(pidsToDelete, teamId);
	//console.log ('pids to unlock - ',pidsToUnlock);
	const newFullContacts = await getAllContacts(pidsToUnlock);
	const newSavedContacts = await saveAllContacts(newFullContacts, teamId, userId, false, true);
	//credits used calc
	const creditsUsed = newFullContacts.filter(
		(item) => parseInt(item?.contactEmailStatusCode || '0') === 50 || parseInt(item?.personalEmailStatusCode || '0') === 50
	).length;
	//const creditsUsed = newFullContacts.filter((item) => item.contactEmail || item.personalEmail || item.historicalEmails?.length).length;
	//console.log('creditsUsed',creditsUsed);
	await updateUsage(usage.data.createUsage.id, creditsUsed, teamId, userId);
	return [...fullContacts, ...newSavedContacts];
};

const fetchAndMergeUnlockedContacts = async (contacts, teamId) => {
	let items = [...contacts];
	const pids = items.map((item) => item.pid);
	const savedContacts = await getAllSavedContacts(pids, teamId);
	//console.log('fetchAndMergeUnlockedContacts - pids - ', pids);
	//console.log('fetchAndMergeUnlockedContacts - saved contacts length - ', savedContacts.length);
	if (savedContacts?.length) {
		for (let i = 0; i < savedContacts.length; i++) {
			if (savedContacts[i]?.isUnlocked !== true) {
				continue;
			}
			const index = items.findIndex((item) => item.pid === savedContacts[i]?.pid);
			if (index === -1) {
				continue;
			}
			//console.log('fetchAndMergeUnlockedContacts - found unlocked contact - ', savedContacts[i].pid);
			items[index] = savedContacts[i];
		}
	}
	return items;
};

/**
 * @summary
 * Verify an email address using AtData API
 *
 * @see
 * https://docs.atdata.com/?javascript#email-validation-introduction
 *
 * @param {string} email The request email address to verify
 * @param {boolean} shouldReturnError Whether to return the error response
 * @returns {Mixed} AtData response object on success else undefined
 */
const verifyEmailAddress = async (email, shouldReturnError = false) => {
	if (!email?.trim()?.length) {
		//console.log('verifyEmailAddress - Invalid email - ', email);
		return;
	}
	const emailEncoded = encodeURIComponent(email.trim());
	const url = `https://api.towerdata.com/v5/ev?api_key=${AT_DATA_API_KEY}&email=${emailEncoded}`;
	//let url = `https://api.debounce.io/v1/?api=64011b8541ef2&email=${emailEncoded}`;
	//let url = `https://api.neverbounce.com/v4/single/check?key=private_7dc5c92ceccdd3e270fd063a5b7957ef&email=${emailEncoded}`;
	console.log('verifyEmailAddress - ', { emailEncoded, url });
	let response;
	try {
		const interceptorId = rax.attach();
		const myConfig = {
			raxConfig: {
				retry: 16, // number of retry when facing 4xx or 5xx
				noResponseRetries: 8, // number of retry when facing connection error
				onRetryAttempt: (err) => {
					const cfg = rax.getConfig(err);
					console.log(`Retry attempt #${cfg.currentRetryAttempt}`); // track current trial
				},
			},
			timeout: 500, // don't forget this one
		};
		response = await axios.post(url, myConfig);
	} catch (err) {
		console.log('verifyEmailAddress - error - ', err);
		if (shouldReturnError) {
			return err;
		}
		return;
	}
	console.log('verifyEmailAddress - success - ', response.data);
	if (response?.data && response?.data?.result) {
		if (response.data.result === 'valid') {
			response.data.code = '5';
		} else if (response.data.result === 'catchall') {
			response.data.code = '4';
		} else {
			response.data.code = '6';
		}
	}
	return response.data;
};

/**
 * @summary
 * Verify the email address in the specified contact
 *
 * @description
 * Verify
 * contactEmail
 * personalEmail
 * contactPersonalEmail
 *
 * @param {Object} contactData The contact with email addresses data to verify
 * @returns {Object} updated contact data with email addresses verified
 */
const verifyEmailAccounts = async (contactData) => {
	//console.log('verifyEmailAccounts - contactData', contactData);
	let response;

	// verify contact email
	if (contactData?.contactEmail) {
		response = await verifyEmailAddress(contactData.contactEmail);
		if (response?.email_validation?.status_code) {
			contactData.contactEmailStatusCode = response.email_validation.status_code;
			contactData.contactEmailDomainType = response.email_validation.domain_type;
		}
		/*if (response?.debounce?.code) {
			contactData.contactEmailStatusCode = response.debounce.code;
			contactData.contactEmailDomainType = response.debounce.reason;
		}*/
		/*
		if (response?.code) {
			contactData.contactEmailStatusCode = response.code;
			contactData.contactEmailDomainType = response.result;
		}*/
	}

	// verify personal email
	//if (contactData?.personalEmail) {
	//	response = await verifyEmailAddress(contactData.personalEmail);
	//	if (response?.email_validation?.status_code) {
	//		contactData.personalEmailStatusCode = response.email_validation.status_code;
	//		contactData.personalEmailDomainType = response.email_validation.domain_type;
	//	}
	/*if (response?.debounce?.code) {
        contactData.personalEmailStatusCode = response.debounce.code;
        contactData.personalEmailDomainType = response.debounce.reason;
    }
    if (response?.code) {
        contactData.personalEmailStatusCode = response.code;
        contactData.personalEmailDomainType = response.result;
    }*/
	//}

	// verify contact personal email
	/*
	if (contactData?.contactPersonalEmail) {
		response = await verifyEmailAddress(contactData.contactPersonalEmail);
		/*if (response?.email_validation?.status_code) {
			contactData.contactPersonalEmailStatusCode = response.email_validation.status_code;
			contactData.contactPersonalEmailDomainType = response.email_validation.domain_type;
		}*/
	/*if (response?.debounce?.code) {
        contactData.contactPersonalEmailStatusCode = response.debounce.code;
        contactData.contactPersonalEmailDomainType = response.debounce.reason;
    }*/ /*
		if (response?.code) {
			contactData.contactPersonalEmailStatusCode = response.code;
			contactData.contactPersonalEmailDomainType = response.result;
		}
	}*/

	// mark email as verified
	contactData.isEmailVerified = true;

	// return response
	//console.log('verifyEmailAccounts - response', contactData);
	return contactData;
};

const apiUpdateListContacts = async (id, teamId, contactIds) => {
	//console.log('apiUpdateListContacts - params - ', { id, teamId, contactIds });
	const list = await apiGetList(id, teamId);
	if (!list) {
		return;
	}

	let promises = [];
	for (let i = 0; i < contactIds.length; i++) {
		const contactId = contactIds[i];
		const options = {
			input: {
				id: id + '-' + contactId,
				listId: id,
				contactId: contactId + '-' + teamId,
				teamId: teamId,
				tenants: [teamId],
			},
		};
		//console.log('apiUpdateListContacts - options - ', options);
		promises.push(appSyncMutation(mutations.createListContact, options));
	}
	await Promise.all(promises);

	return {};
};

const cleanListData = (list) => {
	delete list.owner;
	delete list.userId;
	delete list.teamId;
	delete list.__typename;
	delete list.isUnlocked;
	delete list.isEmailVerified;
	delete list.contactEmailStatusCode;
	delete list.contactEmailDomainType;
	delete list.personalEmailStatusCode;
	delete list.personalEmailDomainType;
	delete list.contactPersonalEmailStatusCode;
	delete list.contactPersonalEmailDomainType;
};

const addNymblrSubscription = async (teamId, userId) => {
	const options = {
		input: {
			teamId: teamId,
			userId: userId,
			subscriptionStatus: 'Trial',
			subscriptionPeriod: 'Monthly',
			monthlyCredits: '10',
			quarterlyCredits: '0',
			annualCredits: '0',
			currentCredits: '10',
		},
	};
	const response = await appSyncMutation(createBytemineSub, options, 'data.createBytemineSub');
	return response;
};

const getTotalCredits = async (teamId, userId) => {
	const nymblrSubResponse1 = await getNymblrSubscription(teamId);
	const items = nymblrSubResponse1?.listNymblrSubscriptionsByteamId?.items || [];
	let nySubscription;
	if (!items?.length) {
		//console.log('no subscription found');
		const nymblrCreateSubResponse1 = await addNymblrSubscription(teamId, teamId, userId);
		//console.log(nymblrCreateSubResponse1);
		nySubscription = nymblrCreateSubResponse1;
	} else {
		//console.log(items[0]);
		nySubscription = items[0];
		//console.log(nySubscription);
	}
	//console.log('3');
	return parseInt(nySubscription.currentCredits || '0');
};

const getNymblrSubscription = async (teamId) => {
	const response = await apsGql(listSubByTeamId, { teamId }, 'data.listSubByTeamId.items');
	return response.data;
};

module.exports = {
	//
};

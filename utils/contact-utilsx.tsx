import Fuse from 'fuse.js';
import { get } from 'lodash';
import { sentenceCase } from 'sentence-case';

import {
	atDataResponseCodes,
	exportContactCompanyLabels,
	exportContactPersonLabels,
	keysToExport,
	keysToExportContactCompany,
	keysToExportContactPerson,
} from '../consts';
import { Contact, ContactCompany, ContactPerson, IBytemineContact, IBytemineFilter, RampedUpFilter, SelectOption } from '../types';
import { arrayToCsv, download } from './helper-utils';

export const getExportLabels = () => keysToExport.map((key) => sentenceCase(key));

export const getExportData = (data: IBytemineContact) => {
	const newItem: any = {};
	const contact: any = data;
	keysToExport.forEach((key) => {
		newItem[key] = contact[key] || '';
	});
	return newItem;
};

export const downloadContacts = (contacts: IBytemineContact[]) =>
	download(arrayToCsv(contacts).replace(/,/g, '&&&').replace(/\|/g, ',').replace(/&&&/g, '|'), `contacts-${new Date().toISOString()}.csv`, 'data:text/csv');

export const contactFuseOptions: Fuse.IFuseOptions<IBytemineContact> = {
	keys: [
		[
			'contactFirstName',
			'contactMiddleName',
			'contactLastName',
			'contactFullName',
			'contactTitle',
			'contactTitleLevel',
			'contactJobFunctions',
			'formerTitles',
			'companyName',
			'contactEmail',
			'personalEmail',
			'contactPhone',
			'companyPhone',
		],
	],
	findAllMatches: true,
	isCaseSensitive: false,
	shouldSort: true,
	useExtendedSearch: true,
	threshold: 0.55, // don't use default - found this after multiple trials
};

export const searchContactItems = (items: IBytemineContact[], query: string) => {
	const fuse = new Fuse(items, contactFuseOptions);
	return fuse.search(`"${query}"`).map((item) => item.item);
};

const applyEmployeesCountFilter = (contact: IBytemineContact, countId: number) => {
	// if (countId === undefined || contact?.companyEmployees == undefined) {
	// 	return false;
	// }
	// const map = [
	// 	{ min: 0, max: 10 },
	// 	{ min: 11, max: 50 },
	// 	{ min: 51, max: 200 },
	// 	{ min: 201, max: 500 },
	// 	{ min: 501, max: 1000 },
	// 	{ min: 1001, max: 5000 },
	// 	{ min: 5001, max: 10000 },
	// 	{ min: 10001, max: Infinity },
	// ];
	// let index = countId - 1;
	// if (!map[index]) {
	// 	return false;
	// }
	// //return contact.companyEmployees >= map[index].min && contact.companyEmployees <= map[index].max;
	// return contact.companyEmployees;

	return false;
};

export const applyContactFilters = (contacts: IBytemineContact[], filter: IBytemineFilter) => {
	let fuse;
	let results: IBytemineContact[] = [...contacts];

	// keywords
	if (filter?.keywords?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions });
		results = fuse.search(filter.keywords.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// company names
	if (filter?.companyNames?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['companyName'] });
		results = fuse.search(filter.companyNames.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// industries
	if (filter?.industries?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['companyPrimaryIndustry'] });
		results = fuse.search(filter.industries.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// sic codes
	if (filter?.sicCodes?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['companySIC'] });
		results = fuse.search(filter.sicCodes.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// employees count
	if (filter?.employeeSizes?.length) {
		results = results.filter((item) => {
			if (!filter?.employeeSizes?.length) {
				return false;
			}
			for (let i = 0; i < filter.employeeSizes.length; i++) {
				if (applyEmployeesCountFilter(item, parseInt(filter.employeeSizes[i].value))) {
					return true;
				}
			}
			return false;
		});
	}

	// hq location
	if (filter?.hqLocations?.length) {
		fuse = new Fuse(results, {
			...contactFuseOptions,
			keys: ['companyAddressLine1', 'companyAddressLine2', 'companyCity', 'companyRegion', 'companyCountry', 'companyZipCode'],
		});
		results = fuse.search(filter.hqLocations.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// domain names
	if (filter?.urls?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['companyDomain'] });
		results = fuse.search(filter.urls.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// cities
	if (filter?.cities?.length) {
		fuse = new Fuse(results, {
			...contactFuseOptions,
			keys: ['companyCity', 'companyAddressLine1', 'companyAddressLine2'],
		});
		results = fuse.search(filter.cities.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// states
	if (filter?.states?.length) {
		fuse = new Fuse(results, {
			...contactFuseOptions,
			keys: ['companyRegion', 'companyAddressLine1', 'companyAddressLine2'],
		});
		results = fuse.search(filter.states.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// revenue ranges
	if (filter?.companyRevenues?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['companyRevenueRange'] });
		results = fuse.search(filter.companyRevenues.map((item) => `"${item.label}"`).join('|')).map((item) => item.item);
	}

	// seniority levels
	if (filter?.seniorityLevels?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['contactTitleLevel'], threshold: 0.25 });
		results = fuse.search(filter.seniorityLevels.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// departments
	if (filter?.departments?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['contactJobFunctions'] });
		results = fuse.search(filter.departments.map((item) => `"${item.value}"`).join('|')).map((item) => item.item);
	}

	// suppress

	if (filter.urlsToSuppress?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['companyDomain'] });
		results = fuse.search(filter.urlsToSuppress.map((item) => `!"${item.value}"`).join(' ')).map((item) => item.item);
	}

	if (filter.titlesToSuppress?.length) {
		fuse = new Fuse(results, { ...contactFuseOptions, keys: ['contactTitle', 'contactTitleLevel'] });
		results = fuse.search(filter.titlesToSuppress.map((item) => `!"${item.value}"`).join(' ')).map((item) => item.item);
	}

	if (filter.emailsToSuppress?.length) {
		fuse = new Fuse(results, {
			...contactFuseOptions,
			keys: ['contactEmail', 'personalEmail'],
		});
		results = fuse.search(filter.emailsToSuppress.map((item) => `!"${item.value}"`).join(' ')).map((item) => item.item);
	}

	// boolean

	if (filter.hasChangedJobRecently) {
		// results = contacts.filter((item) => item.hasChangedJobRecently);
		results = contacts.filter((item) => item.new_hire);
	}

	if (filter.hasPrimaryContactsOnly) {
		// results = contacts.filter((item) => item.contactPhone || item.contactPersonalEmail);
		results = contacts.filter((item) => item.direct_dial || item.work_email || item.personal_email || item.personal_email2);
	}

	if (filter.hasPhone) {
		// results = contacts.filter((item) => item.companyPhone || item.contactPhone);
		results = contacts.filter((item) => item.direct_dial || item.mobile_number);
	}

	if (filter.hasDirectDialOnly) {
		// results = contacts.filter((item) => item.directDialPhone);
		results = contacts.filter((item) => item.direct_dial);
	}

	if (filter.hasRequiredEmail) {
		// results = contacts.filter((item) => item.contactEmail || item.personalEmail);
		results = contacts.filter((item) => item.work_email || item.personal_email || item.personal_email2);
	}

	if (filter.hasPersonalEmailOnly) {
		// results = contacts.filter((item) => item.personalEmail);
		results = contacts.filter((item) => item.personal_email || item.personal_email2);
	}

	if (filter.hasLocalAddress) {
		// results = contacts.filter((item) => item.contactOfficeAddress || item.companyAddressLine1 || item.companyAddressLine2);
		results = contacts.filter((item) => item.company_hq_address || item.company_local_address);
	}

	if (filter.hasValidateEmails) {
		// results = contacts.filter((item) => item.contactEmail || item.personalEmail || item.historicalEmails?.length);
		results = contacts.filter((item) => item.work_email || item.personal_email || item.personal_email2 || item.personal_email_history.length);
	}

	return results;
};

export const getEmailStatus = (contact: Contact) => {
	if (contact.contactEmail) {
		return 'Valid';
	}
	if (contact.personalEmail || contact.historicalEmails?.length) {
		return 'Catch All/Accept All';
	}
	return 'Invalid';
};

export const getEmailValidityStatus = (contact: IBytemineContact) => {
	let value;
	if (contact.contactEmailStatusCode) {
		value = (atDataResponseCodes as any)[contact.contactEmailStatusCode];
		if (value) {
			return `Contact email status is ${value?.description}-${value?.code}`;
		}
	}
	if (contact.personalEmailStatusCode) {
		value = (atDataResponseCodes as any)[contact.personalEmailStatusCode];
		if (value) {
			return `Personal email status is ${value?.description}-${value?.code}`;
		}
	}
	if (contact.contactPersonalEmailStatusCode) {
		value = (atDataResponseCodes as any)[contact.contactPersonalEmailStatusCode];
		if (value) {
			return `Contact personal email status is ${value?.description}-${value?.code}`;
		}
	}
	return contact.emailStatus || '';
};

export const getContactPersonExportList = (contacts: ContactPerson[]) => {
	//const arrayStringKeys: string[] = ['contactJobLevels', 'contactJobFunctions', 'contactPersonalEmails', 'contactHistoricalEmails', 'contactSkills'];
	const arrayStringKeys: string[] = [];
	const arrayBooleanKeys: string[] = [];
	let exportList = contacts.map((item) => {
		const newItem: any = {};
		keysToExportContactPerson.map((key) => {
			newItem[key] = get(item, key);
			if (arrayStringKeys.includes(key)) {
				newItem[key] = (get(item, key) || [])?.join(' / ');
			}
			if (arrayBooleanKeys.includes(key)) {
				newItem[key] = get(item, key) ? 'Yes' : 'No';
			}
			if (key === 'contactEducation') {
				newItem[key] = item.contactEducation
					.map((item) => `${item.degrees.join('/')} (${item.schoolName}) ${item.startDate}-${item.endDate}`)
					.join(',');
			}
			/*
			if (key === 'contactExperience') {
				newItem[key] = item.contactExperience.map((item) => `${item.company} ${item.title} ${item.startDate}-${item.endDate}`).join(' / ');
			}*/
		});
		return newItem;
	});
	if (exportList.length) {
		const labels = keysToExportContactPerson.map((key) => {
			const label = (exportContactPersonLabels as any)[key];
			if (label) {
				return label;
			}
			return sentenceCase(key);
		});
		exportList.unshift(labels as any);
	}
	return exportList;
};

export const downloadContactPersonExportList = (contacts: ContactPerson[]) => {
	const items = getContactPersonExportList(contacts);
	const str = arrayToCsv(items).replace(/,/g, '&&&').replace(/\|/g, ',').replace(/&&&/g, '|');
	download(str, `contact-${new Date().toISOString()}.csv`, 'data:text/csv');
};

export const getCompanyExportList = (companies: ContactCompany[]) => {
	const arrayKeys: string[] = [];
	let exportList = companies.map((item) => {
		const newItem: any = {};
		keysToExportContactCompany.map((key) => {
			newItem[key] = get(item, key);
			if (arrayKeys.includes(key)) {
				newItem[key] = (get(item, key) || []).join('|');
			}
			if (key === 'technologies') {
				newItem[key] = item.technologies.map((item) => `${item.title} (${item.domain})`).join(' - ');
			}
		});
		return newItem;
	});
	if (exportList.length) {
		const labels = keysToExportContactCompany.map((key) => {
			const label = (exportContactCompanyLabels as any)[key];
			if (label) {
				return label;
			}
			return sentenceCase(key);
		});
		exportList.unshift(labels as any);
	}
	return exportList;
};

export const downloadCompanyExportList = (companies: ContactCompany[]) => {
	const items = getCompanyExportList(companies);
	const str = arrayToCsv(items).replace(/,/g, '&&&').replace(/\|/g, ',').replace(/&&&/g, '|');
	download(str, `company-${new Date().toISOString()}.csv`, 'data:text/csv');
};

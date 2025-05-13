'use strict';

const aws4 = require('aws4');
const axios = require('axios');

const ES_HOST = 'search-byteminai-orlglsbgaoh4d5l3zdo7ak7o3m.us-east-1.es.amazonaws.com';
const ES_DOMAIN = `https://${ES_HOST}`;
//const ES_INDEX = 'nymblr_20221107';
const ES_INDEX = 'contacts';

/**
 * @summary
 * Get AWS request header with 5 minute expiration
 *
 * @see
 * https://docs.aws.amazon.com/general/latest/gr/sigv4-date-handling.html
 *
 * @returns {object}
 */
const esGetHeaders2 = () => {
	const headers = {
		'X-Amz-Date':
			new Date(+new Date() + 5 * 1000 * 60)
				.toISOString()
				.replace(/(\-|\:|\.)/gi, '')
				.slice(0, -4) + 'Z',
		'Content-Type': 'application/json',
	};
	//console.log('esGetHeaders - success -', headers);
	return headers;
};

/**
 *
 * @param {string} body string encoded json data
 * @param {object} headers headers object
 * @param {string} path
 * @returns
 */
const esSignRequestV2 = (host, path, method, headers, body = undefined) => {
	return aws4.sign(
		{
			host,
			method,
			path,
			headers,
			body: method?.toLowerCase() === 'get' ? undefined : body,
		},
		{
			accessKeyId: 'AKIAVYOMUDYWFGRZPNQK',
			secretAccessKey: '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',
		}
	);
};

const esRequest2 = async (method, path, data) => {
	const body = data ? JSON.stringify(data) : undefined;

	// Initial headers
	const headers = {
		'Content-Type': 'application/json',
		// 'X-Amz-Date': new Date().toISOString().replace(/[:-]|\.\d{3}/g, '') + 'Z',
	};

	// Sign with AWS credentials
	const signed = esSignRequestV2(ES_HOST, path, method, headers, body);

	// Prepare fetch options
	const fetchOptions = {
		method,
		headers: signed.headers,
		...(method !== 'GET' && body ? { body } : {}), // <- this avoids body on GET
	};

	const url = `${ES_DOMAIN}${path}`;
	console.log('esRequest fetch:', fetchOptions);
	console.log('esRequest2', JSON.stringify({ fetchOptions, url }));

	try {
		const start = Date.now();
		const response = await fetch(url, fetchOptions);
		const end = Date.now();

		console.log(`Request took ${end - start}ms`);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`ES error (${response.status}): ${errorText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('ES Request failed:', error.message);
		throw error;
	}
};

/**
 * Extracts and returns a list of option values from an object, based on include/exclude flags.
 *
 * @param {Object|Array} optionValues - The input containing options (with optional include/exclude keys or raw array).
 * @param {String} incexclude - Determines whether to extract from 'include', 'exclude', or use the array directly. Default is 'include'.
 * @returns {Array} - Cleaned array of non-empty string values.
 */
const esGetOptionValuesV2 = (optionValues, incexclude = 'include', verbose = false) => {
	if (verbose) {
		console.log('esGetOptionValuesV2', JSON.stringify({ optionValues }));
	}

	let values = [];

	// Return empty array if no optionValues provided
	if (!optionValues) {
		return values;
	}

	// Extract values based on incexclude mode
	if (incexclude === 'include') {
		// If 'include' key exists, push all its values
		if ('include' in optionValues) {
			optionValues.include.forEach((item) => values.push(item));
		}

		if (!values.length) {
			optionValues.forEach(val => {
				if (val.excluded) {
					return;
				}
				values.push(val.value);
			})
		}

	} else if (incexclude === 'exclude') {
		// If 'exclude' key exists, push all its values
		if ('exclude' in optionValues) {
			optionValues.exclude.forEach((item) => values.push(item));
		}

		if (!values.length) {
			optionValues.forEach(val => {
				if (!val.excluded) {
					return;
				}
				values.push(val.value);
			})
		}

	} else {
		// If no specific mode, assume optionValues is a raw array
		optionValues.forEach((item) => values.push(item));

		if (!values.length) {
			optionValues.forEach(val => {
				values.push(val.value);
			})
		}
	}

	// Filter out empty or whitespace-only values
	values = values.filter((value) => value?.toString()?.trim()?.length !== 0);

	if (verbose) {
		console.log('esGetOptionValuesV2 - result - ', values);
	}
	return values;
};

const esGetOptionsV2 = (body) => {
	console.log('esGetOptionsV2 - input', JSON.stringify({ body }));

	const options = {
		keywords: esGetOptionValuesV2(body.keywords), // ['string'],
		keywordsExclude: esGetOptionValuesV2(body.keywords, 'exclude'), // ['string'],

		name_first: esGetOptionValuesV2(body.firstName),
		name_last: esGetOptionValuesV2(body.lastName),
		
		contactTitles: esGetOptionValuesV2(body.jobTitles),
		contactTitlesExclude: esGetOptionValuesV2(body.jobTitles, 'exclude'),
		
		contactEducation: esGetOptionValuesV2(body.contactEducation),
		contactEducationExclude: esGetOptionValuesV2(body.contactEducation, 'exclude'),
		
		contactSkills: esGetOptionValuesV2(body.contactSkills), // ['string'],
		contactSkillsExclude: esGetOptionValuesV2(body.contactSkills, 'exclude'), // ['string'],
		
		contactInterests: esGetOptionValuesV2(body.contactInterests), // ['string'],
		contactInterestsExclude: esGetOptionValuesV2(body.contactInterests, 'exclude'), // ['string'],
		
		seniorityLevels: esGetOptionValuesV2(body.seniorityLevels), // ['cxo', 'vp', 'director'],
		seniorityLevelsExclude: esGetOptionValuesV2(body.seniorityLevels, 'exclude'), // ['cxo', 'vp', 'director'],
		
		departments: esGetOptionValuesV2(body.departments), // ['customer_service', 'engineering', 'real_estate'],
		departmentsExclude: esGetOptionValuesV2(body.departments, 'exclude'), // ['customer_service', 'engineering', 'real_estate'],
		
		hqLocations: esGetOptionValuesV2(body.hqLocations), // ['United States', 'United Kingdom'],
		
		cities: esGetOptionValuesV2(body.cities), // ['string'],
		
		states: esGetOptionValuesV2(body.states), // ['NY', 'CA'],
		statesExclude: esGetOptionValuesV2(body.states, 'exclude'), // ['NY', 'CA'],
		
		industries: esGetOptionValuesV2(body.industries), // ['accounting', 'capital markets', 'architecture & planning'],
		industriesExclude: esGetOptionValuesV2(body.industries, 'exclude'), // ['accounting', 'capital markets', 'architecture & planning'],
		
		employeeSizes: esGetOptionValuesV2(body.companySizeIds), // [5, 8],
		employeeSizesExclude: esGetOptionValuesV2(body.companySizeIds, 'exclude'), // [5, 8],
		
		companyRevenues: esGetOptionValuesV2(body.companyRevenueIds), // [6, 7],
		companyRevenuesExclude: esGetOptionValuesV2(body.companyRevenueIds, 'exclude'), // [6, 7],
		
		sicCodes: esGetOptionValuesV2(body.sicCodes), // ['8720', '9411', '273'],
		sicCodesExclude: esGetOptionValuesV2(body.sicCodes, 'exclude'), // ['8720', '9411', '273'],
		
		naicsCodes: esGetOptionValuesV2(body.companyNaicsCodes), // ['8720', '9411', '273'],
		naicsCodesExclude: esGetOptionValuesV2(body.companyNaicsCodes, 'exclude'), // ['8720', '9411', '273'],
		
		companyNames: esGetOptionValuesV2(body.companyNames), // ['google', 'microsoft'],
		companyNamesExclude: esGetOptionValuesV2(body.companyNames, 'exclude'), // ['google', 'microsoft'],
		
		urls: esGetOptionValuesV2(body.urls), // ['rampedup.io', 'google.com'],
		urlsExclude: esGetOptionValuesV2(body.urls, 'exclude'), // ['rampedup.io', 'google.com'],
		
		hasChangedJobRecently: body.hasChangedJobRecently ? true : false,
		
		urlsToSuppress: esGetOptionValuesV2(body.urlsToSuppress), // ['microsoft.com', 'yahoo.com'],
		
		linkedinUrls: esGetOptionValuesV2(body.linkedinUrls), // ['microsoft.com', 'yahoo.com'],
		linkedinUrlsExclude: esGetOptionValuesV2(body.linkedinUrls, 'exclude'), // ['microsoft.com', 'yahoo.com'],
		
		titlesToSuppress: esGetOptionValuesV2(body.titlesToSuppress), // ['Administrator', 'Software Developer'],
		
		emailsToSuppress: esGetOptionValuesV2(body.emailsToSuppress), // ['test@testemail.com'],
		
		emailAddresses: esGetOptionValuesV2(body.emailAddresses), // ['test@testemail.com'],
		
		hasRequiredEmail: body.hasRequiredEmail ? true : false,
		hasValidateEmails: body.hasValidateEmails ? true : false,
		hasPrimaryContactsOnly: body.hasPrimaryContactsOnly ? true : false,
		hasPersonalEmailOnly: body.hasPersonalEmailOnly ? true : false,
		hasDirectDialOnly: body.hasDirectDialOnly ? true : false,
		hasPhone: body.hasPhone ? true : false,
		hasLocalAddress: body.hasLocalAddress ? true : false,
		hasPhoneCell: body.hasPhoneCell ? true : false,
		hasWorkEmail: body.hasWorkEmail ? true : false,
		hasPersonalEmail: body.hasPersonalEmailOnly ? true : false,
		
		md5HashedEmailAddresses: esGetOptionValuesV2(body.md5HashedEmailAddresses),
		
		facebookUrls: esGetOptionValuesV2(body.facebookUrls),
		
		mobilePhones: esGetOptionValuesV2(body.mobilePhones),
		
		audience: body.audience ? true : false,
		
		page: body.page || 0, // using default page 1
		pageSize: Math.max(body.pageSize || 10, 10), // using default / max page size of 10
	};

	console.log('esGetOptionsV2 - result', JSON.stringify(options));
	return options;
};

const esGetFilters2 = (rawBody, append = false) => {
	const body = esGetOptionsV2(rawBody);
	console.log('esGetFilters - input - ', JSON.stringify({ rawBody, body }, null, 2));

	let filters = [];
	let query_strings = [];

	// apply keywords filter
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	/*
    if (body?.keywords instanceof Array) {
        const fields = ['name_first', 'name_middle', 'name_last', 'email_work', 'contact_facebookurl', 'contact_twitterurl', 'linkedin_url'];
        const query = [];
        for (let i = 0; i < fields.length; i++) {
            for (let j = 0; j < body.keywords.length; j++) {
                query.push({ match: { [fields[i]]: body.keywords[j] } });
            }
        }
        filters.push({ bool: { should: [...query] } });
    }*/

	// filter contact skills
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	/*
    query.push({
                    bool: {
                        must_not: { match: { [fields[i]]: body.urlsToSuppress[j] } },
                    },
                });
    */

	// -------------------------------------------------------------------------
	// keywords > first_name | last_name | job_title | seniority | department | primary_role
	// -------------------------------------------------------------------------
	if (body?.keywords instanceof Array && body?.keywords.length > 0) {
		const fields = ['first_name', 'last_name', 'job_title', 'seniority', 'department', 'primary_role'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.keywords.length; j++) {
				query.push({ match: { [fields[i]]: body.keywords[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// keywords > first_name | last_name | job_title | seniority | department | primary_role
	// -------------------------------------------------------------------------
	if (body?.keywordsExclude instanceof Array && body?.keywordsExclude.length > 0) {
		const fields = ['first_name', 'last_name', 'job_title', 'seniority', 'department', 'primary_role'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.keywordsExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.keywordsExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// contactSkills > skills
	// -------------------------------------------------------------------------
	if (body?.contactSkills instanceof Array && body?.contactSkills.length > 0) {
		const fields = ['skills'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactSkills.length; j++) {
				query.push({ match: { [fields[i]]: body.contactSkills[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// contactSkillsExclude > skills
	// -------------------------------------------------------------------------
	if (body?.contactSkillsExclude instanceof Array && body?.contactSkillsExclude.length > 0) {
		const fields = ['skills'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactSkillsExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.contactSkillsExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// md5HashedEmailAddresses >
	// -------------------------------------------------------------------------
	if (body?.md5HashedEmailAddresses instanceof Array && body?.md5HashedEmailAddresses.length > 0) {
		// const fields = ['emails.lower_md5', 'emails.upper_md5'];
		const fields = [];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.md5HashedEmailAddresses.length; j++) {
				query.push({ match: { [fields[i]]: body.md5HashedEmailAddresses[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// contactInterests > interests
	// filter contact skills
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.contactInterests instanceof Array && body?.contactInterests.length > 0) {
		const fields = ['interests'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactInterests.length; j++) {
				query.push({ match: { [fields[i]]: body.contactInterests[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// contactInterestsExclude > interests
	// -------------------------------------------------------------------------
	if (body?.contactInterestsExclude instanceof Array && body?.contactInterestsExclude.length > 0) {
		const fields = ['interests'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactInterestsExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.contactInterestsExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// seniority levels
	// -------------------------------------------------------------------------
	// filter seniority levels - ['cxo', 'vp', 'director']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	/*
    if (body?.seniorityLevels instanceof Array && body?.seniorityLevels.length>0) {
        const fields = ['job_level'];
        const query = [];
        for (let i = 0; i < fields.length; i++) {
            for (let j = 0; j < body.seniorityLevels.length; j++) {
                query.push({ match: { [fields[i]]: body.seniorityLevels[j] } });
                query.push({ match: { [fields[i]]: '' } });


            }
        }
        filters.push({ bool: { should: [...query] } });
    }*/

	/*
    query.push({
                bool: {
                    must: { exists: { field: fields[i] } },
                    must_not: { term: { [fields[i]]: '' } },
                },
            });
     */

	// -------------------------------------------------------------------------
	// seniorityLevels > job_title
	// job_level/seniority level title override checks
	// -------------------------------------------------------------------------
	if (body?.seniorityLevels instanceof Array && body?.seniorityLevels?.length > 0) {
		const fields = ['job_title'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.seniorityLevels.length; j++) {
				if (body.seniorityLevels[j].toLowerCase() == 'vp') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Vice President' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'VP' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'manager') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Manager' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'Mgr' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'director') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Director' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'senior') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Senior' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'junior') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Junior' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'junior') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'jr' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'training') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Training' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'unpaid') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Unpaid' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'consultant') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Consultant' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'staff') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Staff' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'entry') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Entry' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'owner') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Owner' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'Founder' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'partner') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Partner' } });
				}
				if (body.seniorityLevels[j].toLowerCase() == 'c-team') {
					query.push({ match_phrase_prefix: { [fields[i]]: 'Chief' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CEO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CFO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CEO' } });
					query.push({ match: { [fields[i]]: 'COO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CRO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CPO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CAO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CTO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CBO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CCO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CDO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CGO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CHO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CIO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CJO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CKO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CLO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CMO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CNO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CQO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CSO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CISO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CUO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CVO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CWO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CXO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CYO' } });
					query.push({ match_phrase_prefix: { [fields[i]]: 'CZO' } });
				}
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// seniorityLevelsExclude > job_title
	// -------------------------------------------------------------------------
	if (body?.seniorityLevelsExclude instanceof Array && body?.seniorityLevelsExclude?.length > 0) {
		const fields = ['job_title'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.seniorityLevelsExclude.length; j++) {
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'vp') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Vice President' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'VP' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'manager') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Manager' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Mgr' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'director') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Director' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'senior') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Senior' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'junior') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Junior' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'junior') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'jr' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'training') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Training' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'unpaid') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Unpaid' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'consultant') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Consultant' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'staff') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Staff' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'entry') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Entry' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'owner') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Owner' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Founder' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'partner') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Partner' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'c-team') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Chief' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CEO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CFO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CEO' } } } });
					query.push({ bool: { must_not: { match: { [fields[i]]: 'COO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CRO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CPO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CAO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CTO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CBO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CCO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CDO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CGO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CHO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CIO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CJO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CKO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CLO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CMO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CNO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CQO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CSO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CISO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CUO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CVO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CWO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CXO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CYO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CZO' } } } });
				}
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// seniorityLevelsExclude > None
	// filter contact job functions - ['customer_service', 'engineering', 'real_estate'],
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.departments instanceof Array && body?.departments.length > 0) {
		const fields = [];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.departments.length; j++) {
				query.push({ match_phrase_prefix: { [fields[i]]: body.departments[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// departmentsExclude > None
	// -------------------------------------------------------------------------
	if (body?.departmentsExclude instanceof Array && body?.departmentsExclude.length > 0) {
		const fields = [];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.departmentsExclude.length; j++) {
				query.push({ bool: { must_not: { match: { [fields[i]]: body.departmentsExclude[j] } } } });
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// seniorityLevelsExclude > job_title
	// -------------------------------------------------------------------------
	if (body?.seniorityLevelsExclude instanceof Array && body?.seniorityLevelsExclude?.length > 0) {
		const fields = ['job_title'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.seniorityLevelsExclude.length; j++) {
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'vp') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Vice President' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'VP' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'manager') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Manager' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Mgr' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'director') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Director' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'senior') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Senior' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'junior') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Junior' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'junior') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'jr' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'training') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Training' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'unpaid') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Unpaid' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'consultant') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Consultant' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'staff') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Staff' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'entry') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Entry' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'owner') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Owner' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Founder' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'partner') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Partner' } } } });
				}
				if (body.seniorityLevelsExclude[j].toLowerCase() == 'c-team') {
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'Chief' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CEO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CFO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CEO' } } } });
					query.push({ bool: { must_not: { match: { [fields[i]]: 'COO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CRO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CPO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CAO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CTO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CBO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CCO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CDO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CGO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CHO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CIO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CJO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CKO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CLO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CMO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CNO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CQO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CSO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CISO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CUO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CVO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CWO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CXO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CYO' } } } });
					query.push({ bool: { must_not: { match_phrase_prefix: { [fields[i]]: 'CZO' } } } });
				}
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hqLocations
	// filter company country location - ['United States', 'United Kingdom'],
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// hqLocations
	// -------------------------------------------------------------------------
	if (body?.hqLocations instanceof Array) {
		//
	}

	// -------------------------------------------------------------------------
	// cities > company_local_city | company_hq_city
	// filter company cities
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.cities instanceof Array && body?.cities.length > 0) {
		const fields = ['company_local_city', 'company_hq_city'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.cities.length; j++) {
				query.push({ match: { [fields[i]]: body.cities[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// name_first > first_name
	// filter first name
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.name_first instanceof Array && body?.name_first.length > 0) {
		const fields = ['first_name'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.name_first.length; j++) {
				query.push({ match: { [fields[i]]: body.name_first[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// name_last > last_name
	// filter last name
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.name_last instanceof Array && body?.name_last.length > 0) {
		const fields = ['last_name'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.name_last.length; j++) {
				query.push({ match: { [fields[i]]: body.name_last[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// states > person_state
	// filter company states - ['NY', 'CA']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.states instanceof Array && body?.states.length > 0) {
		//const fields = ['office_state', 'company_state', 'contact_personalstate'];
		const fields = ['person_state'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.states.length; j++) {
				query.push({ match: { [fields[i]]: body.states[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// statesExclude > person_state
	// -------------------------------------------------------------------------
	if (body?.statesExclude instanceof Array && body?.statesExclude.length > 0) {
		const fields = ['person_state'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.statesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.statesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// industries > company_industry
	// filter company industry - ['accounting', 'capital markets', 'architecture & planning']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.industries instanceof Array && body?.industries.length > 0) {
		const fields = ['company_industry'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.industries.length; j++) {
				//query.push({ match: { [fields[i]]: body.industries[j] } });
				query.push({ match_phrase_prefix: { [fields[i]]: body.industries[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// industriesExclude > company_industry
	// -------------------------------------------------------------------------
	if (body?.industriesExclude instanceof Array && body?.industriesExclude.length > 0) {
		const fields = ['company_industry'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.industriesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.industriesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// employeeSizes > company_employee_range
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.employeeSizes instanceof Array && body?.employeeSizes.length > 0) {
		const fields = ['company_employee_range'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.employeeSizes.length; j++) {
				//query.push({ match: { [fields[i]]: body.employeeSizes[j] } });
				query.push({ match_phrase_prefix: { [fields[i]]: body.employeeSizes[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// employeeSizesExclude > company_employee_range
	// -------------------------------------------------------------------------
	if (body?.employeeSizesExclude instanceof Array && body?.employeeSizesExclude.length > 0) {
		const fields = ['company_employee_range'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.employeeSizesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.employeeSizesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// companyRevenues > company_revenue_range
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.companyRevenues instanceof Array && body?.companyRevenues.length > 0) {
		const fields = ['company_revenue_range'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.companyRevenues.length; j++) {
				//query.push({ match: { [fields[i]]: body.companyRevenues[j] } });
				query.push({ match_phrase_prefix: { [fields[i]]: body.companyRevenues[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// companyRevenuesExclude > company_revenue_range
	// -------------------------------------------------------------------------
	if (body?.companyRevenuesExclude instanceof Array && body?.companyRevenuesExclude.length > 0) {
		const fields = ['company_revenue_range'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.companyRevenuesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.companyRevenuesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// sicCodes > company_sic4
	// filter company sic codes - ['8720', '9411', '273']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.sicCodes instanceof Array && body?.sicCodes.length > 0) {
		const fields = ['company_sic4'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.sicCodes.length; j++) {
				query.push({ match: { [fields[i]]: body.sicCodes[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// sicCodesExclude > company_sic4
	// -------------------------------------------------------------------------
	if (body?.sicCodesExclude instanceof Array && body?.sicCodesExclude.length > 0) {
		const fields = ['company_sic4'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.sicCodesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.sicCodesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// naicsCodes > company_naics
	// -------------------------------------------------------------------------
	if (body?.naicsCodes instanceof Array && body?.naicsCodes.length > 0) {
		const fields = ['company_naics'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.naicsCodes.length; j++) {
				query.push({ match: { [fields[i]]: body.naicsCodes[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// naicsCodesExclude > company_naics
	// -------------------------------------------------------------------------
	if (body?.naicsCodesExclude instanceof Array && body?.naicsCodesExclude.length > 0) {
		const fields = ['company_naics'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.naicsCodesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.naicsCodesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// companyNames > company
	// filter company name - ['google', 'microsoft']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.companyNames instanceof Array && body?.companyNames.length > 0) {
		const fields = ['company_name'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.companyNames.length; j++) {
				query.push({ match_phrase_prefix: { [fields[i]]: body.companyNames[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// companyNamesExclude > company_name
	// -------------------------------------------------------------------------
	if (body?.companyNamesExclude instanceof Array && body?.companyNamesExclude.length > 0) {
		const fields = ['company_name'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.companyNamesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.companyNamesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// urls > company_domain | company_website
	// filter company urls/domains - ['rampedup.io', 'google.com']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.urls instanceof Array && body?.urls.length > 0) {
		const fields = ['company_domain', 'company_website'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.urls.length; j++) {
				query.push({
					prefix: { [fields[i]]: body.urls[j].replace('https', '').replace('http', '').replace('://', '').replace('www.', '') },
				});
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// urlsExclude > company_domain
	// -------------------------------------------------------------------------
	if (body?.urlsExclude instanceof Array && body?.urlsExclude.length > 0) {
		const fields = ['company_domain'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.urlsExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.urlsExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// contactTitles > job_title
	// filter job titles - ['CEO', 'Owner', 'Software Engineer']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.contactTitles instanceof Array && body?.contactTitles.length > 0) {
		const fields = ['job_title'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactTitles.length; j++) {
				query.push({ match_phrase_prefix: { [fields[i]]: body.contactTitles[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// contactTitlesExclude > job_title
	// -------------------------------------------------------------------------
	if (body?.contactTitlesExclude instanceof Array && body?.contactTitlesExclude.length > 0) {
		const fields = ['job_title'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactTitlesExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.contactTitlesExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// linkedinUrls > linkedin_url
	// -------------------------------------------------------------------------
	if (body?.linkedinUrls instanceof Array && body?.linkedinUrls.length > 0) {
		const fields = ['linkedin_url'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.linkedinUrls.length; j++) {
				if (body.linkedinUrls[j].includes('https://l')) {
					body.linkedinUrls[j] = body.linkedinUrls[j].replace('https://l', 'https://www.l');
				}
				if (body.linkedinUrls[j].includes('http://l')) {
					body.linkedinUrls[j] = body.linkedinUrls[j].replace('http://l', 'https://www.l');
				}
				if (body.linkedinUrls[j].includes('http://www.l')) {
					body.linkedinUrls[j] = body.linkedinUrls[j].replace('http://www.l', 'https://www.l');
				}
				if (body.linkedinUrls[j].startsWith('link')) {
					body.linkedinUrls[j] = body.linkedinUrls[j].replace('link', 'https://www.link');
				}
				query.push({ match_phrase_prefix: { [fields[i]]: body.linkedinUrls[j] } });
				query.push({ match_phrase_prefix: { [fields[i]]: body.linkedinUrls[j].replace('https://', '').replace('www.', '') } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// facebookUrls > facebook_profile
	// -------------------------------------------------------------------------
	if (body?.facebookUrls instanceof Array && body?.facebookUrls.length > 0) {
		const fields = ['facebook_profile'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.facebookUrls.length; j++) {
				query.push({ match_phrase_prefix: { [fields[i]]: body.facebookUrls[j] } });
				query.push({ match_phrase_prefix: { [fields[i]]: body.facebookUrls[j].replace('http://', 'https://') } });
				query.push({ match_phrase_prefix: { [fields[i]]: body.facebookUrls[j].replace('http://', '').replace('https://', '').replace('www.', '') } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// mobilePhones > mobile_number
	// -------------------------------------------------------------------------
	if (body?.mobilePhones instanceof Array && body?.mobilePhones.length > 0) {
		const fields = ['mobile_number'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.mobilePhones.length; j++) {
				query.push({ match_phrase_prefix: { [fields[i]]: body.mobilePhones[j] } });
				query.push({
					match_phrase_prefix: {
						[fields[i]]:
							'+1' + body.mobilePhones[j].replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace('+1', '').replace('1 ', ''),
					},
				});
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// filter job titles - ['CEO', 'Owner', 'Software Engineer']
	// @see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
	// -------------------------------------------------------------------------
	if (body?.contactEducation instanceof Array && body?.contactEducation.length > 0) {
		const fields = ['education.school'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactEducation.length; j++) {
				query.push({ match_phrase_prefix: { [fields[i]]: body.contactEducation[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// contactEducationExclude > education.school
	// -------------------------------------------------------------------------
	if (body?.contactEducationExclude instanceof Array && body?.contactEducationExclude.length > 0) {
		const fields = ['education.school'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.contactEducationExclude.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.contactEducationExclude[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasChangedJobRecently > None
	// filter company urls/domains - ['rampedup.io', 'google.com']
	// stackoverflow.com/questions/14745210/create-elasticsearch-curl-query-for-not-null-and-not-empty
	// -------------------------------------------------------------------------
	if (body.hasChangedJobRecently === true) {
		const fields = [];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// urlsToSuppress > company_domain
	// filter urls/domains to suppress - ['rampedup.io', 'google.com']
	// @see https://stackoverflow.com/questions/22777700/elasticsearch-match-list-against-field
	// -------------------------------------------------------------------------
	if (body?.urlsToSuppress instanceof Array && body?.urlsToSuppress.length > 0) {
		const fields = ['company_domain', 'company_website'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.urlsToSuppress.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.urlsToSuppress[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// titlesToSuppress > job_title
	// filter titles to suppress - ['Administrator', 'Software Developer']  job_title
	// @see https://stackoverflow.com/questions/22777700/elasticsearch-match-list-against-field
	// -------------------------------------------------------------------------
	if (body?.titlesToSuppress instanceof Array && body?.titlesToSuppress.length > 0) {
		const fields = ['job_title'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.titlesToSuppress.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.titlesToSuppress[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// emailsToSuppress > work_email | work_email_history
	// filter emails to suppress - ['test@testemail.com']
	// @see https://stackoverflow.com/questions/22777700/elasticsearch-match-list-against-field
	// -------------------------------------------------------------------------
	if (body?.emailsToSuppress instanceof Array && body?.emailsToSuppress.length > 0) {
		const fields = ['work_email', 'personal_email'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.emailsToSuppress.length; j++) {
				query.push({
					bool: {
						must_not: { match: { [fields[i]]: body.emailsToSuppress[j] } },
					},
				});
			}
		}
		filters.push({ bool: { filter: [...query] } });
	}

	// -------------------------------------------------------------------------
	// emailAddresses > work_email | work_email_history | personal_email | personal_email2 | personal_email_history
	// -------------------------------------------------------------------------
	if (body?.emailAddresses instanceof Array && body?.emailAddresses.length > 0) {
		const fields = ['work_email', 'personal_email', 'personal_email2', 'personal_email_history.personal_email'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			for (let j = 0; j < body.emailAddresses.length; j++) {
				//query_strings.push({ query_string: { "query": [fields[i]]+".keyword:"+body.emailAddresses[j] } });
				query.push({ match_phrase_prefix: { [fields[i]]: body.emailAddresses[j] } });
			}
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasRequiredEmail > work_email
	// filter emails presence - ['test@testemail.com']
	// @see https://stackoverflow.com/questions/14745210/create-elasticsearch-curl-query-for-not-null-and-not-empty
	// -------------------------------------------------------------------------
	if (body.hasRequiredEmail === true) {
		const fields = ['work_email'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasPersonalEmailOnly > personal_email | personal_email2
	// -------------------------------------------------------------------------
	if (body.hasPersonalEmailOnly === true) {
		const fields = ['personal_email', 'personal_email2'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// filter valid emails
	// -------------------------------------------------------------------------
	if (body.hasValidateEmails === true) {
		//
	}

	// -------------------------------------------------------------------------
	// hasPrimaryContactsOnly > work_email
	// filter primary contact presence
	// @see https://stackoverflow.com/questions/14745210/create-elasticsearch-curl-query-for-not-null-and-not-empty
	// -------------------------------------------------------------------------
	if (body.hasPrimaryContactsOnly === true) {
		const fields = ['work_email'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// personalEmailOnly > personal_email | personal_email2
	// filter company urls/domains - ['rampedup.io', 'google.com']
	// @see https://discuss.elastic.co/t/filter-on-array-of-object/270004/2
	// -------------------------------------------------------------------------
	if (body.personalEmailOnly === true) {
		const fields = ['personal_email', 'personal_email2'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({ match: { 'emails.email_type': 'personal' } });
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasDirectDialOnly > direct_dial
	// filter contact direct dial - phone presence
	// @see https://stackoverflow.com/questions/14745210/create-elasticsearch-curl-query-for-not-null-and-not-empty
	// @see https://stackoverflow.com/questions/28538760/elasticsearch-bool-query-combine-must-with-or
	// -------------------------------------------------------------------------
	if (body.hasDirectDialOnly === true) {
		const fields = ['direct_dial', 'work_number'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasPhoneCell > mobile_number
	// -------------------------------------------------------------------------
	if (body.hasPhoneCell === true) {
		const fields = ['mobile_number'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasWorkEmail > work_email
	// -------------------------------------------------------------------------
	if (body.hasWorkEmail === true) {
		const fields = ['work_email'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasPersonalEmail > personal_email
	// -------------------------------------------------------------------------
	if (body.hasPersonalEmail === true) {
		const fields = ['personal_email', 'personal_email2'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasPhone > direct_dial | mobile_number | work_number
	// filter contact phone presence
	// @see https://stackoverflow.com/questions/14745210/create-elasticsearch-curl-query-for-not-null-and-not-empty
	// @see https://stackoverflow.com/questions/28538760/elasticsearch-bool-query-combine-must-with-or
	// -------------------------------------------------------------------------
	if (body.hasPhone === true) {
		const fields = ['direct_dial', 'mobile_number', 'work_number'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// audience > None
	// -------------------------------------------------------------------------
	if (body.audience === true) {
		console.log('body audience searching for cell personal and work email');
		const fields = [];
		let query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: '' } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
		query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					// must_not: { term: { [fields[i] + '.keyword']: 'null' } },
					must_not: { term: { [fields[i]]: 'null' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// hasLocalAddress > None
	// filter contact personal address
	// @see https://stackoverflow.com/questions/14745210/create-elasticsearch-curl-query-for-not-null-and-not-empty
	// @see https://stackoverflow.com/questions/28538760/elasticsearch-bool-query-combine-must-with-or
	// -------------------------------------------------------------------------
	if (body.hasLocalAddress === true) {
		const fields = ['person_postal'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({
				bool: {
					must: { exists: { field: fields[i] } },
					must_not: { term: { [fields[i]]: '' } },
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// -------------------------------------------------------------------------
	// es query
	// -------------------------------------------------------------------------
	let result = { query: { bool: { should: [{ bool: { filter: filters } }] } } };
	if (query_strings.length > 0 || append) {
		result = { query: { bool: { should: [...query_strings, ...filters] } } };
	}

	console.log('esGetFilters - success - ', JSON.stringify(result, null, 2));
	return result;
};

const esGetPaginationQuery2 = (body) => {
	//console.log('esGetPaginationQuery - input - ', body);
	let page;
	let size;
	let from;

	// parse page size
	try {
		size = Math.min(Math.abs(parseInt(body.pageSize || '10')), 500);
		if (isNaN(size)) {
			size = 10;
		}
	} catch (e) {
		size = 10;
	}

	// parse page
	try {
		page = Math.max(Math.abs(parseInt(body.page || '0')), 0);
		from = size * page;
		if (isNaN(from)) {
			from = 0;
		}
	} catch (e) {
		from = 0;
	}

	const options = { page, from, size };
	const params = new URLSearchParams(options);
	//console.log('esGetPaginationQuery - success -', { options, params });

	return { params, options };
};

const esNormalizeDocument2 = (document) => {
	console.log('esNormalizeDocument2 - input', JSON.stringify(document));
	const data = { ...document._source, pid: document._id, uuid: document._id };

	// Data is already normalized in our OpenSearch instance - no need to process any further
	console.log('esNormalizeDocument2 - output', JSON.stringify(data));
	return data;

	// Normalize personal email
	let personal_email = '';
	if (data.personal_email) {
		personal_email = data.personal_email.replace(/\[|\]|\'/g, '');
		const personal_emails = personal_email.split(',');
		personal_email = personal_emails[0].trim();
	}

	const doc = {
		nymblr_id: data.nymblr_id,
		ruid: document._id,
		contactFirstName: data.name_first,
		contactMiddleName: data.name_middle,
		contactLastName: data.name_last,
		contactFullName: [data.name_first, data.name_middle, data.name_last].filter((str) => str?.trim()?.length).join(' '),
		companyName: data.company,
		companyStartDate: data.contact_jobstartdate,
		companyEndDate: null,
		contactTitle: data.job_title,
		contactTitleLevel: data.job_level,
		contactJobFunctions: data.job_function,
		contactEmail: data.email_work,
		contactPersonalEmail: personal_email,
		historicalEmails: (data.emails || []).filter((item) => item.email).map((item) => item.email),
		directDialPhone: data.phone_cell,
		directDialType: null,
		contactLocation: data.contact_personaladdress,
		contactCity: data.contact_personalcity,
		contactState: data.contact_personalstate,
		contactZipCode: data.contact_postalcode,
		contactCountry: null,
		contactContinent: null,
		contactSkills: data.contact_skills,
		contactLinkedinURL: data.linkedin_url,
		contactFacebook: data.contact_facebookurl,
		contactTwitterURL: data.contact_twitterurl,
		contactEducation: (data.contact_education || []).map((item) => ({
			schoolName: item.school,
			startDate: item.start_date,
			endDate: item.end_date,
			degrees: item.degrees,
		})),
		contactBirthDate: data.contact_birthyear,
		contactGender: data.contact_gender,
		contactPhone: data.phone_cell,
		contactOfficeCity: data.office_city,
		contactOfficeAddress: data.office_address,
		contactOfficeState: data.office_state,
		contactOfficeCountry: null,
		contactOfficeZipCode: data.office_postal,
		lastUpdatedDate: data.timestamp,
		contactLinkedinConnectionCount: data.contact_linkedinconnections,
		hasChangedJobRecently: data.contact_recentjobchange,
		companyId: null,
		companyLinkedinURL: data.company_linkedinurl,
		companyDomain: data.company_domain,
		companyAddressLine1: data.company_address,
		companyAddressLine2: null,
		companyCity: data.company_city,
		companyRegion: null,
		companyCountry: null,
		companyZipCode: data.company_postal,
		companyPhone: data.phone_company,
		companyEmployees: data.company_employeecount,
		companyemployeeSizeRange: data.company_employeecount,
		companyRevenueRange: data.company_revenue,
		companySpecialties: null,
		companyPrimaryIndustry: data.company_primaryindustry,
		companySIC: data.company_sic,
		companyType: null,
		companyStatus: null,
		companyFoundedYear: null,
		companyLinkedinFollowers: data.company_linkedinfollowers,
		companyNAICSCode: data.company_naics,
		companySICCode6: null,
		formerTitles: (data.contact_experience || []).map((item) => item.title),
		formerCompanies: (data.contact_experience || []).map((item) => item.company),
		personalEmail: personal_email,
	};
	//console.log('esNormalizeDocument - success', doc);
	//personalEmail: (data.personal_email || "").replace('[').replace(']').replace('\'').replace('"').toLowerCase()
	//personalEmail: (data.emails || []).find((item) => item.email_type.toLowerCase() === 'personal')?.email,
	return doc;
};

//'contactTitle',
const esMaskDocument2 = (document) => {
	// console.log('esMaskDocument2 - input', JSON.stringify(document));
	const keysToMask = [
		// 'pid',
		// 'first_name',
		// 'last_name',
		// 'middle_name',
		// 'full_name',
		// 'job_title',
		// 'seniority',
		// 'department',
		// 'primary_role',
		// 'secondary_role',
		'linkedin_profile',
		'linkedin_connection_count',
		'work_email',
		'work_email_history',
		'personal_email',
		'personal_email2',
		'personal_email_history',
		'direct_dial',
		'mobile_number',
		'mobile_number_history',
		'work_number',
		// 'education',
		// 'skills',
		// 'interests',
		'linkedin_headline',
		'facebook_profile',
		'twitter_profile',
		'work_experience',
		'salary',
		// 'birth_year',
		// 'age',
		// 'gender',
		'new_hire',
		'job_start_date',
		// 'company_name',
		'company_domain',
		'company_website',
		'company_linkedin_profile',
		'company_linkedin_followers',
		'company_local_address',
		'company_local_city',
		'company_local_state',
		'company_local_address_postal',
		'company_hq_address',
		'company_hq_city',
		'company_hq_state',
		'company_hq_postal',
		'person_city',
		'person_state',
		'person_postal',
		'company_employee_range',
		'company_revenue_range',
		'company_industry',
		'company_sic4',
		'company_sic4_description',
		'company_naics',
		'company_naics_description',
		'company_type',
	];
	let doc = JSON.parse(JSON.stringify(document));
	for (let i = 0; i < keysToMask.length; i++) {
		if ([undefined, null, ''].includes(doc[keysToMask[i]])) {
			continue;
		}
		doc[keysToMask[i]] = '***';
	}
	// console.log('esMaskDocument2 - output', JSON.stringify(document));
	return doc;
};

/**
 * @summary
 * Search documents in elasticsearch
 *
 * @param {Object} body json object containing filter values
 * @returns {Elasticsearch.SearchResponse}
 */
const esSearch2 = async (body, mask = true, append = false, api = false) => {
	console.log('esSearch - input', JSON.stringify({ body, mask, append, api }));
	let options = await esGetFilters2(body, false);

	const pagination = await esGetPaginationQuery2(body);
	const { page, from, size } = pagination.options;
	try {
		// const response = await elasticClient.search({ index, from, size, body: options });
		// const responseCount = await elasticClient.count({ index, body: options });
		// console.log('esSearch - success - ', response.hits.total);
		// console.log('esSearch - responseCount', responseCount);

		// Query results count path
		const urlSearch = `/${ES_INDEX}/_count`;
		let responseCount = {};
		responseCount.count = 0;
		if (!api) {
			responseCount = await esRequest2('POST', urlSearch, options);
		}
		console.log('esSearch2 - total number of records in query', JSON.stringify({ responseCount }));

		// Search path
		const url = `/${ES_INDEX}/_search?from=${from}&size=${size}`;
		let main_options = options;
		// main_options.sort = ['_id'];
		if (append) {
			//options = await esGetFilters(body,true);
			//main_options = options;
			//main_options.sort = ['_score'];
			options = await esGetFilters2(body, false);
			main_options = options;
			//main_options.sort = ['_score'];
		}
		console.log('esSearch2 - search query without sort', JSON.stringify({ url, main_options }));

		// Add sorting
		main_options = {
			...main_options,
			sort: [
				{ _score: { order: 'asc' } }, // or 'desc' for descending order
				{ id: 'asc' },
			],
		};
		console.log('esSearch2 - search query with sort', JSON.stringify({ url, main_options }));

		const response = await esRequest2('POST', url, main_options);
		console.log(' mask value: ', mask);
		let results = [];
		for (let i = 0; i < response.hits.hits.length; i++) {
			const doc = await esNormalizeDocument2(response.hits.hits[i]);
			if (mask) {
				const docMasked = await esMaskDocument2(doc);
				results.push(docMasked);
			} else {
				results.push(doc);
			}
		}
		return { contacts: results, totalCount: responseCount.count, page, pageSize: size };
	} catch (err) {
		console.log('esSearch - error - ', err);
		return err;
	}
};

/**
 * @summary
 * Fetch elasticsearch document by id
 *
 * @see
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html#docs-get
 *
 * @param {string} id document id
 * @returns {Object} the result document
 */
const esGetById2 = async (id) => {
	//console.log('esGetById - id - ', id);
	try {
		// const response = await elasticClient.get({ index, id, type: '_doc' });
		const url = `/${ES_INDEX}/_doc/${id}`;
		const response = await esRequest2('GET', url);
		console.log('esGetById - success', response);
		return esNormalizeDocument2(response);
	} catch (err) {
		console.log('esGetById - error - ', err);
		return err;
	}
};

module.exports = {
	esGetOptionValuesV2,
	esGetOptionsV2,
	esGetFilters2,
	esGetPaginationQuery2,
	esNormalizeDocument2,
	esSearch2,
	esGetById2,
	esRequest2,
};

// const rawBody = {
// 	"website": "",
// 	"firstName": [],
// 	"lastName": [],
// 	"yearFounded": "",
// 	"keywords": [
// 		{
// 			"label": "ceo",
// 			"value": "ceo",
// 			"__isNew__": true
// 		},
// 		{
// 			"label": "cto",
// 			"value": "cto",
// 			"__isNew__": true
// 		}
// 	],
// 	"urls": [],
// 	"industries": [],
// 	"jobTitles": [],
// 	"sicCodes": [],
// 	"companyNames": [],
// 	"employeeSizes": [],
// 	"departments": [],
// 	"skills": [],
// 	"schools": [],
// 	"interests": [],
// 	"seniorityLevels": [],
// 	"companyRevenues": [],
// 	"hqLocations": [],
// 	"cities": [],
// 	"states": [],
// 	"companyTypes": [],
// 	"urlsToSuppress": [],
// 	"titlesToSuppress": [],
// 	"emailsToSuppress": [],
// 	"hasChangedJobRecently": false,
// 	"hasPrimaryContactsOnly": false,
// 	"hasPhone": false,
// 	"hasDirectDialOnly": true,
// 	"hasRequiredEmail": true,
// 	"hasPersonalEmailOnly": true,
// 	"hasLocalAddress": false,
// 	"hasValidateEmails": false,
// 	"excludeExisting": false,
// 	"filterId": "random-68cfbb12-11fc-4f9d-96a6-903db2a90c33",
// 	"pageSize": 10
// };

// const options = esGetOptionsV2(rawBody);

// console.log(JSON.stringify({ options }));
// console.log(JSON.stringify(esGetFilters2(options)))
// console.log(JSON.stringify(esGetFilters2(rawBody)))

// console.log(esGetOptionValuesV2([
// 	{
// 		"value": "vp",
// 		"label": "VP",
// 		"included": true,
// 		"excluded": false
// 	}
// ]));

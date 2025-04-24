const { sentenceCase } = require('sentence-case');
const { v4: uuidv4, v4 } = require('uuid');
const { ddbEncode, ddbDecode, ddbGetItem, ddbPutItem, ddbQuery, ddbUpdateItem, ddbDeleteItem } = require('./ddb-utils');
const {
	API_BYTEMINEGRAPHAPI_BYTEMINESUBTABLE_NAME: SUBSCRIPTIONTABLE_NAME,
	API_BYTEMINEGRAPHAPI_BYTEMINEENRICHMENTTABLE_NAME: ENRICHMENTTABLE_NAME,
	API_BYTEMINEGRAPHAPI_BYTEMINECONTACTTABLE_NAME: CONTACTTABLE_NAME,
	API_BYTEMINEGRAPHAPI_BYTEMINEUSAGETABLE_NAME: USAGETABLE_NAME,
} = process.env;

const getCredits = async (teamId, raw = false, verbose = false) => {
	if (verbose) {
		console.log('getCredits - ', { teamId, raw });
	}
	try {
		const credits = await ddbQuery(
			SUBSCRIPTIONTABLE_NAME,
			'listSubByTeamId',
			'#teamId = :teamId',
			{
				'#teamId': 'teamId',
			},
			{
				':teamId': { S: teamId },
			}
		);
		const creditItems = credits.map((item) => ddbDecode(item));
		if (verbose) {
			console.log('getCredits - success - ', JSON.stringify(creditItems, null, 2));
		}
		if (raw) {
			return creditItems;
		}
		const result = parseInt(creditItems?.[0]?.currentCredits?.toString());
		if (verbose) {
			console.log('getCredits - success - ', { result });
		}
		return result;
	} catch (err) {
		if (verbose) {
			console.log('getCredits - error -', err);
		}
		throw err;
	}
};

const addUsage = async (teamId, userId, credits, enrichmentId) => {
	try {
		const now = new Date().toISOString();
		const options = {
			id: v4(),
			owner: userId,
			teamId: teamId,
			userId: userId,
			filterId: enrichmentId,
			credits: credits,
			createdAt: now,
			updatedAt: now,
		};
		console.log('USAGETABLE_NAME - ', USAGETABLE_NAME, ' - options ', options);
		const response = await ddbPutItem(USAGETABLE_NAME, ddbEncode(options), true);
		return response;
	} catch (err) {
		console.log('create Usage - error -', err);
		throw err;
	}
};

const updateCredits = async (teamId, valueToCreditOrDebit, verbose = false) => {
	if (verbose) {
		console.log('updateCredits - ', { teamId });
	}
	try {
		const credits = await getCredits(teamId, true);
		const id = credits[0].id;
		const currentCredits = parseInt(credits[0].currentCredits);
		const response = await ddbUpdateItem(
			SUBSCRIPTIONTABLE_NAME,
			ddbEncode({ id }),
			'set #currentCredits = :currentCredits',
			{
				'#currentCredits': 'currentCredits',
			},
			ddbEncode({
				':currentCredits': (currentCredits - valueToCreditOrDebit).toString(),
			})
		);
		if (verbose) {
			console.log('updateCredits - success - ', response);
		}
		return response;
	} catch (err) {
		if (verbose) {
			console.log('updateCredits - error -', err);
		}
		throw err;
	}
};

const getEsFilter = async (csvRow, email, phone, linkedin, facebook, verbose = true) => {
	if (verbose) {
		console.log('getEsFilter - ', { csvRow, email, phone, linkedin, facebook });
	}

	// make sure we have atleast 1 required key
	if (!phone && !email && !linkedin && !facebook) {
		console.log('getEsFilter - at least one of email, phone, linkedin or facebook is required - exit');
		return;
	}

	// make sure we have atleast 1 required key
	if (!csvRow[phone] && !csvRow[email] && !csvRow[linkedin] && !csvRow[facebook]) {
		console.log('getEsFilter - no matching key found in row - exit');
		return;
	}

	let filters = [];
	let queries = [];

	// filter by phone
	let phoneValue = csvRow[phone];
	if (phoneValue) {
		const fields = ['direct_dial', 'mobile_number', 'work_number'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			query.push({ match_phrase_prefix: { [fields[i]]: phoneValue } });
			query.push({
				match_phrase_prefix: {
					[fields[i]]: '+1' + phoneValue.replace('(', '').replace(')', '').replace('-', '').replace(' ', '').replace('+1', '').replace('1 '),
				},
			});
		}
		filters.push({ bool: { should: [...query] } });
	}

	// filter by email
	let emailValue = csvRow[email];
	if (emailValue) {
		const fields = ['work_email', 'personal_email', 'personal_email2'];
		for (let i = 0; i < fields.length; i++) {
			queries.push({ query_string: { query: [fields[i]] + '.keyword:' + emailValue } });
		}
	}

	// filter by linkedin
	let linkedinValue = csvRow[linkedin];
	if (linkedinValue) {
		const fields = ['linkedin_profile'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			if (linkedinValue.includes('https://l')) {
				linkedinValue = linkedinValue.replace('https://l', 'https://www.l');
			}
			if (linkedinValue.includes('http://l')) {
				linkedinValue = linkedinValue.replace('http://l', 'https://www.l');
			}
			if (linkedinValue.includes('http://www.l')) {
				linkedinValue = linkedinValue.replace('http://www.l', 'https://www.l');
			}
			if (linkedinValue.startsWith('link')) {
				linkedinValue = linkedinValue.replace('link', 'https://www.link');
			}
			query.push({ match_phrase_prefix: { [fields[i]]: linkedinValue } });
			query.push({ match_phrase_prefix: { [fields[i]]: linkedinValue.replace('https://', '').replace('www.', '') } });
		}
		filters.push({ bool: { should: [...query] } });
	}

	// filter by facebook
	let facebookValue = csvRow[facebook];
	console.log({ facebookValue });
	if (facebookValue) {
		const fields = ['facebook_profile'];
		const query = [];
		for (let i = 0; i < fields.length; i++) {
			if (facebookValue.includes('https://f')) {
				facebookValue = facebookValue.replace('https://f', 'https://www.f');
			}
			if (facebookValue.includes('http://f')) {
				facebookValue = facebookValue.replace('http://f', 'https://www.f');
			}
			if (facebookValue.includes('http://www.f')) {
				facebookValue = facebookValue.replace('http://www.f', 'https://www.f');
			}
			if (facebookValue.startsWith('face')) {
				facebookValue = facebookValue.replace('face', 'https://www.face');
			}
			query.push({ match_phrase_prefix: { [fields[i]]: facebookValue } });
			query.push({ match_phrase_prefix: { [fields[i]]: facebookValue.replace('https://', '').replace('www.', '') } });
		}
		filters.push({ bool: { should: [...query] } });
	}

	// final es filter
	const params = { query: { bool: { should: [...queries, ...filters] } } };
	console.log('getEsFilter - success ', JSON.stringify(params));

	return params;
};

/**
 * @note
 * This is a clone of esNormalizeDocument in rest api and must be kept in sync
 */
const esNormalizeDocument = (document) => {
	const data = document._source;
	return { ...data };
};

const saveContact = async (contact, owner, teamId, userId, verbose = false) => {
	if (verbose) {
		console.log('saveContact - input - ', { contact, teamId, userId });
	}

	// prepare id - exit if encounters error
	let id;
	try {
		id = contact._id + '-' + teamId;
	} catch (err) {
		console.log('saveContact - id not found - exit', err);
		throw err;
	}

	// delete existing contact if it exists
	try {
		await ddbDeleteItem(CONTACTTABLE_NAME, ddbEncode({ id }), false);
	} catch (err) {
		if (verbose) {
			console.log('saveContact - error in delete old - continue', id, err);
		} else {
			console.log('saveContact - error in delete old ', id);
		}
	}

	/**
	 * @note
	 * please keep this in sync with save contact in the rest api lambda
	 */
	try {
		const doc = esNormalizeDocument(contact);
		const now = new Date().toISOString();
		const options = {
			...doc,
			id,
			owner,
			userId,
			teamId,
			isUnlocked: true,
			createdAt: now,
			updatedAt: now,
		};
		if (verbose) {
			console.log('saveContact - contact - ', JSON.stringify(options));
		}
		const response = await ddbPutItem(CONTACTTABLE_NAME, ddbEncode(options), false);
		if (verbose) {
			console.log('saveContact - success - ', response);
		} else {
			console.log('saveContact - success - ', id);
		}
		return options;
	} catch (err) {
		if (verbose) {
			console.log('saveContact - error while try to delete contact - continue', id, err);
		} else {
			console.log('saveContact - error while try to delete contact ', id);
		}
		throw err;
	}
};

const updateEnrichment = async (id, recordsProcessed, verbose = false) => {
	if (verbose) {
		console.log('updateEnrichment - input ', { id, recordsProcessed });
	}
	try {
		const updatedAt = new Date().toISOString();
		const params = { id, recordsProcessed, updatedAt };
		const response = await ddbUpdateItem(
			ENRICHMENTTABLE_NAME,
			ddbEncode({ id }),
			'set #recordsProcessed=:recordsProcessed, #updatedAt=:updatedAt',
			{
				'#recordsProcessed': 'recordsProcessed',
				'#updatedAt': 'updatedAt',
			},
			ddbEncode({
				':recordsProcessed': recordsProcessed,
				':updatedAt': updatedAt,
			}),
			verbose
		);
		if (verbose) {
			console.log('updateEnrichment - success ', response);
		}
		return params;
	} catch (err) {
		if (verbose) {
			console.log('updateEnrichment - error -', err);
		}
		throw err;
	}
};

const updateEnrichmentCount = async (id, recordsEnriched, verbose = false) => {
	if (verbose) {
		console.log('updateEnrichmentCount - input ', { id, recordsEnriched });
	}
	try {
		const job = await ddbGetItem(ENRICHMENTTABLE_NAME, ddbEncode({ id }));
		const jobItem = await ddbDecode(job.Item, verbose);
		if (verbose) {
			console.log('updateEnrichmentCount - jobItem', jobItem);
		}
		const oldVal = jobItem.recordsEnriched;
		const newVal = oldVal + recordsEnriched;
		const updatedAt = new Date().toISOString();
		const params = { id, oldVal, newVal, updatedAt };
		if (verbose) {
			console.log('updateEnrichmentCount - ', params);
		}
		const response = await ddbUpdateItem(
			ENRICHMENTTABLE_NAME,
			ddbEncode({ id }),
			'set #recordsEnriched=:recordsEnriched, #updatedAt=:updatedAt',
			{
				'#recordsEnriched': 'recordsEnriched',
				'#updatedAt': 'updatedAt',
			},
			ddbEncode({
				':recordsEnriched': newVal,
				':updatedAt': updatedAt,
			}),
			verbose
		);
		if (verbose) {
			console.log('updateEnrichmentCount - success ', response);
		}
		return params;
	} catch (err) {
		if (verbose) {
			console.log('updateEnrichmentCount - error -', err);
		}
		throw err;
	}
};

const arrayToCsv = (data) => data.reduce((acc, curr) => `${acc}${Object.values(curr).join('|')}\n`, '');

const keysToExport = [
    'id',
    'first_name',
    'last_name',
    'middle_name',
    'full_name',
    'job_title',
    'seniority',
    'department',
    'primary_role',
    'secondary_role',
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
    'education',
    'skills',
    'interests',
    'linkedin_headline',
    'facebook_profile',
    'twitter_profile',
    'work_experience',
    'salary',
    'birth_year',
    'age',
    'gender',
    'new_hire',
    'job_start_date',
    'company_name',
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

const getExportLabels = (addnl_keys) => {
	if (!addnl_keys) {
		addnl_keys = [];
	}
	let keysOut = keysToExport.map((key) => sentenceCase(key));
	return [...addnl_keys, ...keysOut];
};

const getExportData = (data, addnl_keys) => {
	if (!addnl_keys) {
		addnl_keys = [];
	}
	let outKeys = [...addnl_keys, ...keysToExport];
	const newItem = {};
	const contact = data;
	outKeys.forEach((key) => {
		newItem[key] = contact[key] || '';
	});
	return newItem;
};

module.exports = {
	updateCredits,
	getEsFilter,
	esNormalizeDocument,
	saveContact,
	updateEnrichment,
	updateEnrichmentCount,
	arrayToCsv,
	keysToExport,
	getExportLabels,
	getExportData,
	addUsage,
};

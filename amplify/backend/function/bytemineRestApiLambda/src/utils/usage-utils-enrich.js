const { v4 } = require('uuid');
const { ddbEncode, ddbDecode, ddbGetItem, ddbPutItem, ddbQuery, ddbUpdateItem, ddbDeleteItem } = require('./ddb-utils');

const { API_BYTEMINEGRAPHAPI_BYTEMINESUBTABLE_NAME: SUBSCRIPTIONTABLE_NAME, API_BYTEMINEGRAPHAPI_BYTEMINEUSAGETABLE_NAME: USAGETABLE_NAME } = process.env;

const getCredits = async (teamId, raw = false, verbose = true) => {
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

const addUsage = async (teamId, userId, credits, enrichmentId, verbose = true) => {
	if (verbose) {
		console.log('addUsage', { teamId, userId, credits, enrichmentId });
	}
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
		if (verbose) {
			console.log('addUsage', { options, USAGETABLE_NAME });
		}
		const response = await ddbPutItem(USAGETABLE_NAME, ddbEncode(options), true);
		return response;
	} catch (err) {
		if (verbose) {
			console.log('addUsage - error -', err);
		}
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

module.exports = {
	getCredits,
	addUsage,
	updateCredits,
};

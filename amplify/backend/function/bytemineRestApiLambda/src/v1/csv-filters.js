const { Router } = require('express');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { csvGetInfo, csvGetRecords } = require('../utils/csv-utils');
const { ddbPutItem, ddbEncode, ddbDeleteItem, ddbQuery, ddbDecode } = require('../utils/ddb-utils-v3');
const { schemaValidate, ICSVFilter } = require('../schemas');

const router = Router();

const { STORAGE_BYTEMINESTORAGE_BUCKETNAME: BUCKET, API_BYTEMINEGRAPHAPI_BYTEMINEFILTERITEMTABLE_NAME: FILTERITEMTABLE_NAME } = process.env;

const BATCH_SIZE = 100;

router.post('/preview', verifyToken, verifyTeam, async (req, res) => {
	const { key } = req.body;
	const csvInfo = await csvGetInfo(key, BUCKET);
	return res.status(200).json({ csv: csvInfo });
});

/**
 * @summary
 * Store uploaded list of filter values for future use
 *
 * @param {string} key - the s3 key of the uploaded csv file
 * @param {string} columnId - the csv column field to use
 * @param {string} fieldId - the field id, e.g. domain / email / linkedin / facebook etc.
 * @param {string} filename - the original filename of the uploaded csv file
 */
router.post('/filters', schemaValidate(ICSVFilter), verifyToken, async (req, res, next) => {
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const userId = sub;

	// the required params needed to start a job
	const { key, fieldId, columnId, name } = req.body;
	console.log('input params', { key, fieldId, columnId, name });

	// get uploaded csv info - number of rows
	const csvRecords = await csvGetRecords(key, BUCKET, true);
	console.log('Found rows ', csvRecords.length);
	if (csvRecords.length > 0) {
		console.log('Sample row ', csvRecords[0]);
	}

	// prepare filter id
	const filterId = `${teamId}-${fieldId}`.toLowerCase().trim();
	console.log({ userId, teamId, filterId });

	// get existing list of fields
	const filters = await ddbQuery(
		FILTERITEMTABLE_NAME,
		'listFilterItemsByFilterId',
		'#filterId = :filterId',
		{
			'#filterId': 'filterId',
		},
		{
			':filterId': { S: filterId },
		},
		999,
		null,
		false,
		true
	);
	const filterItems = filters.map((item) => ddbDecode(item));

	// remove all existing filters
	let promises = [];
	for (let i = 0; i < filterItems.length; i++) {
		const { id } = filterItems[i];
		promises.push(ddbDeleteItem(FILTERITEMTABLE_NAME, ddbEncode({ id }, false), false));
		if (promises.length >= BATCH_SIZE) {
			await Promise.all(promises);
			promises = [];
		}
	}
	await Promise.all(promises);

	// prepare list of items
	let items = [];
	const now = new Date().toISOString();
	for (let i = 0; i < csvRecords.length; i++) {
		const val = csvRecords[i]?.[columnId];
		if (!val) {
			continue;
		}
		items.push({
			id: v4(),
			filterId,
			userId,
			teamId,
			key: columnId,
			val,
			filename: name.substr(0, 100),
			createdAt: now,
			updatedAt: now,
		});
	}
	console.log('Found items after applying filter', items.length);

	// save items
	promises = [];
	for (let i = 0; i < items.length; i++) {
		promises.push(ddbPutItem(FILTERITEMTABLE_NAME, ddbEncode(items[i], false), false));
		if (promises.length >= BATCH_SIZE) {
			await Promise.all(promises);
			promises = [];
		}
	}
	await Promise.all(promises);

	// return enrichment data
	return res.status(200).json(items);
});

/**
 * @summary
 * Remove uploaded list of filter values
 *
 * @param {string} fieldId - the field id, e.g. domain / email / linkedin / facebook etc.
 */
router.delete('/', verifyToken, async (req, res, next) => {
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const userId = sub;
	console.log({ sub, teamId, userId });

	// the required params needed to start a job
	const { fieldId } = req.body;
	console.log('input params', { fieldId });

	// prepare filter id
	const filterId = `${teamId}-${fieldId}`.toLowerCase().trim();
	console.log({ teamId, filterId });

	// get existing list of fields
	const filters = await ddbQuery(
		FILTERITEMTABLE_NAME,
		'listFilterItemsByFilterId',
		'#filterId = :filterId',
		{
			'#filterId': 'filterId',
		},
		{
			':filterId': { S: filterId },
		},
		999,
		null,
		false,
		true
	);
	const filterItems = filters.map((item) => ddbDecode(item));

	// remove all existing filters
	let promises = [];
	for (let i = 0; i < filterItems.length; i++) {
		const { id } = filterItems[i];
		promises.push(ddbDeleteItem(FILTERITEMTABLE_NAME, ddbEncode({ id }, false), false));
		if (promises.length >= BATCH_SIZE) {
			await Promise.all(promises);
			promises = [];
		}
	}
	await Promise.all(promises);

	// return enrichment data
	return res.status(200).json({});
});

module.exports = router;

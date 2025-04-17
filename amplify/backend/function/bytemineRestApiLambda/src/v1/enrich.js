const { csvGetInfo } = require('../utils/csv-utils');
const { csvGetData } = require('../utils/csv-utils');

const { Router } = require('express');

const router = Router();

router.post('/preview', async (req, res, next) => {
	console.log(req.body);
	const { key, groupId } = req.body;
	const csvInfo = await csvGetInfo(key, BUCKET);
	const credits = await getCredits(groupId);
	return res.status(200).json({ csv: csvInfo, credits });
});

router.post('/start', async (req, res, next) => {
	console.log(req.body);
	
	// the required params needed to start a job
	const { key, groupId, userId, email, phone, linkedin, facebook } = req.body;

	// get uploaded csv info - number of rows
	const csvInfo = await csvGetInfo(key, BUCKET);


	// check credits
	const credits = await getCredits(groupId);
	if (credits < csvInfo.records) {
		return res.status(422).json({ message: 'Insufficient credits.' });
	}

	// create a new enrichment record
	const enrichment = await createEnrichment({ ...req.body, records: csvInfo.records });

	// update credits
	await updateCredits(groupId, csvInfo.records);
	await addUsage(groupId, userId, csvInfo.records, enrichment.id);

	// start state machine
	await sfStartExecution(enrichment.id, STATE_MACHINE_ARN, {
		id: enrichment.id, // id of the enrichment model - uniquely identifies the state machine job
		total: csvInfo.records, // total records in the source csv file
		start: 0, // this should always be 0
		batchSize: 100, // tweak this for performance
	});

	// return enrichment data
	return res.status(200).json(enrichment);
});

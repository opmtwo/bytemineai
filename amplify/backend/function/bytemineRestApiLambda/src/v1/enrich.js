const { deleteBytemineEnrichment, createBytemineEnrichment } = require('../graphql/mutations');
const { listEnrichmentByTeamId, getBytemineEnrichment } = require('../graphql/queries');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { schemaValidate, IEnrichment, IEnrichmentPreview, IPublicUpload } = require('../schemas');
const { apsGql } = require('../utils/aps-utils');
const { csvGetInfo } = require('../utils/csv-utils');
const { csvGetData } = require('../utils/csv-utils');

const { ENV, REGION, STORAGE_BYTEMINESTORAGE_BUCKETNAME: BUCKETNAME, AUTH_BYTEMINEF573E062_USERPOOLID: USERPOOLID } = process.env;

const { Router } = require('express');
const { s3GeneratePresignedUploadUrl } = require('../utils/s3-utils');
const { v4 } = require('uuid');
const { lambdaInvokeFunction } = require('../utils/lambda-utils');
const { updateCredits, addUsage, getCredits } = require('../utils/usage-utils-enrich');

const router = Router();

router.post('/preview', schemaValidate(IEnrichmentPreview), verifyToken, verifyTeam, async (req, res, next) => {
	const { key } = req.body;
	const { id: teamId } = res.locals.team;
	const csvInfo = await csvGetInfo(key, BUCKETNAME);
	const credits = await getCredits(teamId);
	return res.status(200).json({
		csv: csvInfo,
		credits,
	});
});

router.post('/csv', schemaValidate(IPublicUpload), verifyToken, verifyTeam, async (req, res) => {
	const { sub, team: self } = res.locals;
	const { mime, size } = req.body;
	console.log(JSON.stringify({ sub, self, mime, size }));

	const key = `enrichments/${sub}/${new Date().toISOString().substring(0, 10)}/${v4()}`;
	const url = `https://${BUCKETNAME}.s3.${REGION}.amazonaws.com/${key}`;
	console.log(JSON.stringify({ key, url }));

	// generate signed upload url
	const uploadUrl = await s3GeneratePresignedUploadUrl({
		Bucket: BUCKETNAME,
		Key: key,
		ContentLength: size,
		ContentType: mime,
		ACL: 'public-read',
	});

	return res.json({ key, url, uploadUrl: uploadUrl });
});

router.post('/start', async (req, res, next) => {
	console.log(req.body);

	// the required params needed to start a job
	const { key, groupId, userId, email, phone, linkedin, facebook } = req.body;

	// get uploaded csv info - number of rows
	const csvInfo = await csvGetInfo(key, BUCKETNAME);

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

router.get('/', verifyToken, async (req, res) => {
	const sub = res.locals.sub;
	let enrichments = [];
	let nextToken = null;

	do {
		const response = await apsGql(
			listEnrichmentByTeamId,
			{
				teamId: sub,
				limit: 999,
				sortDirection: 'DESC',
				nextToken,
			},
			'data.listEnrichmentByTeamId'
		);

		enrichments = enrichments.concat(response.items);
		nextToken = response.nextToken;
	} while (nextToken);

	return res.json(enrichments);
});

router.get('/:id', verifyToken, async (req, res) => {
	const { id } = req.params;

	const enrichment = await apsGql(getBytemineEnrichment, { id }, 'data.getBytemineEnrichment');
	if (!enrichment?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(enrichment);
});

router.post('/', schemaValidate(IEnrichment), verifyToken, verifyTeam, async (req, res, next) => {
	const { sub } = res.locals;
	const { id: teamId } = res.locals.team;
	const { key, name, size, email, phone, linkedin, facebook } = req.body;

	// get uploaded csv info - number of rows
	const csvInfo = await csvGetInfo(key, BUCKETNAME);
	const { records } = csvInfo;
	console.log(JSON.stringify({ csvInfo, records }));

	// check credits
	// const credits = await getCredits(groupId);
	// if (credits < csvInfo.records) {
	// 	return res.status(422).json({ message: 'Insufficient credits.' });
	// }

	// create a new enrichment record
	const input = {
		owner: sub,
		userId: sub,
		teamId,
		s3Key: key,
		s3KeyOutput: `${key}.output.csv`,
		name,
		size,
		recordsUploaded: records,
		recordsEnriched: 0,
		recordsProcessed: 0,
		keyEmail: email,
		keyPhone: phone,
		keyLinkedin: linkedin,
		keyFacebook: facebook,
		status: 'pending',
		isCompleted: false,
	};
	console.log(JSON.stringify({ input }));

	// return res.json({ input });

	// const enrichment = await createBytemineEnrichment({ ...req.body, records: csvInfo.records });
	const enrichment = await apsGql(createBytemineEnrichment, { input }, 'data.createBytemineEnrichment');

	// update credits
	await updateCredits(teamId, csvInfo.records);
	await addUsage(teamId, sub, csvInfo.records, enrichment.id);

	// start state machine
	// await sfStartExecution(enrichment.id, STATE_MACHINE_ARN, {
	// 	id: enrichment.id, // id of the enrichment model - uniquely identifies the state machine job
	// 	total: csvInfo.records, // total records in the source csv file
	// 	start: 0, // this should always be 0
	// 	batchSize: 10000, // tweak this for performance
	// });

	await lambdaInvokeFunction(`bytemineaiEnrichLambda-${ENV}`, {
		id: enrichment.id, // id of the enrichment model - uniquely identifies the state machine job
		total: csvInfo.records, // total records in the source csv file
		start: 0, // this should always be 0
		batchSize: 10000, // tweak this for performance
	});

	// return enrichment data
	return res.status(200).json(enrichment);
});

router.delete('/:id', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const enrichment = await apsGql(getBytemineEnrichment, { id }, 'data.getBytemineEnrichment');
	if (!enrichment?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	const input = { id, _version: enrichment._version };
	await apsGql(deleteBytemineEnrichment, { input });

	return res.json(enrichment);
});

module.exports = router;

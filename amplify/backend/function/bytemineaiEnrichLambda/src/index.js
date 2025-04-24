/* Amplify Params - DO NOT EDIT
	API_BYTEMINEGRAPHAPI_BYTEMINECONTACTTABLE_ARN
	API_BYTEMINEGRAPHAPI_BYTEMINECONTACTTABLE_NAME
	API_BYTEMINEGRAPHAPI_BYTEMINEENRICHMENTTABLE_ARN
	API_BYTEMINEGRAPHAPI_BYTEMINEENRICHMENTTABLE_NAME
	API_BYTEMINEGRAPHAPI_BYTEMINESUBTABLE_ARN
	API_BYTEMINEGRAPHAPI_BYTEMINESUBTABLE_NAME
	API_BYTEMINEGRAPHAPI_BYTEMINEUSAGETABLE_ARN
	API_BYTEMINEGRAPHAPI_BYTEMINEUSAGETABLE_NAME
	API_BYTEMINEGRAPHAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_BYTEMINEGRAPHAPI_GRAPHQLAPIIDOUTPUT
	AUTH_BYTEMINEF573E062_USERPOOLID
	ENV
	REGION
	STORAGE_BYTEMINESTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { csvReadStream } = require('./utils/csv-utils');
const { ddbGetItem, ddbEncode, ddbDecode } = require('./utils/ddb-utils');
// const { scheduleLambdaAfterOneMinute, ebScheduleLambdaAfterOneMinute } = require('./utils/eb-utils');
const { esRequest } = require('./utils/es-utils');
const {
	updateCredits,
	getEsFilter,
	updateEnrichment,
	saveContact,
	updateEnrichmentCount,
	getExportLabels,
	getExportData,
	arrayToCsv,
	addUsage,
} = require('./utils/helper-utils');
const { lambdaInvokeFunction } = require('./utils/lambda-utils');
const { s3PutObject, s3GetObject } = require('./utils/s3-utils');

const {
	ENV,
	REGION,
	SELF_ARN,
	STORAGE_BYTEMINESTORAGE_BUCKETNAME: BUCKETNAME,
	API_BYTEMINEGRAPHAPI_BYTEMINEENRICHMENTTABLE_NAME: ENRICHMENTTABLE_NAME,
} = process.env;

const ES_HOST = 'search-byteminai-orlglsbgaoh4d5l3zdo7ak7o3m.us-east-1.es.amazonaws.com';
const ES_DOMAIN = `https://${ES_HOST}`;
//const ES_INDEX = 'nymblr_20221107';
const ES_INDEX = 'contacts';

const eventBridge = new EventBridgeClient({});

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
	// console.log(`EVENT: ${JSON.stringify(event)}`);
	// return {
	//     statusCode: 200,
	// //  Uncomment below to enable CORS requests
	// //  headers: {
	// //      "Access-Control-Allow-Origin": "*",
	// //      "Access-Control-Allow-Headers": "*"
	// //  },
	//     body: JSON.stringify('Hello from Lambda!'),
	// };

	console.log(`EVENT: ${JSON.stringify(event)}`);
	console.log(`CONTEXT: ${JSON.stringify(context)}`);

	// const ruleName = process.env.SCHEDULE_RULE_NAME;

	// // 1. Delete existing rule and target if present
	// if (ruleName) {
	// 	console.log(`Deleting rule and target: ${ruleName}`);
	// 	try {
	// 		await eventBridge.send(
	// 			new RemoveTargetsCommand({
	// 				Rule: ruleName,
	// 				Ids: ['lambda-target'],
	// 			})
	// 		);
	// 		await eventBridge.send(new DeleteRuleCommand({ Name: ruleName }));
	// 	} catch (err) {
	// 		console.error('Error deleting rule/target:', err);
	// 	}
	// }

	// use event or previous result
	let source = event;
	if (source.result?.Payload) {
		source = source.result.Payload;
	}

	// extract event
	let { id, batchSize, start, total, hasMore } = source;
	console.log({ id, batchSize, start, total, hasMore });

	// check if we have reached end
	if (hasMore === false) {
		console.log('Reached end of batch - exit');
		return event;
	}

	// check id
	if (!id) {
		console.log('Id not found - exit');
		throw new Error('Job id not found');
	}

	// check batch size
	if (!batchSize) {
		console.log('Batch size not found - using default batch size of 10');
		batchSize = 500;
	}

	// check start index
	if (!start) {
		console.log('Start index not found - using default start index of 0');
		start = 0;
	}

	// fetch job data - Enrichment Item created by restAPIExpressLambda
	const job = await ddbGetItem(ENRICHMENTTABLE_NAME, ddbEncode({ id }));
	const jobItem = await ddbDecode(job.Item);
	console.log('jobItem', jobItem);

	// extract job data
	const { owner, userId, teamId, s3Key, s3KeyOutput, keyEmail, keyPhone, keyLinkedin, keyFacebook, phoneRequired, workEmailRequired } = jobItem;

	let contacts = [];
	let addnl_cols = [];
	let creditRefund = 0;
	let enrichedCount = 0;

	// callback to process csv row data
	const callback = async (row, rowCount) => {
		// increment processing count in ddb
		await updateEnrichment(id, rowCount, false);

		// get es filter for row data
		const esFilter = await getEsFilter(row, keyEmail, keyPhone, keyLinkedin, keyFacebook, true);
		console.log('setting addnl_cols - ', Object.keys(row));
		addnl_cols = Object.keys(row);

		// esFilter is null if a row filter is missing
		if (!esFilter) {
			console.log('callback - row filter is empty - skip', { rowCount });
			creditRefund++;
			return;
		}

		// search row in es
		const esResult = await esRequest(ES_HOST, 'POST', `/${ES_INDEX}/_search`, esFilter);
		const contact = esResult?.hits?.hits?.[0];

		// if row found then update else add 1 credit to user account
		if (contact?._id) {
			console.log('callback - found contact', { rowCount });

			// -- ADD CHECKBOX LOGIC HERE
			// if contact doesn't have the required fileds,
			// no unlock, no push, no enrichedCount++, yes creditRefund++
			let skip = false;

			const hasPhone = contact._source['phone_cell'] || contact._source['phone_company'];
			if (phoneRequired && !hasPhone) {
				skip = true;
			}

			if (workEmailRequired && !contact._source['email_work']) {
				skip = true;
			}

			if (skip) {
				console.log("callback - matching contact doesn't contain phone/workEmail - skipping");
				creditRefund++;
				return;
			}

			// format and save unlocked contact information in the database
			const unlockedContact = await saveContact(contact, teamId, userId);

			contacts.push({ ...row, ...unlockedContact });
			// save unlocked contact information to csv file
			//
			enrichedCount++;
		} else {
			console.log('callback - could not find any matching found contact', { rowCount });
			// add 1 credit to the user as no results were found
			creditRefund++;
		}
	};

	// process the csv file as per current batch settings
	await csvReadStream(id, s3Key, BUCKETNAME, start, batchSize, total, callback);

	// refund credits for empty rows
	if (creditRefund) {
		console.log('creditRefund - ', creditRefund);
		await addUsage(teamId, userId, -1 * creditRefund, id);
		await updateCredits(teamId, -1 * creditRefund);
	}

	// if contacts were enriched then update in db
	if (enrichedCount) {
		console.log('enrichedCount - ', enrichedCount);
		await updateEnrichmentCount(id, enrichedCount);
	}

	// append csv data to end of existing csv file
	if (contacts.length) {
		// when processing for the first batch - create a new empty csv file
		if (start === 0) {
			const headers = getExportLabels(addnl_cols);
			const csvData = `${headers}\n`.toString('utf-8');
			console.log('Adding empty csv file with headers: ' + { s3KeyOutput, csvData });
			await s3PutObject(BUCKETNAME, s3KeyOutput, csvData);
		}

		let items = [];
		for (let i = 0; i < contacts.length; i++) {
			items.push(getExportData(contacts[i], addnl_cols));
		}

		const newCsvData = arrayToCsv(items).replace(/,/g, '&&&').replace(/\|/g, ',').replace(/&&&/g, '|');
		const s3File = await s3GetObject(s3KeyOutput, BUCKETNAME);
		const fileContent = s3File.Body.toString('utf-8') + newCsvData;

		console.log(`Updating csv contacts - adding ${contacts.length} new contacts`);
		await s3PutObject(BUCKETNAME, s3KeyOutput, fileContent);
	}

	// see if we have reached end of csv
	const hasEnded = start + batchSize >= total;

	// find next start
	const nextStart = start + batchSize;

	// return event data
	const result = {
		id,
		total,
		batchSize,
		start: nextStart,
		hasMore: !hasEnded,
	};

	if (!hasEnded) {
		await lambdaInvokeFunction(`bytemineaiEnrichLambda-${ENV}`, result);
	}

	console.log('Completed execution of batch - result ', result);
	return result;
};

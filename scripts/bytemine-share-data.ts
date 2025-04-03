import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import * as zlib from 'zlib';
import { SdkStreamMixin } from '@smithy/types';
import csv from 'csv-parser';
import fs from 'fs';
import stream from 'stream';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { stringify as stringifySync } from 'csv-stringify/sync';
import { stringify } from 'csv-stringify'; // Import correctly

// Create a CSV stringify stream
const csvStringify = stringify({ header: true });

async function gzipCsv(inputCsv: string, outputGz: string): Promise<void> {
	try {
		await pipeline(fs.createReadStream(inputCsv), zlib.createGzip(), fs.createWriteStream(outputGz));
		console.log('Compression complete');
	} catch (err) {
		console.error('Error during compression:', err);
	}
}

const s3 = new S3Client({
	region: 'us-east-1',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAVYOMUDYWFGRZPNQK',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '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',
	},
});

const INPUT_BUCKET = process.env.INPUT_BUCKET || 'b2b-prospects-storage';
const SHARED_BUCKET = process.env.SHARED_BUCKET || 'bytemineai-b2b-data';
const OUTPUT_BUCKET = process.env.OUTPUT_BUCKET || 'bytemineai-b2b-data';
const MOBILE_NUMBERS_BUCKET = process.env.MOBILE_NUMBERS_BUCKET || 'bytemineai-b2b-data';

const INPUT_FILE_KEY = process.env.INPUT_FILE_KEY || 'salutary_bytemine_2025q1.csv.gz';
const SHARED_FILE_KEY = process.env.SHARED_FILE_KEY || 'shared.csv.gz';

async function getStreamFromS3(bucket: string, key: string): Promise<Readable> {
	const command = new GetObjectCommand({ Bucket: bucket, Key: key });
	const { Body } = await s3.send(command);
	if (!Body) {
		throw new Error('Failed to get a readable stream from S3');
	}
	return Body as Readable & SdkStreamMixin;
}

async function readCsvFromS3(bucket: string, key: string, maxRecords?: number): Promise<Map<string, string>> {
	const s3Stream = await getStreamFromS3(bucket, key);
	const resultMap = new Map<string, string>();
	let count = 0;
	const reader = s3Stream.pipe(zlib.createGunzip()).pipe(csv());

	for await (const row of reader) {
		if (maxRecords && count >= maxRecords) break;
		if (row['phone_1_dd']) {
			resultMap.set(row.pid, row['phone_1_dd']);
			count++;
		}
	}
	return resultMap;
}

async function processData(maxRecords?: number) {
	const allMobileNumbers = await readCsvFromS3(INPUT_BUCKET, INPUT_FILE_KEY, maxRecords);
	// const sharedMobileNumbers = await readCsvFromS3(SHARED_BUCKET, SHARED_FILE_KEY, maxRecords);
	const sharedMobileNumbers = new Map();

	// Select 55% of non-shared numbers randomly
	const allPids = Array.from(allMobileNumbers.keys());
	const sharedPids = new Set(sharedMobileNumbers.keys());
	const newSharePids = new Set(sharedMobileNumbers.keys());

	const availablePids = allPids.filter((pid) => !sharedPids.has(pid));
	const randomPids = new Set(availablePids.sort(() => Math.random() - 0.5).slice(0, Math.ceil(availablePids.length * 0.55)));

	for (const pid of randomPids) {
		newSharePids.add(pid);
	}

	// console.log({ allPids, sharedPids, newSharePids, availablePids, randomPids });
	// return;

	// // Process CSV and mask numbers that are not in newSharePids
	// const outputFileName = `dataset-${new Date().getFullYear()}-Q${Math.ceil((new Date().getMonth() + 1) / 3)}.csv.gz`;
	// const outputFileStream = fs.createWriteStream(outputFileName);
	// const gzipStream = zlib.createGzip();

	// const s3Stream = await getStreamFromS3(INPUT_BUCKET, INPUT_FILE_KEY);

	// let processedCount = 0;
	// const reader = s3Stream.pipe(zlib.createGunzip()).pipe(csv());
	// const writer = new Readable({
	//     objectMode: true,
	//     read() {}
	// });

	// reader.on("data", (row) => {
	//     if (processedCount >= (maxRecords ?? Infinity)) {
	//         reader.destroy(); // End processing immediately when maxRecords is reached
	//         writer.push(null);
	//         return;
	//     }
	//     row.mobileNumber = newSharePids.has(row.pid) ? row.mobileNumber : "XXXXXXX";
	//     writer.push(`${row.pid},${row.mobileNumber}\n`);
	//     processedCount++;
	// });

	// reader.on("end", () => writer.push(null));

	// await pipeline(writer, gzipStream, outputFileStream);

	// // Upload processed file
	// await s3.send(new PutObjectCommand({
	//     Bucket: OUTPUT_BUCKET,
	//     Key: outputFileName,
	//     Body: fs.createReadStream(outputFileName),
	//     ContentType: "application/gzip"
	// }));

	const outputFileName = `dataset-${new Date().getFullYear()}-Q${Math.ceil((new Date().getMonth() + 1) / 3)}.csv`;
	const outputGzipFileName = `${outputFileName}.gz`;
	const outputFileStream = fs.createWriteStream(outputFileName); // No gzip yet

	const s3Stream = await getStreamFromS3(INPUT_BUCKET, INPUT_FILE_KEY);
	const reader = s3Stream.pipe(zlib.createGunzip()).pipe(csv());

	let processedCount = 0;
	reader.on('data', (row) => {
        console.log('Processing row', processedCount + 1);
		if (processedCount >= (maxRecords ?? Infinity)) {
			reader.end(); // Stop processing
			return;
		}
		processedCount++;

		// Mask mobile number if necessary
		row.mobileNumber = newSharePids.has(row.pid) ? row.mobileNumber : 'XXXXXXX';

		// Write the formatted row
		csvStringify.write(row);
	});
    
    // End the CSV writing properly
    const waitForRead = () => new Promise((resolve, reject) => {
            reader.on("end", () => {
            csvStringify.end();
            console.log("CSV file read successfully.");
            resolve({});
        });
    });

    await waitForRead();
    
    // Pipe the CSV formatted output to the file
    const waitForWrite = () => new Promise((resolve, reject) => {
        csvStringify.pipe(outputFileStream).on('finish', () => {
            console.log("CSV file written successfully.");
            resolve({});
        })
    });

    await waitForWrite();

    // -------------------------------------------------------------------------

    // End the CSV writing properly
    // reader.on("end", () => {
    //     csvStringify.end();
    //     console.log("CSV file written successfully.");
    // });
    
    // Pipe the CSV formatted output to the file
    // await pipeline(csvStringify.pipe(outputFileStream));
    // Use pipeline instead of manual piping
    // try {
    //     await pipeline(reader, csvStringify, outputFileStream);
    // } catch (err) {
    //     console.log('Error in pipeline', err);
    // }

	// const waitForCsvRead = () =>
	// 	new Promise((resolve, reject) => {
	// 		reader
	// 			.on('end', () => {
    //                 console.log('waitForCsvRead resolve');
    //                 csvStringify.end();
	// 				resolve({});
	// 			})
	// 			.on('error', (err) => {
    //                 console.log('waitForCsvRead error', err);
	// 				reject();
	// 			});
	// 	});

	// await waitForCsvRead();
    

	// // Pipe the CSV formatted output to the file
	// const waitForCsvWrite = () =>
	// 	new Promise((resolve, reject) => {
	// 		csvStringify
	// 			.pipe(outputFileStream)
	// 			.on('finish', () => {
    //                 console.log('waitForCsvWrite resolve');
	// 				resolve({});
	// 			})
	// 			.on('error', (err) => {
    //                 console.log('waitForCsvWrite error', err);
	// 				reject();
	// 			});
	// 	});

	// await waitForCsvWrite();

	await gzipCsv(outputFileName, outputGzipFileName);

	// Write and upload new shared mobile numbers
	const mobileNumbersFileName = `mobile-numbers-${new Date().getFullYear()}-Q${Math.ceil((new Date().getMonth() + 1) / 3)}.csv.gz`;
	const mobileNumbersStream = fs.createWriteStream(mobileNumbersFileName);
	const gzipMobileStream = zlib.createGzip();

	await pipeline(Readable.from(Array.from(newSharePids).map((pid) => `${pid},${allMobileNumbers.get(pid)}\n`)), gzipMobileStream, mobileNumbersStream);

	await s3.send(
		new PutObjectCommand({
			Bucket: MOBILE_NUMBERS_BUCKET,
			Key: mobileNumbersFileName,
			Body: fs.createReadStream(mobileNumbersFileName),
			ContentType: 'application/gzip',
		})
	);
}

processData(20000).catch(err => {
    console.error(err);
});
//
// gzipCsv('dataset-2025-Q2.csv', 'dataset-2025-Q2.csv.gz');

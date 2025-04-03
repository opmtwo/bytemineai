import csv from 'csv-parser';
import { stringify } from 'csv-stringify'; // Import correctly
import fs from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import * as zlib from 'zlib';

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SdkStreamMixin } from '@smithy/types';

// Create a CSV stringify stream
const csvStringify = stringify({ header: true });

const fieldMapping: Record<string, string> = {
	first_name: 'first_name',
	last_name: 'last_name',
	middle_name: 'middle_name',
	full_name: 'full_name',
	job_title: 'job_title',
	job_level: 'seniority',
	job_function: 'department',
	enhanced_job_function: 'primary_role',
	job_sub_function: 'secondary_role',
	linkedin_url: 'linkedin_profile',
	linkedin_connection_count: 'linkedin_connection_count',
	work_email: 'work_email',
	work_email_array: 'work_email_history',
	personal_email: 'personal_email',
	personal_email_2: 'personal_email2',
	personal_email_array: 'personal_email_history',
	phone_1_dd: 'direct_dial',
	phone_mobile: 'mobile_number',
	phone_mobile_array: 'mobile_number_history',
	phone_2_org: 'work_number',
	education: 'education',
	skills: 'skills',
	interests: 'interests',
	linkedin_headline: 'linkedin_headline',
	facebook_url: 'facebook_profile',
	twitter_url: 'twitter_profile',
	work_experience: 'work_experience',
	compensation: 'salary',
	birth_year: 'birth_year',
	approximate_age: 'age',
	gender: 'gender',
	recent_job_change: 'new_hire',
	job_start_date: 'job_start_date',
	org_name: 'company_name',
	org_domain: 'company_domain',
	org_website: 'company_website',
	org_linkedin_url: 'company_linkedin_profile',
	org_linkedin_followers: 'company_linkedin_followers',
	address1_line1: 'company_local_address',
	address1_city: 'company_local_city',
	address1_state: 'company_local_state',
	address1_postal: 'company_local_address_postal',
	address2_line1: 'company_hq_address',
	address2_city: 'company_hq_city',
	address2_state: 'company_hq_state',
	address2_postal: 'company_hq_postal',
	address3_city: 'person_city',
	address3_state: 'person_state',
	address3_postal: 'person_postal',
	employee_range: 'company_employee_range',
	revenue_range: 'company_revenue_range',
	industry: 'company_industry',
	sic_4d: 'company_sic4',
	sic_4d_desc: 'company_sic4_description',
	naics: 'company_naics',
	naics_desc: 'company_naics_description',
	org_ownership_status: 'company_type',
};

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
const SHARED_FILE_KEY = process.env.SHARED_FILE_KEY || 'mobile-numbers-2025-Q2.csv.gz';

async function getStreamFromS3(bucket: string, key: string): Promise<Readable> {
	const command = new GetObjectCommand({ Bucket: bucket, Key: key });
	const { Body } = await s3.send(command);
	if (!Body) {
		throw new Error('Failed to get a readable stream from S3');
	}
	return Body as Readable & SdkStreamMixin;
}

async function readCsvFromS3AsPidMobileNoMap(bucket: string, key: string, maxRecords?: number): Promise<Map<string, string>> {
	const s3Stream = await getStreamFromS3(bucket, key);
	const resultMap = new Map<string, string>();
	let count = 0;
	const reader = s3Stream.pipe(zlib.createGunzip()).pipe(csv());

	for await (const row of reader) {
		if (maxRecords && count >= maxRecords) break;
		if (row['phone_1_dd'] || row['phone_mobile']) {
			resultMap.set(row.pid, row['phone_1_dd'] || row['phone_mobile']);
			count++;
		}
	}
	return resultMap;
}

async function processData(maxRecords?: number) {
	const allMobileNumbers = await readCsvFromS3AsPidMobileNoMap(INPUT_BUCKET, INPUT_FILE_KEY, maxRecords);
	// const sharedMobileNumbers = await readCsvFromS3AsPidMobileNoMap(SHARED_BUCKET, SHARED_FILE_KEY, maxRecords);
	const sharedMobileNumbers = new Map();

	// Select 55% of non-shared numbers randomly
	const allPids = Array.from(allMobileNumbers.keys());
	const sharedPids = new Set(sharedMobileNumbers.keys());
	const newSharePids = new Set(sharedMobileNumbers.keys());

	const availablePids = allPids.filter((pid) => !sharedPids.has(pid));
	const randomPids = new Set(availablePids.sort(() => Math.random() - 0.5).slice(0, Math.ceil(availablePids.length * 0.55)));

	const limit = Math.ceil(availablePids.length * 0.55); // 55% limit
	for (const pid of randomPids) {
		if (newSharePids.size < limit) {
			newSharePids.add(pid);
		}
	}

	console.log({ allPids: allPids.length, sharedPids: sharedPids.size, availablePids: availablePids.length, newSharePids: newSharePids.size });

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
		// row.phone_1_dd = newSharePids.has(row.pid) ? row.phone_1_dd : '';
		if (!newSharePids.has(row.pid)) {
            console.log({ pid: row.pid });
			row.phone_1_dd = '';
			row.phone_mobile = '';
			row.phone_mobile_array = '';
		}

		// Transform the records to our own schema
		const transformedRecord: Record<string, any> = {};
		Object.keys(fieldMapping).forEach((key) => {
			if (row[key] !== undefined) {
				transformedRecord[fieldMapping[key]] = row[key];
			} else {
				row[key] = '';
			}
		});

		// Write the formatted row
		// csvStringify.write(row);
		csvStringify.write(transformedRecord);
	});

	// End the CSV writing properly
	const waitForRead = () =>
		new Promise((resolve, reject) => {
			reader.on('end', () => {
				csvStringify.end();
				console.log('CSV file read successfully.');
				resolve({});
			});
		});

	await waitForRead();

	// Pipe the CSV formatted output to the file
	const waitForWrite = () =>
		new Promise((resolve, reject) => {
			csvStringify.pipe(outputFileStream).on('finish', () => {
				console.log('CSV file written successfully.');
				resolve({});
			});
		});

	await waitForWrite();

	console.log('Creating gz file from csv');
	await gzipCsv(outputFileName, outputGzipFileName);
	console.log('Completed creating gz file from csv');

	console.log('Uploading gz file to S3');
	await s3.send(
		new PutObjectCommand({
			Bucket: OUTPUT_BUCKET,
			Key: outputFileName,
			Body: fs.createReadStream(outputGzipFileName),
			ContentType: 'application/gzip',
		})
	);
	console.log('Completed uploading gz file to S3');

	// Write and upload new shared mobile numbers
	const mobileNumbersFileName = `mobile-numbers-${new Date().getFullYear()}-Q${Math.ceil((new Date().getMonth() + 1) / 3)}.csv.gz`;
	const mobileNumbersStream = fs.createWriteStream(mobileNumbersFileName);
	const gzipMobileStream = zlib.createGzip();

	await pipeline(
		Readable.from(['pid,phone_1_dd\n', ...Array.from(newSharePids).map((pid) => `${pid},${allMobileNumbers.get(pid)}\n`)]),
		gzipMobileStream,
		mobileNumbersStream
	);

	await s3.send(
		new PutObjectCommand({
			Bucket: MOBILE_NUMBERS_BUCKET,
			Key: mobileNumbersFileName,
			Body: fs.createReadStream(mobileNumbersFileName),
			ContentType: 'application/gzip',
		})
	);
}

processData(100).catch((err) => {
	console.error(err);
});

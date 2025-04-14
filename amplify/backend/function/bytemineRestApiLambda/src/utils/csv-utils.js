const aws = require('aws-sdk');
const csv = require('csv-parser');
const { updateEnrichment } = require('./helper-utils');

const csvGetInfo = async (key, bucket, verbose = false) =>
	new Promise((resolve, reject) => {
		if (verbose) {
			console.log('csvGetInfo - ', { key, bucket });
		}

		const s3 = new aws.S3();
		const s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();

		const csvStream = csv();

		s3Stream.pipe(csvStream);

		let records = 0;
		let headers;
		let sample;

		csvStream.on('data', (record) => {
			if (!headers) {
				headers = Object.keys(record);
				if (verbose) {
					console.log('csvGetInfo - headers record', record);
				}
			}
			if (!sample && Object.keys(record).some((key) => record?.[key]?.trim()?.length)) {
				sample = record;
			}
			records++;
		});

		csvStream.on('end', () => {
			const response = {
				headers,
				records,
				sample,
			};
			if (verbose) {
				console.log('csvGetInfo - success', response);
			}
			resolve(response);
		});

		csvStream.on('error', (err) => {
			if (verbose) {
				console.log('csvGetInfo - error', err);
			}
			reject(err);
		});
	});

const csvGetData = async (key, bucket, verbose = false) =>
	new Promise((resolve, reject) => {
		if (verbose) {
			console.log('csvGetInfo - ', { key, bucket });
		}

		const s3 = new aws.S3();
		const s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();

		const csvStream = csv();

		s3Stream.Body.pipe(csvStream);

		let records = [];
		let headers;

		csvStream.on('data', (record) => {
			if (!headers) {
				headers = Object.keys(record);
			}
			records.push(record);
		});

		csvStream.on('end', () => {
			const response = {
				headers,
				records,
			};
			if (verbose) {
				console.log('csvGetData - success', headers, { length: records.length });
			}
			resolve(response);
		});

		csvStream.on('error', (err) => {
			if (verbose) {
				console.log('csvGetData - error', err);
			}
			reject(err);
		});
	});

const csvGetRecords = async (key, bucket, verbose = false) =>
	new Promise((resolve, reject) => {
		if (verbose) {
			console.log('csvGetRecords - ', { key, bucket });
		}

		const s3 = new aws.S3();
		const s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();

		const csvStream = csv();

		s3Stream.pipe(csvStream);

		let records = [];
		let headers;

		csvStream.on('data', (record) => {
			if (!headers) {
				headers = Object.keys(record);
			}
			records.push(record);
		});

		csvStream.on('end', () => {
			const response = {
				headers,
				records,
			};
			if (verbose) {
				console.log('csvGetRecords - success', headers, { length: records.length });
			}
			resolve(records);
		});

		csvStream.on('error', (err) => {
			if (verbose) {
				console.log('csvGetRecords - error', err);
			}
			reject(err);
		});
	});

module.exports = {
	csvGetInfo,
	csvGetData,
	csvGetRecords,
};

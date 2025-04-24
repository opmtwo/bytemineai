const aws = require('aws-sdk');
const csv = require('csv-parser');
const { updateEnrichment } = require('./helper-utils');

const csvGetInfo = async (key, bucket) =>
	new Promise((resolve, reject) => {
		console.log('csvGetInfo - ', { key, bucket });

		const s3 = new aws.S3();
		const s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();

		const csvStream = csv();

		s3Stream.pipe(csvStream);

		let records = 0;
		let headers;

		csvStream.on('data', (record) => {
			if (!headers) {
				headers = Object.keys(record);
				console.log('csvGetInfo - headers record', record);
			}
			records++;
		});

		csvStream.on('end', () => {
			const response = {
				headers,
				records,
			};
			console.log('csvGetInfo - success', response);
			resolve(response);
		});

		csvStream.on('error', (err) => {
			console.log('csvGetInfo - error', err);
			reject(err);
		});
	});

const csvGetData = async (key, bucket) =>
	new Promise((resolve, reject) => {
		console.log('csvGetInfo - ', { key, bucket });

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
			console.log('csvGetData - success', headers, { length: records.length });
			resolve(response);
		});

		csvStream.on('error', (err) => {
			console.log('csvGetData - error', err);
			reject(err);
		});
	});

const csvReadStream = async (id, key, bucket, start, length, total, callback, verbose = true) =>
	new Promise(async (resolve, reject) => {
		if (verbose) {
			console.log('csvReadStream', { bucket, key, start, length });
		}
		try {
			const s3 = new aws.S3();

			// create s3 read stream
			const s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();

			// create csv stream
			const csvStream = csv();

			// track current row index
			let rowCount = 0;

			// pipe s3 stream into csv stream
			const dataStream = s3Stream.pipe(csvStream);

			for await (const row of dataStream) {
				rowCount++;

				// Skip rows until we reach the start row
				if (rowCount <= start) {
					continue;
				}

				// Stop reading the file after we have processed the maximum number of rows
				if (rowCount - start > length) {
					s3Stream.destroy();
					if (verbose) {
						console.log(`csvReadStream - processed ${start} - ${start + length} rows`);
					}
					return resolve();
				}

				// log current status
				if (verbose) {
					console.log('Processing row ', rowCount);
				}

				// process the row
				if (typeof callback === 'function') {
					await callback(row, rowCount);
				}

				// completed reading row
				if (verbose) {
					console.log('Processed row ', rowCount);
				}
			}

			// all done
			return resolve();
		} catch (err) {
			if (verbose) {
				console.log('csvReadStream - read error', err);
			}
			return reject(err);
		}
	});

module.exports = {
	csvGetInfo,
	csvGetData,
	csvReadStream,
};

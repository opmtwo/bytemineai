const aws = require('aws-sdk');

const s3GetObject = async (key, bucket, verbose = false) => {
	if (verbose) {
		console.log(`s3GetObject - params`, { key, bucket });
	}
	const s3 = new aws.S3();
	try {
		const response = await s3.getObject({ Bucket: bucket, Key: key }).promise();
		if (verbose) {
			console.log(`s3GetObject - success`, response);
		}
		return response;
	} catch (err) {
		if (verbose) {
			console.log(`s3GetObject - error - ${err}`);
		}
		throw err;
	}
};

const s3PutObject = async (bucket, key, body, verbose = false) => {
	if (verbose) {
		console.log(`s3PutObject - params`, { bucket, key, body });
	}
	const s3 = new aws.S3();
	try {
		const response = await s3.putObject({ Bucket: bucket, Key: key, Body: body }).promise();
		if (verbose) {
			console.log(`s3PutObject - success`, response);
		}
		return response;
	} catch (err) {
		if (verbose) {
			console.log(`s3PutObject - error - `, err);
		}
		throw err;
	}
};

module.exports = {
	s3GetObject,
	s3PutObject,
};

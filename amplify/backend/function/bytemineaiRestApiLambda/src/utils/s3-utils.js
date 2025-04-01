const aws = require('aws-sdk');

const s3GetObject = async (key, bucket) => {
	console.log(`s3GetObject - params`, { key, bucket });
	const s3 = new aws.S3();
	try {
		const response = await s3.getObject({ Bucket: bucket, Key: key }).promise();
		console.log(`s3GetObject - success`, response);
		return response;
	} catch (err) {
		console.log(`s3GetObject - error - ${err}`);
		throw err;
	}
};

module.exports = {
	s3GetObject,
};

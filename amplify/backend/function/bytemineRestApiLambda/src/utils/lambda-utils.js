const AWS = require('aws-sdk');

// Create Lambda client
const lambda = new AWS.Lambda();

/*
'RequestResponse': Waits for the function response (default).

'Event': Fire-and-forget (asynchronous).

'DryRun': Checks if you have permission to invoke without running it.
*/
const lambdaInvokeFunction = async (lambdaFunctionName, payload, invocationType = 'Event') => {
	console.log('lambdaInvokeFunction', JSON.stringify({ lambdaFunctionName, payload, invocationType }));

	const params = {
		FunctionName: lambdaFunctionName,
		InvocationType: invocationType, // Use 'Event' for async invocation or use RequestResponse for synchronous
		Payload: JSON.stringify(payload),
	};

	try {
		const response = await lambda.invoke(params).promise();
		console.log('lambdaInvokeFunction - success', JSON.stringify(response));
	} catch (error) {
		console.error('lambdaInvokeFunction - error', error);
	}
};

module.exports = {
	lambdaInvokeFunction,
};

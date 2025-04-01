const aws = require('aws-sdk');

/*
const params = {
    stateMachineArn: 'YOUR_STATE_MACHINE_ARN',
    input: JSON.stringify({}), Optional if your statemachine requires an application/json input, make sure its stringified
    name: 'TestExecution', // name can be anything you want, but it should change for every execution
};
*/
const sfStartExecution = async (id, arn, input, verbose = true) => {
	if (verbose) {
		console.log('sfStartExecution - input', JSON.stringify({ id, arn, input }));
	}
	const stepFunctions = new aws.StepFunctions();
	try {
		const params = {
			stateMachineArn: arn,
			input: JSON.stringify(input),
			name: `enrich-job-${id}`,
		};
		if (verbose) {
			console.log(`sfStartExecution - success`, JSON.stringify(params, null, 2));
		}
		const response = await stepFunctions.startExecution(params).promise();
		if (verbose) {
			console.log(`sfStartExecution - success`, response);
		}
		return response;
	} catch (err) {
		if (verbose) {
			console.log(`sfStartExecution - error`, err);
		}
		throw err;
	}
};

module.exports = {
	sfStartExecution,
};

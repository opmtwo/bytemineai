const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const eventBridge = new AWS.EventBridge({
	// region: REGION // Change region as needed
});

/**
 * Deletes an EventBridge rule and its associated targets using AWS SDK v2.
 * Useful for cleaning up one-time scheduled Lambda triggers.
 *
 * @param {string} ruleName - The name of the EventBridge rule to delete.
 * @param {string[]} ids - An array of target IDs attached to the rule.
 */
async function ebDeleteLambdaRule(ruleName, ids) {
	console.log(`Deleting rule and target: ${ruleName}`);

	try {
		// Step 1: Remove the specified targets from the rule
		await eventBridge
			.removeTargets({
				Rule: ruleName, // Name of the rule
				Ids: ids, // IDs of the targets to remove
			})
			.promise();

		// Step 2: Delete the rule itself
		await eventBridge
			.deleteRule({
				Name: ruleName, // Name of the rule to delete
			})
			.promise();

		console.log(`Successfully deleted rule and target: ${ruleName}`);
	} catch (err) {
		// Log any errors during the cleanup process
		console.error('Error deleting rule/target:', err);
	}
}

/**
 * Schedules a Lambda function to run after 1 minute with the given payload.
 * @param {string} id - ID of the Event Bridge Rule Target
 * @param {string} lambdaArn - ARN of the target Lambda function.
 * @param {object} payload - The payload to pass to the Lambda function.
 * @returns {Promise<string>} - The name of the EventBridge rule created.
 */
async function ebScheduleLambdaAfterOneMinute(id, lambdaArn, payload) {
	const ruleName = `schedule-lambda-${uuidv4()}`;
	const now = new Date();
	const oneMinuteLater = new Date(now.getTime() + 60 * 1000);
	const scheduleTime = oneMinuteLater.toISOString();

	// Step 1: Create the scheduled rule
	await eventBridge
		.putRule({
			Name: ruleName,
			ScheduleExpression: `at(${scheduleTime})`,
			State: 'ENABLED',
		})
		.promise();

	// Step 2: Attach the Lambda function as a target with the provided payload
	await eventBridge
		.putTargets({
			Rule: ruleName,
			Targets: [
				{
					Id: id,
					Arn: lambdaArn,
					Input: JSON.stringify(payload),
				},
			],
		})
		.promise();

	return ruleName;
}

module.exports = {
	ebDeleteLambdaRule,
	ebScheduleLambdaAfterOneMinute,
};

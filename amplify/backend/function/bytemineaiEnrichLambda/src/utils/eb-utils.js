'use strict';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const { REGION: AWS_REGION } = process.env;

const AWS_ACCOUNT_ID = '396102999596';

const eventBridge = new AWS.EventBridge();

/**
 * Schedule a Lambda invocation after X minutes using EventBridge
 * @param {string} ruleName - Name of the Lambda function to invoke
 * @param {string} lambdaArn - ARN of the Lambda function to invoke
 * @param {number} minutesFromNow - How many minutes in the future to trigger the function
 * @param {object} eventPayload - Payload to send to the Lambda function
 * @returns {Promise<string>} - The name of the created EventBridge rule
 */
async function scheduleLambdaAfterMinutes(ruleName, lambdaArn, minutesFromNow, eventPayload, verbose = true) {
	try {
		// Generate a unique rule name using UUID
		if (verbose) {
			console.log('scheduleLambdaAfterMinutes', { ruleName });
		}

		// Calculate the exact timestamp X minutes from now
		// (1 minute = 60,000 milliseconds)
		const futureDate = new Date(Date.now() + minutesFromNow * 60000);
		if (verbose) {
			console.log('scheduleLambdaAfterMinutes', { futureDate });
		}

		// Step 1: Create a one-time EventBridge rule using the 'at()' expression
		const eventBridgePutRule = await eventBridge
			.putRule({
				Name: ruleName,
				ScheduleExpression: `cron(${futureDate.getUTCMinutes()} ${futureDate.getUTCHours()} ${futureDate.getUTCDate()} ${
					futureDate.getUTCMonth() + 1
				} ? ${futureDate.getUTCFullYear()})`,
				State: 'ENABLED',
			})
			.promise();
		if (verbose) {
			console.log('scheduleLambdaAfterMinutes', JSON.stringify({ eventBridgePutRule }));
		}

		// Step 2: Add the Lambda function as the target of this rule
		const eventBridgePutTargets = await eventBridge
			.putTargets({
				Rule: ruleName,
				Targets: [
					{
						Id: 'target-1',
						Arn: lambdaArn,
						Input: JSON.stringify(eventPayload), // Pass the custom payload to Lambda
					},
				],
			})
			.promise();
		if (verbose) {
			console.log('scheduleLambdaAfterMinutes', JSON.stringify({ eventBridgePutTargets }));
		}

		// Step 3: Add permission to allow EventBridge to invoke this Lambda
		const lambda = new AWS.Lambda();
		try {
			const eventBridgeAddPermission = await lambda
				.addPermission({
					FunctionName: lambdaArn,
					StatementId: `${ruleName}-permission`, // Must be unique
					Action: 'lambda:InvokeFunction',
					Principal: 'events.amazonaws.com',
					SourceArn: `arn:aws:events:${AWS_REGION}:${AWS_ACCOUNT_ID}:rule/${ruleName}`,
				})
				.promise();
			if (verbose) {
				console.log('scheduleLambdaAfterMinutes', JSON.stringify({ eventBridgeAddPermission }));
			}
		} catch (err) {
			// Ignore error if permission already exists (happens on re-scheduling)
			if (verbose) {
				console.log('scheduleLambdaAfterMinutes - error', err);
			}
			if (err.code !== 'ResourceConflictException') throw err;
		}
		return ruleName;
	} catch (err) {
		// Ignore error if permission already exists (happens on re-scheduling)
		if (verbose) {
			console.log('scheduleLambdaAfterMinutes - error', err);
		}
	}
}

/**
 * Delete an EventBridge rule and its targets
 * @param {string} ruleName - The name of the rule to delete
 */
async function deleteLambdaSchedule(ruleName, verbose = true) {
	if (verbose) {
		console.log('deleteLambdaSchedule', JSON.stringify({ ruleName }));
	}
	// Step 1: Remove all targets from the rule
	const eventBridgeRemoveTargets = await eventBridge
		.removeTargets({
			Rule: ruleName,
			Ids: ['target-1'],
		})
		.promise();
	if (verbose) {
		console.log('deleteLambdaSchedule', JSON.stringify({ eventBridgeRemoveTargets }));
	}

	// Step 2: Delete the rule itself
	const eventBridgeDeleteRule = await eventBridge
		.deleteRule({
			Name: ruleName,
		})
		.promise();
	if (verbose) {
		console.log('deleteLambdaSchedule', JSON.stringify({ eventBridgeDeleteRule }));
	}
}

module.exports = {
	scheduleLambdaAfterMinutes,
	deleteLambdaSchedule,
};

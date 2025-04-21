const { createBytemineSub } = require('../graphql/mutations');
const { listSubByTeamId } = require('../graphql/queries');
const { apsGql } = require('./aps-utils');

const subGet = async (teamId) => {
	const response = await apsGql(listSubByTeamId, { teamId });
	return response.data;
};

const subAddTrial = async (teamId, groupName, userId) => {
	const input = {
		id: teamId,
		owner: teamId,
		userId: userId,
		teamId: teamId,
		groupName: groupName,
		subscriptionStatus: 'Trial',
		subscriptionPeriod: 'Monthly',
		monthlyCredits: '10',
		quarterlyCredits: '0',
		annualCredits: '0',
		currentCredits: '10',
	};
	const response = await appSyncMutation(createBytemineSub, { input });
	return response.data;
};

module.exports = {
	subGet,
	subAddTrial,
};

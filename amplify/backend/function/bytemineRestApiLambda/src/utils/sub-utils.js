const { createSub } = require('../graphql/mutations');

const subGet = async (groupId) => {
	//console.log('get nymblr subscription-',groupId);
	const options = {
		groupId: groupId
	};
	//const options = {};
	const response = await appSyncQuery(queries.listNymblrSubscriptionsByGroupId, options);
	return response.data;
};

const subAddTrial = async (groupId, groupName, userId) => {
	const input = {
		groupId: groupId,
		groupName: groupName,
		userId: userId,
		subscriptionStatus: 'Trial',
		subscriptionPeriod: 'Monthly',
		monthlyCredits: '10',
		quarterlyCredits: '0',
		annualCredits: '0',
		currentCredits: '10',
	};
	const response = await appSyncMutation(createSub, { input });
	return response.data;
};

module.exports = {
	subAddTrial,
};

const { createBytemineSub, createBytemineUsage, updateBytemineSub } = require('../graphql/mutations');
const { listSubByTeamId } = require('../graphql/queries');
const { apsGql } = require('./aps-utils');

const usageAddSub = async (teamId, userId) => {
	console.log('usageAddSub', { teamId, userId });
	const input = {
		teamId: teamId,
		userId: userId,
		subscriptionStatus: 'Trial',
		subscriptionPeriod: 'Monthly',
		monthlyCredits: '10',
		quarterlyCredits: '0',
		annualCredits: '0',
		currentCredits: '10',
	};
	const newSub = await apsGql(createBytemineSub, { input }, 'data.createBytemineSub');
	console.log('usageAddSub', JSON.stringify({ newSub }));
	return newSub;
};

const usageGetSub = async (teamId) => {
	console.log('usageGetSub', { teamId });

	const subs = await apsGql(listSubByTeamId, { teamId }, 'data.listSubByTeamId.items');
	console.log('usageGetSub', JSON.stringify({ subs }));

	if (subs.length) {
		console.log('usageGetSub - found sub', JSON.stringify(sub[0]));
		return subs[0];
	}

	const newSub = await usageAddSub(teamId, userId);
	console.log('usageGetSub- created new sub', JSON.stringify(newSub));

	return newSub;
};

const usageGetTotalCredits = async (teamId, userId) => {
	console.log('usageGetTotalCredits', { teamId, userId });

	const sub = await usageGetSub(teamId);
	console.log('usageGetTotalCredits', JSON.stringify({ sub }));

	const credits = parseInt(sub.currentCredits || '0');
	console.log('usageGetTotalCredits', JSON.stringify({ credits }));

	return credits;
};

const usageAddUsage = async (teamId, userId, credits, filterId) => {
	console.log('usageAddUsage', { teamId, userId, credits, filterId });

	// Add usage log
	const usage = await apsGql(createBytemineUsage, { teamId, userId, credits, filterId }, 'data.createBytemineUsage');

	// Get subscription
	const sub = await usageGetSub(teamId);

	// Get total credits
	const creditsNow = await usageGetTotalCredits(teamId, userId);

	// Update total credits
	const subUpdated = await apsGql(updateBytemineSub, { id: sub.id, currentCredits: creditsNow - credits }, 'data.updateBytemineSub');

	// All done
	console.log('usageAddUsage', JSON.stringify({ subUpdated }));
	return subUpdated;
};

module.exports = {
	usageAddSub,
	usageGetSub,
	usageGetTotalCredits,
	usageAddUsage,
};

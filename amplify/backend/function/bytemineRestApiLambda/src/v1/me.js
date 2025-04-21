const { Router } = require('express');

const { apsGql } = require('../utils/aps-utils');
const { updateBytemineUser, createBytemineUser, updateBytemineSub, createBytemineSub } = require('../graphql/mutations');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { getBytemineSub, listUserByEmail } = require('../graphql/queries');

const router = Router();

router.get('/', verifyToken, verifyTeam, async (req, res, next) => {
	const { team: user, owner: team } = res.locals;
	console.log(JSON.stringify({ user, team }));
	return res.json({ user, team });
});

router.post('/onboard', verifyToken, async (req, res, next) => {
	const { sub, user } = res.locals;
	const attributes = user.UserAttributes || [];

	const email = attributes.find((attr) => attr.Name === 'email')?.Value || '';
	const givenName = attributes.find((attr) => attr.Name === 'given_name')?.Value || '';
	const familyName = attributes.find((attr) => attr.Name === 'family_name')?.Value || '';
	const name = attributes.find((attr) => attr.Name === 'name')?.Value || '';
	const company = attributes.find((attr) => attr.Name === 'nickname')?.Value || '';

	const emailClean = email.toLowerCase().trim();

	let isTeamUpdate = false;
	let userId = sub;
	const users = await apsGql(listUserByEmail, { email: emailClean, limit: 1000, sortDirection: 'DESC' }, 'data.listUserByEmail.items');
	if (users.length > 0) {
		isTeamUpdate = true;
		userId = users[0].id;
	}

	let userTeam;
	const userInput = { id: userId, owner: userId, userId, teamId: userId, givenName, familyName, name, company, role: 'Admin' };
	if (isTeamUpdate) {
		userTeam = apsGql(updateBytemineUser, { input: userInput }, 'data.updateBytemineUser');
	} else {
		userTeam = apsGql(createBytemineUser, { input: userInput }, 'data.createBytemineUser');
	}

	let isSubUpdate = false;
	const teamSub = await apsGql(getBytemineSub, { id: userId }, 'data.getBytemineSub');
	if (teamSub?.id) {
		isSubUpdate = true;
	}

	let userSub;
	const subInput = {
		id: userId,
		owner: userId,
		userId: userId,
		teamId: userId,
		subscriptionStatus: 'Trial',
		subscriptionPeriod: 'Monthly',
		monthlyCredits: '10',
		quarterlyCredits: '0',
		annualCredits: '0',
		currentCredits: '10',
	};
	if (isSubUpdate) {
		// userSub = apsGql(updateBytemineSub, { input: subInput }, 'data.updateBytemineSub');
	} else {
		userSub = apsGql(createBytemineSub, { input: subInput }, 'data.createBytemineSub');
	}

	console.log('All done', JSON.stringify({ userTeam, userSub }));
	return res.json({ team: userTeam, sub: userSub });
});

router.post('/login', verifyToken, async (req, res, next) => {
	const { sub } = res.locals;

	const input = { id: sub, lastLoginAt: new Date().toISOString() };

	const userUpdated = await apsGql(updateBytemineUser, { input }, 'data.updateBytemineUser');

	console.log('All done', JSON.stringify({ userUpdated }));
	return res.json(userUpdated);
});

module.exports = router;

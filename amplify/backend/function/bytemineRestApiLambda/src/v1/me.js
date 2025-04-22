const { Router } = require('express');

const { apsGql } = require('../utils/aps-utils');
const { s3GeneratePresignedUploadUrl } = require('../utils/s3-utils');
const { updateBytemineUser, createBytemineUser, updateBytemineSub, createBytemineSub, deleteBytemineUser } = require('../graphql/mutations');
const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { getBytemineSub, listUserByEmail, getBytemineUser } = require('../graphql/queries');
const { IUser, schemaValidate, IPublicUpload } = require('../schemas');
const { v4 } = require('uuid');
const { idpAdminDisableUser, idpAdminDeleteUser } = require('../utils/idp-utils');

const { REGION, STORAGE_BYTEMINESTORAGE_BUCKETNAME: BUCKETNAME, AUTH_BYTEMINEF573E062_USERPOOLID: USERPOOLID } = process.env;

const router = Router();

router.get('/', verifyToken, verifyTeam, async (req, res, next) => {
	const { team: self, owner: team } = res.locals;
	console.log(JSON.stringify({ self, team }));

	// Get subscription info
	const sub = await apsGql(getBytemineSub, { id: team.id });
	console.log(JSON.stringify({ sub }));

	return res.json({ self, team, sub });
});

router.post('/', schemaValidate(IUser), verifyToken, verifyTeam, async (req, res, next) => {
	const { team: self } = res.locals;
	const { phone, name, givenName, familyName, company } = req.body;

	const input = { id: self.id, phone, name, givenName, familyName, company };
	const selfUpdated = await apsGql(updateBytemineUser, { input }, 'data.updateBytemineUser');

	return res.json(selfUpdated);
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
	// const users = await apsGql(listUserByEmail, { email: emailClean, limit: 1000, sortDirection: 'DESC' }, 'data.listUserByEmail.items');
	// if (users.length > 0) {
	// 	isTeamUpdate = true;
	// 	userId = users[0].id;
	// }

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

router.post('/avatar', schemaValidate(IPublicUpload), verifyToken, verifyTeam, async (req, res) => {
	const { sub, team: self } = res.locals;
	const { mime, size } = req.body;
	console.log(JSON.stringify({ sub, self, mime, size }));

	const key = `avatars/${sub}/${new Date().toISOString().substring(0, 10)}/${v4()}`;
	const url = `https://${BUCKETNAME}.s3.${REGION}.amazonaws.com/${key}`;
	console.log(JSON.stringify({ key, url }));

	// generate signed upload url
	const uploadUrl = await s3GeneratePresignedUploadUrl({
		Bucket: BUCKETNAME,
		Key: key,
		ContentLength: size,
		ContentType: mime,
		ACL: 'public-read',
	});

	// Update user avatar
	const input = {
		id: self.id,
		avatarS3Key: key,
		avatarS3Url: url,
	};
	const selfUpdated = await apsGql(updateBytemineUser, { input }, 'data.updateBytemineUser');
	console.log(JSON.stringify({ input, selfUpdated }));

	return res.json({ key, url, uploadUrl: uploadUrl });
});

router.delete('/avatar', verifyToken, verifyTeam, async (req, res) => {
	const { sub, team: self } = res.locals;
	console.log(JSON.stringify({ sub, self }));

	// Update user avatar
	const input = {
		id: self.id,
		avatarS3Key: null,
		avatarS3Url: null,
	};
	const selfUpdated = await apsGql(updateBytemineUser, { input }, 'data.updateBytemineUser');
	console.log(JSON.stringify({ input, selfUpdated }));

	return res.json(selfUpdated);
});

router.delete('/', verifyToken, async (req, res) => {
	const { sub, team: self } = res.locals;
	console.log(JSON.stringify({ sub, self }));

	if (!sub) {
		console.log('User not found - skipping');
		return res.status(404).json({ message: 'User not found' });
	}

	await idpAdminDisableUser(USERPOOLID, sub);
	await idpAdminDeleteUser({ UserPoolId: USERPOOLID, Username: sub });

	if (self?.id) {
		const input = { id: self.id, _version: self._version };
		await apsGql(deleteBytemineUser, { input });
	} else {
		const input = { id: sub };
		await apsGql(deleteBytemineUser, { input });
	}

	return res.json({});
});

module.exports = router;

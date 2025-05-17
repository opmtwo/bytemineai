const { Router } = require('express');

const { createBytemineUser, deleteBytemineUser, updateBytemineUser } = require('../graphql/mutations');
const { getBytemineUser, listUserByTeamId, listUserByEmail } = require('../graphql/queries');
const { verifyTeam, verifyToken } = require('../middlewares/auth');
const { IUser, schemaValidate, IPassword } = require('../schemas');
const { apsGql } = require('../utils/aps-utils');
const {
	idpAdminCreateUser,
	idpAdminDeleteUser,
	idpAdminDisableUser,
	idpAdminEnableUser,
	idpAdminUpdateUserAttributes,
	idpAdminSetUserPassword,
} = require('../utils/idp-utils');
const countryCodes = require('../data/country-codes');
// const { stripeListSubscriptions } = require('../utils/stripe-utils');

const { AUTH_BYTEMINEF573E062_USERPOOLID: USERPOOLID } = process.env;

const router = Router();

router.get('/', verifyToken, verifyTeam, async (req, res) => {
	const { id: teamId } = res.locals.owner;

	const users = await apsGql(listUserByTeamId, { teamId, limit: 1000, sortDirection: 'DESC' }, 'data.listUserByTeamId.items');

	return res.json(users);
});

router.get('/available', verifyToken, verifyTeam, async (req, res) => {
	const { id: teamId } = res.locals.team;
	const { email } = req.query;
	const emailClean = email.toLowerCase().trim();

	const users = await apsGql(listUserByEmail, { email: emailClean }, 'data.listUserByEmail.items');
	console.log('users', { length: users.length });

	return res.json({ id: users?.[0]?.id, ok: users?.[0]?.id ? false : true });
});

router.get('/free', verifyToken, verifyTeam, async (req, res) => {
	const { id: teamId } = res.locals.team;
	const { email } = req.query;
	const emailClean = email.toLowerCase().trim();

	const users = await apsGql(listUserByEmail, { email: emailClean }, 'data.listUserByEmail.items');
	console.log('users', { length: users.length });

	return res.json({ id: users?.[0]?.id?.split('-')?.[0], ok: users?.[0]?.id ? false : true });
});

router.get('/:id', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const user = await apsGql(getBytemineUser, { id }, 'data.getBytemineUser');
	if (!user?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	return res.json(user);
});

router.get('/emails/:email', verifyToken, verifyTeam, async (req, res) => {
	const { email } = req.params;

	const emailClean = email.toLowerCase().trim();
	const users = await apsGql(listUserByEmail, { email: emailClean, limit: 1000, sortDirection: 'DESC' }, 'data.listUserByEmail.items');

	return res.json(users);
});

router.post('/', schemaValidate(IUser), verifyToken, verifyTeam, async (req, res) => {
	const { id: teamId } = res.locals.owner;
	const data = req.body;

	const emailClean = data.email.toLowerCase().trim();
	const users = await apsGql(listUserByEmail, { email: emailClean, limit: 1000, sortDirection: 'DESC' }, 'data.listUserByEmail.items');
	if (users.length > 0) {
		return res.status(422).json({ message: 'Email already in use' });
	}

	const cognitoUser = await idpAdminCreateUser(USERPOOLID, emailClean, ['EMAIL'], {
		email: emailClean,
		phone_number: `${countryCodes.find(cc => cc.code === data.country)?.dial_code || '+1'}${data.phone}`,
		name: data.name,
		given_name: data.givenName ?? '',
		family_name: data.familyName ?? '',
	});

	const sub = (cognitoUser.User?.Attributes ?? []).find((_attr) => _attr.Name === 'sub')?.Value;

	const role = data.role.toLowerCase().trim() !== 'admin' ? data.role : 'Viewer';

	const input = {
		...data,
		id: sub,
		owner: sub,
		userId: sub,
		teamId: teamId,
		email: emailClean,
		role: role,
		isEnabled: true,
	};
	const user = await apsGql(createBytemineUser, { input }, 'data.createBytemineUser');

	return res.json(user);
});

router.put('/:id', schemaValidate(IUser), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	const user = await apsGql(getBytemineUser, { id }, 'data.getBytemineUser');
	if (!user?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	await idpAdminUpdateUserAttributes(USERPOOLID, id, {
		name: data.name,
		given_name: data.givenName ?? '',
		family_name: data.familyName ?? '',
		phone_number: `${countryCodes.find(cc => cc.code === data.country)?.dial_code || '+1'}${data.phone}`,
	});

	delete data.email;

	const role = data.role.toLowerCase().trim() !== 'admin' ? data.role : 'Viewer';

	const input = { id, _version: user._version, ...data, role };
	const userUpdated = await apsGql(updateBytemineUser, { input }, 'data.updateBytemineUser');

	return res.json(userUpdated);
});

router.put('/:id/enable', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const user = await apsGql(getBytemineUser, { id }, 'data.getBytemineUser');
	if (!user?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	await idpAdminEnableUser(USERPOOLID, id);

	const input = { id, _version: user._version, isEnabled: true };
	const userUpdated = await apsGql(updateBytemineUser, { input }, 'data.updateBytemineUser');

	return res.json(userUpdated);
});

router.put('/:id/disable', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const user = await apsGql(getBytemineUser, { id }, 'data.getBytemineUser');
	if (!user?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	await idpAdminDisableUser(USERPOOLID, id);

	const input = { id, _version: user._version, isEnabled: false };
	const userUpdated = await apsGql(updateBytemineUser, { input }, 'data.updateBytemineUser');

	return res.json(userUpdated);
});

router.put('/:id/password', schemaValidate(IPassword), verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	const user = await apsGql(getBytemineUser, { id }, 'data.getBytemineUser');
	if (!user?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	await idpAdminSetUserPassword({ UserPoolId: USERPOOLID, Username: id, password: data.password });

	return res.json(user);
});

router.delete('/:id', verifyToken, verifyTeam, async (req, res) => {
	const { id } = req.params;

	const user = await apsGql(getBytemineUser, { id }, 'data.getBytemineUser');
	if (!user?.id) {
		return res.status(404).json({ message: 'Not found' });
	}

	await idpAdminDisableUser(USERPOOLID, id);
	await idpAdminDeleteUser({ UserPoolId: USERPOOLID, Username: id });

	const input = { id, _version: user._version };
	await apsGql(deleteBytemineUser, { input });

	return res.json(user);
});

module.exports = router;

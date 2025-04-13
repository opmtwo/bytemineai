const { getUser, listUsersByTeamId } = require('../graphql/queries');
const { apsGql } = require('../utils/aps-utils');
const { idpAdminGetUser, idpAdminListGroupsForUser, idpGetUserByToken } = require('../utils/idp-utils');
const { stripeGetSubscription } = require('../utils/stripe-utils');

const { AUTH_BYTEMINEAI2721B75B_USERPOOLID: USERPOOLID } = process.env;

const verifyToken = async (req, res, next) => {
	// Define a default error response.
	const defaultResponse = { error: 'Unauthorized' };

	// Extract the token from the Authorization header in the request.
	const token = req.headers.Authorization || req.headers.authorization;

	// Extract the user id directly from the header
	// This is passed in header when using partner mode to browse team member
	const userId = req.headers['x-amz-security-token'];

	// Log the token for debugging purposes.
	console.log('verifyToken', { USERPOOLID, token, userId });

	// If no token is found in the request headers, log an error, return a 401 status, and send the default error response.
	if (!token && !userId) {
		console.log(`verifyToken - token not found`);
		return res.status(401).json(defaultResponse);
	}

	let user;
	let userInfo;

	if (userId) {
		// If trying to auth via user id then check access token and retrieve team member
		if (token?.length > 100) {
			try {
				// Retrieve user information using the provided token.
				userInfo = await idpGetUserByToken({ AccessToken: token });
				console.log(JSON.stringify({ userInfo }));

				// Retrieve full user information using
				user = await idpAdminGetUser(USERPOOLID, userInfo.Username);

				// Log info
				console.log('verifyToken', JSON.stringify({ userInfo, user }));
			} catch (err) {
				console.log('Error fetching access token by token', { token });
			}
		}

		// Save team member in team
		if (userId) {
			try {
				user = await idpAdminGetUser(USERPOOLID, userId);
				console.log(JSON.stringify({ user }));

				// Attach user-related information to the response locals for further use.
				res.locals.team = user;
			} catch (err) {
				console.log('verifyToken - error fetching user details via userid', err);
			}
		}
	}

	// If the user is not enabled, log an error, return a 401 status, and send the default error response.
	console.log(JSON.stringify({ user, userInfo }));
	if (user?.Enabled === false) {
		console.error('verifyToken - err - user not enabled');
		return res.status(401).json(defaultResponse);
	}

	// Attach user-related information to the response locals for further use.
	res.locals.token = token;
	res.locals.userId = userId;
	res.locals.user = user;
	res.locals.userInfo = userInfo;
	res.locals.sub = (user?.UserAttributes || userInfo?.UserAttributes || []).find((_attr) => _attr.Name === 'sub')?.Value;
	res.locals.username = user?.Username || userInfo?.Username;

	console.log({ user, userInfo });

	// Call the next middleware in the chain.
	return next();
};

const verifyGroup = async (req, res, next) => {
	try {
		// Retrieve detailed user group information
		const groups = await idpAdminListGroupsForUser({ UserPoolId: USERPOOLID, Username: res.locals.username });

		// Get user cognito groups
		res.locals.groups = groups.map((_group) => _group.GroupName);

		// check for root or admin cognito groups
		const isRoot = res.locals.groups.find((_group) => _group.toLowerCase() === 'root');
		const isAdmin = res.locals.groups.find((_group) => _group.toLowerCase() === 'admin');
		if (!isRoot) {
			console.error('verifyGroup - err - user is neither root nor admin');
			return res.status(403).json({ error: 'Group validation failed' }).send();
		}

		// Call the next middleware in the chain.
		return next();
	} catch (err) {
		// If an error occurs during the process, log the error, return a 403 status, and send the default error response.
		console.log(`😱 - verifyGroup - error`, err);
		return res.status(403).json({ error: 'Group validation failed' }).send();
	}
};

const verifyPlan = async (req, res, next) => {
	try {
		// Declare a variable to store the subscription information.
		let subscription;

		try {
			// Attempt to retrieve the subscription information using the provided subscription ID.
			subscription = await stripeGetSubscription(res.locals.owner.stripeSubscriptionId);
		} catch (err) {
			// If an error occurs during the subscription retrieval, log the error, return a 403 status, and send the default error response.
			console.log(`😱 - verifyPlan - verification failed`, err);
			return res.status(403).json({ error: 'Subscription not found' }).send();
		}

		// Check if the subscription status is one of the allowed values ('trialing', 'active', 'past_due', 'unpaid').
		// If not, log an error, return a 403 status, and send the default error response.
		if (
			[
				'trialing',
				'active',
				// 'past_due',
				// 'unpaid'
			].includes(subscription?.status) !== true
		) {
			console.log(`😱 - verifyPlan - verification failed`);
			return res.status(403).json({ error: 'Subscription has expired' }).send();
		}

		// Attach the subscription information to the response locals for further use.
		res.locals.subscription = subscription;

		// Call the next middleware in the chain.
		return next();
	} catch (err) {
		// If an error occurs during the process, log the error, return a 403 status, and send the default error response.
		console.log(`😱 - verifyPlan - error`, err);
		return res.status(403).json({ error: 'Subscription failed' }).send();
	}
};

const verifyTeam = async (req, res, next) => {
	// Define a default error response.
	const defaultResponse = { error: 'Unauthorized' };

	try {
		// Extract the username from the local storage of the response object.
		const username = res.locals.username;

		// Query the GraphQL server to get the team data based on the user's username.
		const team = await apsGql(getUser, { id: username }, 'data.getUser');

		// If no team data is found, log an error, return a 403 status, and send the default error response.
		if (!team?.id) {
			console.log(`😱 - verifyTeam - team data not found`);
			return res.status(403).json(defaultResponse).send();
		}

		// Query the GraphQL server to get the list of members in the team.
		const members = await apsGql(listUsersByTeamId, { teamId: team.teamId }, 'data.listUsersByTeamId.items');

		// Find the owner of the team from the list of members.
		const owner = members.find((_member) => _member.role === 'owner');

		// If no owner data is found, log an error, return a 403 status, and send the default error response.
		if (!owner?.id) {
			console.log(`😱 - verifyTeam - owner data not found`);
			return res.status(403).json(defaultResponse).send();
		}

		// Attach team, owner, and members to the response locals for further use.
		res.locals.team = team;
		res.locals.owner = owner;
		res.locals.members = members;

		// Call the next middleware in the chain.
		return next();
	} catch (err) {
		// If an error occurs during the process, log the error, return a 403 status, and send the default error response.
		console.log(`😱 - verifyTeam - error`, err);
		return res.status(403).json(defaultResponse).send();
	}
};

module.exports = {
	verifyToken,
	verifyGroup,
	verifyPlan,
	verifyTeam,
};

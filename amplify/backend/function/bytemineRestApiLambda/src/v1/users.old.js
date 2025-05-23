/* eslint-disable */
/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const {
	adminCreateGroup,
	adminCreateAgency,
	adminUpdateAgency,
	addUserToGroup,
	removeUserFromGroup,
	confirmUserSignUp,
	disableUser,
	enableUser,
	getUser,
	listUsers,
	listGroups,
	listGroupsForUser,
	listUsersInGroup,
	signUserOut,
	adminCreateUser,
	adminDeleteUser,
	DeleteGroup,
	adminUpdateUserAttributes,
	updateSettings,
} = require('../utils/cognito-utils');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Only perform tasks if the user is in a specific group
const allowedGroup = process.env.GROUP;

const checkGroup = function (req, res, next) {
	if (req.path == '/signUserOut') {
		return next();
	}

	if (typeof allowedGroup === 'undefined' || allowedGroup === 'NONE') {
		return next();
	}

	// Fail if group enforcement is being used
	if (req.apiGateway.event.requestContext.authorizer.claims['cognito:groups']) {
		const groups = req.apiGateway.event.requestContext.authorizer.claims['cognito:groups'].split(',');
		if (!(allowedGroup && groups.indexOf(allowedGroup) > -1)) {
			const err = new Error(`User does not have permissions to perform administrative tasks`);
			next(err);
		}
	} else {
		const err = new Error(`User does not have permissions to perform administrative tasks`);
		err.statusCode = 403;
		next(err);
	}
	next();
};

app.all('*', checkGroup);

app.post('/adminCreateGroup', async (req, res, next) => {
	if (!req.body.groupname) {
		const err = new Error('groupname is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await adminCreateGroup(req.body.groupname);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/addUserToGroup', async (req, res, next) => {
	if (!req.body.username || !req.body.groupname) {
		const err = new Error('username and groupname are required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await addUserToGroup(req.body.username, req.body.groupname);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/removeUserFromGroup', async (req, res, next) => {
	if (!req.body.username || !req.body.groupname) {
		const err = new Error('username and groupname are required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await removeUserFromGroup(req.body.username, req.body.groupname);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/confirmUserSignUp', async (req, res, next) => {
	if (!req.body.username) {
		const err = new Error('username is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await confirmUserSignUp(req.body.username);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/disableUser', async (req, res, next) => {
	if (!req.body.username) {
		const err = new Error('username is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await disableUser(req.body.username);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/deleteUser', async (req, res, next) => {
	if (!req.body.username) {
		const err = new Error('username is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await adminDeleteUser(req.body.username);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});
// testing api
app.post('/deletegroup', async (req, res, next) => {
	if (!req.body.groupName) {
		const err = new Error('groupName is required');
		err.statusCode = 400;
		return next(err);
	}
	try {
		const response = await DeleteGroup(req.body.groupName);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});
app.post('/enableUser', async (req, res, next) => {
	if (!req.body.username) {
		const err = new Error('username is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await enableUser(req.body.username);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.get('/getUser', async (req, res, next) => {
	if (!req.query.username) {
		const err = new Error('username is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await getUser(req.query.username);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.get('/listUsers', async (req, res, next) => {
	try {
		let response;
		if (req.query.token) {
			response = await listUsers(req.query.limit || 25, req.query.token);
		} else if (req.query.limit) {
			response = await listUsers((Limit = req.query.limit));
		} else {
			response = await listUsers();
		}
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.get('/listGroups', async (req, res, next) => {
	try {
		let response;
		if (req.query.token) {
			response = await listGroups(req.query.limit || 25, req.query.token);
		} else if (req.query.limit) {
			response = await listGroups((Limit = req.query.limit));
		} else {
			response = await listGroups();
		}
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.get('/listGroupsForUser', async (req, res, next) => {
	if (!req.query.username) {
		const err = new Error('username is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		let response;
		if (req.query.token) {
			response = await listGroupsForUser(req.query.username, req.query.limit || 25, req.query.token);
		} else if (req.query.limit) {
			response = await listGroupsForUser(req.query.username, (Limit = req.query.limit));
		} else {
			response = await listGroupsForUser(req.query.username);
		}
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.get('/listUsersInGroup', async (req, res, next) => {
	if (!req.query.groupname) {
		const err = new Error('groupname is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		let response;
		if (req.query.token) {
			response = await listUsersInGroup(req.query.groupname, req.query.limit || 25, req.query.token);
		} else if (req.query.limit) {
			response = await listUsersInGroup(req.query.groupname, (Limit = req.query.limit));
		} else {
			response = await listUsersInGroup(req.query.groupname);
		}
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/signUserOut', async (req, res, next) => {
	/**
	 * To prevent rogue actions of users with escalated privilege signing
	 * other users out, we ensure it's the same user making the call
	 * Note that this only impacts actions the user can do in User Pools
	 * such as updating an attribute, not services consuming the JWT
	 */
	if (
		req.body.username != req.apiGateway.event.requestContext.authorizer.claims.username &&
		req.body.username != /[^/]*$/.exec(req.apiGateway.event.requestContext.identity.userArn)[0]
	) {
		const err = new Error('only the user can sign themselves out');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await signUserOut(req.body.username);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/adminCreateUser', async (req, res, next) => {
	if (!req.body.username) {
		const err = new Error('Username is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.groupname) {
		const err = new Error('Group name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.name) {
		const err = new Error('Name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.firstname) {
		const err = new Error('First name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.lastname) {
		const err = new Error('Last name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.country) {
		const err = new Error('Country is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.phone) {
		const err = new Error('Phone number is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.role) {
		const err = new Error('Role is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await adminCreateUser(
			req.body.username,
			req.body.groupname,
			req.body.name,
			req.body.firstname,
			req.body.lastname,
			req.body.country,
			req.body.phone,
			req.body.role
		);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/adminUpdateUserAttributes', async (req, res, next) => {
	if (!req.body.username) {
		const err = new Error('Username is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.firstname) {
		const err = new Error('First name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.lastname) {
		const err = new Error('Last name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.role) {
		const err = new Error('Role is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.country) {
		const err = new Error('Country is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.phone) {
		const err = new Error('Phone number is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.email) {
		const err = new Error('Email address is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await adminUpdateUserAttributes(
			req.body.username,
			req.body.firstname,
			req.body.lastname,
			req.body.role,
			req.body.country,
			req.body.phone,
			req.body.email
		);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/adminCreateAgency', async (req, res, next) => {
	if (!req.body.name) {
		const err = new Error('Name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.email) {
		const err = new Error('Email is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.username) {
		const err = new Error('Username is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.groupname) {
		const err = new Error('Group name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.role) {
		const err = new Error('Role is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.account_type) {
		const err = new Error('Account type is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.renewal_period) {
		const err = new Error('Renewal period is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.credits) {
		const err = new Error('Credits is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.bonus_credits) {
		const err = new Error('Bonus credits is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.seats) {
		const err = new Error('Seats is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.country) {
		const err = new Error('Country is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.phone) {
		const err = new Error('Phone number is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.firstname) {
		const err = new Error('First name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.lastname) {
		const err = new Error('Last name is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await adminCreateAgency(
			req.body.name,
			req.body.email,
			req.body.username,
			req.body.groupname,
			req.body.role,
			req.body.account_type,
			req.body.renewal_period,
			req.body.credits,
			req.body.bonus_credits,
			req.body.seats,
			req.body.country,
			req.body.phone,
			req.body.firstname,
			req.body.lastname,
			req.body.hasApi,
			req.body.hasEmail
		);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/adminUpdateAgency', async (req, res, next) => {
	if (!req.body.name) {
		const err = new Error('Name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.email) {
		const err = new Error('Email is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.username) {
		const err = new Error('Username is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.country) {
		const err = new Error('Country is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.phone) {
		const err = new Error('Phone number is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.firstname) {
		const err = new Error('First name is required');
		err.statusCode = 400;
		return next(err);
	}

	if (!req.body.lastname) {
		const err = new Error('Last name is required');
		err.statusCode = 400;
		return next(err);
	}

	try {
		const response = await adminUpdateAgency(
			req.body.name,
			req.body.email,
			req.body.username,
			req.body.country,
			req.body.phone,
			req.body.firstname,
			req.body.lastname
		);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

app.post('/updateSettings', async (req, res, next) => {
	if (!req.body.username) {
		const err = new Error('Username is required');
		err.statusCode = 400;
		return next(err);
	}
	try {
		const response = await updateSettings(req.body.username, req.body.color_code, req.body.logo_s3_key, req.body.icon_s3_key);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

// Error middleware must be defined last
app.use((err, req, res, next) => {
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
	res.status(err.statusCode).json({ message: err.message }).end();
});

app.listen(3000, () => {
	console.log('App started');
});

module.exports = app;

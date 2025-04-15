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

const { CognitoIdentityServiceProvider } = require('aws-sdk');

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const userPoolId = process.env.USERPOOL;

async function adminCreateGroup(groupname) {
	const groupParams = {
		GroupName: groupname,
		UserPoolId: userPoolId,
	};
	console.log(`Attempting to add cognito group ${groupname}`);
	let result;
	try {
		result = await cognitoIdentityServiceProvider.getGroup(groupParams).promise();
	} catch (err) {
		console.log('adminCreateGroup error', err);
		try {
			result = await cognitoIdentityServiceProvider.createGroup({ ...groupParams, Precedence: 2 }).promise();
		} catch (err) {
			console.log('adminCreateGroup error', err);
			throw err;
		}
	}
	return {
		message: `Success creating new cognito group ${groupname}`,
		data: result,
	};
}

async function adminCreateUser(username, groupname, name, firstname, lastname, country, phone, role) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
		DesiredDeliveryMediums: ['EMAIL'],
		UserAttributes: [
			{
				Name: 'custom:group_name',
				Value: groupname,
			},
			{
				Name: 'name',
				Value: name,
			},
			{
				Name: 'email',
				Value: username,
			},
			{
				Name: 'email_verified',
				Value: 'true',
			},
			{
				Name: 'given_name',
				Value: firstname,
			},
			{
				Name: 'family_name',
				Value: lastname,
			},
			{
				Name: 'phone_number',
				Value: phone,
			},
			{
				Name: 'custom:role',
				Value: role,
			},
			{
				Name: 'custom:country',
				Value: country,
			},
			{
				Name: 'custom:created_at',
				Value: (+new Date()).toString(),
			},
		],
		
	};

	console.log(`Attempting to add admin user ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
		console.log(`Success adding admin user ${username}`);
		return {
			message: `Success adding admin user ${username}`,
			data: result,
		};
	} catch (err) {
		console.log('adminCreateUser error', err);
		throw err;
	}
}

async function adminUpdateUserAttributes(username, firstname, lastname, role, country, phone, email) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
		UserAttributes: [
			{
				Name: 'given_name',
				Value: firstname,
			},
			{
				Name: 'family_name',
				Value: lastname,
			},
			{
				Name: 'phone_number',
				Value: phone,
			},
			{
				Name: 'custom:role',
				Value: role,
			},
			{
				Name: 'email',
				Value: email,
			},
			{
				Name: 'email_verified',
				Value: 'true',
			},
			{
				Name: 'custom:country',
				Value: country,
			},
		],
	};

	console.log(`Attempting to update admin user ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
		console.log(`Success updating admin user ${username}`);
		return {
			message: `Success updating admin user ${username}`,
			data: result,
		};
	} catch (err) {
		console.log('adminUpdateUserAttributes error', err);
		throw err;
	}
}

async function adminCreateAgency(
	name,
	email,
	username,
	groupname,
	role,
	account_type,
	renewal_period,
	credits,
	bonus_credits,
	seats,
	country,
	phone,
	firstname,
	lastname,
	has_api,
	has_email,
) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
		DesiredDeliveryMediums: ['EMAIL'],
		UserAttributes: [
			{
				Name: 'name',
				Value: name,
			},
			{
				Name: 'email',
				Value: email,
			},
			{
				Name: 'email_verified',
				Value: 'true',
			},
			{
				Name: 'given_name',
				Value: firstname,
			},
			{
				Name: 'family_name',
				Value: lastname,
			},
			{
				Name: 'phone_number',
				Value: phone,
			},
			{
				Name: 'custom:country',
				Value: country,
			},
			{
				Name: 'custom:group_name',
				Value: groupname,
			},
			{
				Name: 'custom:role',
				Value: role,
			},
			{
				Name: 'custom:account_type',
				Value: account_type,
			},
			{
				Name: 'custom:renewal_period',
				Value: renewal_period,
			},
			{
				Name: 'custom:credits',
				Value: credits,
			},
			{
				Name: 'custom:bonus_credits',
				Value: bonus_credits,
			},
			{
				Name: 'custom:seats',
				Value: seats,
			},
			{
				Name: 'custom:has_api',
				Value: has_api,
			},
			{
				Name: 'custom:has_email',
				Value: has_email,
			},
			{
				Name: 'custom:created_at',
				Value: (+new Date()).toString(),
			},
		],
	};

	console.log(`Attempting to add admin user ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
		console.log(`Success adding admin user ${username}`);
		return {
			message: `Success adding admin user ${username}`,
			data: result,
		};
	} catch (err) {
		console.log('adminCreateUser error', err);
		throw err;
	}
}

async function adminUpdateAgency(
	name,
	email,
	username,
	country,
	phone,
	firstname,
	lastname
) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
		UserAttributes: [
			{
				Name: 'name',
				Value: name,
			},
			{
				Name: 'email',
				Value: email,
			},
			{
				Name: 'given_name',
				Value: firstname,
			},
			{
				Name: 'family_name',
				Value: lastname,
			},
			{
				Name: 'phone_number',
				Value: phone,
			},
			{
				Name: 'custom:country',
				Value: country,
			}
		],
	};

	console.log(`Attempting to update admin user ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
		console.log(`Success updating admin user ${username}`);
		return {
			message: `Success updating admin user ${username}`,
			data: result,
		};
	} catch (err) {
		console.log('adminUpdateUserAttributes error', err);
		throw err;
	}
}

async function addUserToGroup(username, groupname) {
	const params = {
		GroupName: groupname,
		UserPoolId: userPoolId,
		Username: username,
	};

	console.log(`Attempting to add ${username} to ${groupname}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
		console.log(`Success adding ${username} to ${groupname}`);
		return {
			message: `Success adding ${username} to ${groupname}`,
		};
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function removeUserFromGroup(username, groupname) {
	const params = {
		GroupName: groupname,
		UserPoolId: userPoolId,
		Username: username,
	};

	console.log(`Attempting to remove ${username} from ${groupname}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminRemoveUserFromGroup(params).promise();
		console.log(`Removed ${username} from ${groupname}`);
		return {
			message: `Removed ${username} from ${groupname}`,
		};
	} catch (err) {
		console.log(err);
		throw err;
	}
}

// Confirms as an admin without using a confirmation code.
async function confirmUserSignUp(username) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
	};

	try {
		const result = await cognitoIdentityServiceProvider.adminConfirmSignUp(params).promise();
		console.log(`Confirmed ${username} registration`);
		return {
			message: `Confirmed ${username} registration`,
		};
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function disableUser(username) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
	};

	try {
		const result = await cognitoIdentityServiceProvider.adminDisableUser(params).promise();
		console.log(`Disabled ${username}`);
		return {
			message: `Disabled ${username}`,
		};
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function adminDeleteUser(username) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
	};

	try {
		const result = await cognitoIdentityServiceProvider.adminDeleteUser(params).promise();
		console.log(`Deleted ${username}`);
		return {
			message: `Deleted ${username}`,
		};
	} catch (err) {
		console.log(err);
		throw err;
	}
}
async function DeleteGroup(groupName) {
    const params = {
        UserPoolId: userPoolId,
        GroupName: groupName,
    };
    try {
        const result = await cognitoIdentityServiceProvider.deleteGroup(params).promise();
        console.log(`Deleted ${groupName}`);
        return {
            message: `Deleted ${groupName}`,
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}
async function enableUser(username) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
	};

	try {
		const result = await cognitoIdentityServiceProvider.adminEnableUser(params).promise();
		console.log(`Enabled ${username}`);
		return {
			message: `Enabled ${username}`,
		};
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function getUser(username) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
	};

	console.log(`Attempting to retrieve information for ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
		return result;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function listUsers(Limit, PaginationToken) {
	const params = {
		UserPoolId: userPoolId,
		...(Limit && { Limit }),
		...(PaginationToken && { PaginationToken }),
	};

	console.log('Attempting to list users');

	try {
		const result = await cognitoIdentityServiceProvider.listUsers(params).promise();

		// Rename to NextToken for consistency with other Cognito APIs
		result.NextToken = result.PaginationToken;
		delete result.PaginationToken;

		return result;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function listGroups(Limit, PaginationToken) {
	const params = {
		UserPoolId: userPoolId,
		...(Limit && { Limit }),
		...(PaginationToken && { PaginationToken }),
	};

	console.log('Attempting to list groups');

	try {
		const result = await cognitoIdentityServiceProvider.listGroups(params).promise();

		// Rename to NextToken for consistency with other Cognito APIs
		result.NextToken = result.PaginationToken;
		delete result.PaginationToken;

		return result;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function listGroupsForUser(username, Limit, NextToken) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
		...(Limit && { Limit }),
		...(NextToken && { NextToken }),
	};

	console.log(`Attempting to list groups for ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminListGroupsForUser(params).promise();
		/**
		 * We are filtering out the results that seem to be innapropriate for client applications
		 * to prevent any informaiton disclosure. Customers can modify if they have the need.
		 */
		result.Groups.forEach((val) => {
			delete val.UserPoolId,
				delete val.LastModifiedDate,
				delete val.CreationDate,
				delete val.Precedence,
				delete val.RoleArn;
		});

		return result;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function listUsersInGroup(groupname, Limit, NextToken) {
	const params = {
		GroupName: groupname,
		UserPoolId: userPoolId,
		...(Limit && { Limit }),
		...(NextToken && { NextToken }),
	};

	console.log(`Attempting to list users in group ${groupname}`);

	try {
		const result = await cognitoIdentityServiceProvider.listUsersInGroup(params).promise();
		return result;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

// Signs out from all devices, as an administrator.
async function signUserOut(username) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
	};

	console.log(`Attempting to signout ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminUserGlobalSignOut(params).promise();
		console.log(`Signed out ${username} from all devices`);
		return {
			message: `Signed out ${username} from all devices`,
		};
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function updateSettings(username, color_code, logo_s3_key, icon_s3_key) {
	const params = {
		UserPoolId: userPoolId,
		Username: username,
		UserAttributes: [],
	};

	if (color_code) {
		params.UserAttributes.push({
			Name: 'custom:color_code',
			Value: color_code,
		});
	}

	if (logo_s3_key) {
		params.UserAttributes.push({
			Name: 'custom:logo_s3_key',
			Value: logo_s3_key,
		});
	}

	if (icon_s3_key) {
		params.UserAttributes.push({
			Name: 'custom:icon_s3_key',
			Value: icon_s3_key,
		});
	}

	console.log(`Attempting to update settings for account ${username}`);

	try {
		const result = await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
		console.log(`Success updating settings for account ${username}`);
		return {
			message: `Success updating settings for account ${username}`,
			data: result,
		};
	} catch (err) {
		console.log('updateSettings error', err);
		throw err;
	}
}

module.exports = {
	adminCreateGroup,
	adminCreateAgency,
	adminUpdateAgency,
	adminCreateUser,
	adminUpdateUserAttributes,
	adminDeleteUser,
	DeleteGroup,
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
	updateSettings,
};

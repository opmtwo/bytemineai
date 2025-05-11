import Fuse from 'fuse.js';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import isInt from 'validator/lib/isInt';
import isLength from 'validator/lib/isLength';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { GraphQLOptions } from '@aws-amplify/api-graphql';
import {
	accountTypeOptions,
	CognitoUserData,
	renewalPeriodOptions,
	roleOptions,
	UsageModel,
	UserAttributes,
} from '../types';
import countryCodes from '../data/country-codes';
import moment from 'moment';
import API from '@aws-amplify/api';



export const userFuseOptions: Fuse.IFuseOptions<UserAttributes> = {
    keys: [
        'name',
        'given_name',
        'family_name',
        'email',
        'phone_number',
        'custom:role',
        ],
	findAllMatches: true,
	isCaseSensitive: false,
	shouldSort: true,
	useExtendedSearch: true,
};

export const searchUserItems = (items: UserAttributes[], query: string) => {
    console.log(items);
	const fuse = new Fuse(items, userFuseOptions);
    items = fuse.search(query).map((item) => item.item);

	return items ;
};

/**
 * Validate username
 * @returns {Boolean}
 */
export const isUsernameValid = async (username: string) => {
	const blacklist = [
		'root',
		'owner',
		'admin',
		'superadmin',
		'default',
		'moderator',
		'editor',
		'user',
		'guest',
		'anonymous',
	];
	return (
		isAlpha(username) &&
		isLength(username, { min: 3, max: 20 }) &&
		blacklist.includes(username.trim().toLowerCase()) === false
	);
};

/**
 * Validate first name
 * @returns {Boolean}
 */
export const isFirstNameValid = async (firstName: string) => {
	return firstName && firstName.trim().length > 0;
};

/**
 * Validate last name
 * @returns {Boolean}
 */
export const isLastNameValid = async (lastName: string) => {
	return lastName && lastName.trim().length > 0;
};

/**
 * Validate email
 * @returns {Boolean}
 */
export const isEmailValid = async (email: string) => {
	return email && email.trim().length && isEmail(email);
};

/**
 * Validate country code
 * @returns {Boolean}
 */
export const isCountryValid = async (value: string) => countryCodes.findIndex((data) => data.code === value) !== -1;

/**
 * Validate phone number
 * @returns {Boolean}
 */
export const isPhoneValid = async (phone: string) => {
	return phone && phone.trim().length && isMobilePhone(phone);
};

export const isPhoneValidStrict = async (phone: string) => {
	return phone && phone.trim().length && isMobilePhone(phone, 'any', { strictMode: true });
};

/**
 * Validate password
 * @see https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 * @returns {Boolean}
 */
export const isPasswordValid = async (value: string) => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/;
	return value && passwordRegex.test(value);
};

/**
 * Validate role
 * @returns {Boolean}
 */
export const isRoleValid = async (role: string) => {
	return role && role.trim().length && roleOptions.findIndex((item) => item.id === role) !== -1;
};

/**
 * Validate credits
 * @returns {Boolean}
 */
export const isCreditsValid = async (value: string) => isInt(value);

/**
 * Validate bonus credits
 * @returns {Boolean}
 */
export const isBonusCreditsValid = async (value: string) => isInt(value);

/**
 * Validate bonus credits
 * @returns {Boolean}
 */
export const isSeatsValid = async (value: string) => isInt(value);

/**
 * Validate role
 * @returns {Boolean}
 */
export const isRenewalPeriodValid = async (value: string) =>
	value && value.trim().length && renewalPeriodOptions.findIndex((item) => item.id === value) !== -1;

/**
 * Validate account type
 * @returns {Boolean}
 */
export const isAccountTypeValid = async (value: string) =>
	value && value.trim().length && accountTypeOptions.findIndex((item) => item.id === value) !== -1;

/**
 * @summary
 * Parse Cognito user data and return Cognito user attributes
 *
 * @param user The Cognito user attributes returned by GetUser or ListUsers
 * @returns {UserAttributes} Cognito user attributes
 */
export const parseCognitoUser = (user: CognitoUserData): UserAttributes => ({
	sub: user.Attributes.find((attr) => attr.Name === 'sub')?.Value || '',
	email: user.Attributes.find((attr) => attr.Name === 'email')?.Value || '',
	email_verified: user.Attributes.find((attr) => attr.Name === 'email_verified')?.Value || '',
	name: user.Attributes.find((attr) => attr.Name === 'name')?.Value || '',
	phone_number: user.Attributes.find((attr) => attr.Name === 'phone_number')?.Value || '',
	given_name: user.Attributes.find((attr) => attr.Name === 'given_name')?.Value || '',
	family_name: user.Attributes.find((attr) => attr.Name === 'family_name')?.Value || '',
	profile: user.Attributes.find((attr) => attr.Name === 'profile')?.Value || '',
	'custom:role': user.Attributes.find((attr) => attr.Name === 'custom:role')?.Value || '',
	'custom:country': user.Attributes.find((attr) => attr.Name === 'custom:country')?.Value || '',
	'custom:group_name': user.Attributes.find((attr) => attr.Name === 'custom:group_name')?.Value || '',
	'custom:created_at': user.Attributes.find((attr) => attr.Name === 'custom:created_at')?.Value || '',
	'custom:last_login_at': user.Attributes.find((attr) => attr.Name === 'custom:last_login_at')?.Value || '',
	'custom:profile_pic': user.Attributes.find((attr) => attr.Name === 'custom:profile_pic')?.Value || '',
	'custom:account_type': user.Attributes.find((attr) => attr.Name === 'custom:account_type')?.Value || '',
	'custom:renewal_period': user.Attributes.find((attr) => attr?.Name === 'custom:renewal_period')?.Value || '',
	'custom:credits': user.Attributes.find((attr) => attr.Name === 'custom:credits')?.Value || '',
	'custom:bonus_credits': user.Attributes.find((attr) => attr.Name === 'custom:bonus_credits')?.Value || '',
	'custom:seats': user.Attributes.find((attr) => attr.Name === 'custom:seats')?.Value || '',
	'custom:color_code': user.Attributes.find((attr) => attr.Name === 'custom:color_code')?.Value || '',
	'custom:logo_s3_key': user.Attributes.find((attr) => attr.Name === 'custom:logo_s3_key')?.Value || '',
	'custom:logo_s3_url': user.Attributes.find((attr) => attr.Name === 'custom:logo_s3_url')?.Value || '',
	'custom:icon_s3_key': user.Attributes.find((attr) => attr.Name === 'custom:icon_s3_key')?.Value || '',
	'custom:icon_s3_url': user.Attributes.find((attr) => attr.Name === 'custom:icon_s3_url')?.Value || '',
	'custom:connect_email_code': user.Attributes.find((attr) => attr.Name === 'custom:connect_email_code')?.Value || '',
	'custom:connect_email_token': user.Attributes.find((attr) => attr.Name === 'custom:connect_email_token')?.Value || '',
	'custom:temp_code': user.Attributes.find((attr) => attr.Name === 'custom:temp_code')?.Value || '',
	'custom:has_api': user.Attributes.find((attr) => attr.Name === 'custom:has_api')?.Value ? true : false,
	'custom:has_email': user.Attributes.find((attr) => attr.Name === 'custom:has_email')?.Value ? true : false,
    'custom:monthly_credits': '10',
    'custom:yearly_credits': '0',
    'custom:renewal_date': '',
});

/**
 * @summary
 * Get all usage data for the specified Cognito group filterd by date
 *
 * @param groupname The Cognito group name
 * @param date date in format DD-MM-YYYY
 * @returns UsageModel[]
 */
export const getUsage = async (groupname: string, date: string) => {
	let response: any;
	let items: UsageModel[] = [];
	let nextToken = undefined;
	// while (true) {
	// 	const options: GraphQLOptions = {
	// 		query: listUsageByGroupId,
	// 		variables: {
	// 			groupId: groupname,
	// 			createdAt: {
	// 				beginsWith: moment(date, 'DD-MM-YYYY', true).format('YYYY-MM-DD'),
	// 			},
	// 			sortDirection: 'DESC',
	// 			nextToken: nextToken,
	// 		},
	// 	};
	// 	try {
	// 		response = await API.graphql(options);
	// 		items = items.concat(items, response?.data?.listUsageByGroupId?.items || []);
	// 		nextToken = response?.data?.listUsageByGroupId?.nextToken;
	// 	} catch (err) {
	// 		break;
	// 	}
	// 	if (!nextToken) {
	// 		break;
	// 	}
	// }
	return items;
};

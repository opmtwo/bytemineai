const { Router } = require('express');

const aws = require('aws-sdk');

const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
	apiVersion: '2016-04-18',
});

const axios = require('axios');
const { AUTH_BYTEMINEF573E062_USERPOOLID: USERPOOLID } = process.env;

const router = Router();

function makeid(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const { Resolver } = require('dns').promises;

const isValidRegexEmail = (email) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email) && !/\s/.test(email.trim());

const dnsServers = [
	'1.1.1.1', // Cloudflare
	'1.0.0.1', // Cloudflare
	'8.8.8.8', // Google
	'8.8.4.4', // Google
	'208.67.222.222', // OpenDNS
	'208.67.220.220', // OpenDNS
];

const resolverOptions = {
	timeout: 3000,
	tries: Math.min(4, dnsServers.length),
};

const resolveDNS = async ({ type, value }) => {
	try {
		const resolver = new Resolver(resolverOptions);
		resolver.setServers(dnsServers);

		let addresses;
		switch (type) {
			case 'mx':
				addresses = await resolver.resolveMx(value);
				break;
			case 'lookup':
				addresses = await resolver.resolve(value);
				break;
			case 'ns':
				addresses = await resolver.resolveNs(value);
				break;
			default:
				throw new Error(`Unknown DNS resolve type: ${type}`);
		}
		if (Array.isArray(addresses) && addresses.length > 0) {
			console.log(addresses);
			let isGoogle = false;
			addresses.forEach((e) => {
				if (e.exchange.includes('google')) {
					isGoogle = true;
				}
			});
			return { isValid: true, addresses, isGoogle };
		} else {
			return { isValid: false, addresses: [], isGoogle: false };
		}
	} catch (error) {
		if (['ECONNREFUSED', 'ENOTFOUND'].includes(error.code)) {
			return { isValid: false, addresses: [], isGoogle: false };
		} else {
			return { isValid: false, addresses: [], error: error, isGoogle: false };
		}
	}
};

const isValidMxEmail = async (emailAddress = '') => {
	if (typeof emailAddress !== 'string') return false;

	emailAddress = emailAddress.toLowerCase();

	if (!isValidRegexEmail(emailAddress)) return false;

	const [, domain] = emailAddress.split('@');
	const {
		isValid,
		addresses = [],
		isGoogle,
	} = await resolveDNS({
		type: 'mx',
		value: domain,
	});

	const hasAddress = addresses.every(({ exchange }) => !!exchange);
	if (!hasAddress) return false;

	return { isValid, isGoogle };
};

router.post('/auth-key', async function (req, res) {
	let email = req?.body?.email?.trim() || 'unknown';
	if (email === '' || email === 'unknown') {
		if (req?.body?.username && req.body.username != '') {
			email = req.body.username.trim();
		} else {
			res.json({ bad_email: false, url: req.url, message: 'no email' });
		}
	}

	const getUserParam = () => {
		return {
			UserPoolId: USERPOOLID,
			AttributesToGet: [],
			Filter: 'email = "' + email + '"',
			Limit: 1,
		};
	};
	if (email !== '' && req.body.password.trim() !== '') {
		console.log(getUserParam());
		const resp = await cognitoidentityserviceprovider.listUsers(getUserParam()).promise();
		const users = resp['Users'];
		const user = users[0];

		console.log('resp', resp);

		var params = {
			AuthFlow: 'ADMIN_NO_SRP_AUTH',
			ClientId: process.env.clientId,
			UserPoolId: userPoolId,
			AuthParameters: {
				USERNAME: user.Username,
				PASSWORD: req.body.password.trim(),
			},
		};
		console.log('params - ', params);
		await cognitoidentityserviceprovider.adminInitiateAuth(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
				res.json({ url: req.url, success: false, message: err });
			} // an error occurred
			else {
				console.log('data', data);
				res.json({ auth_key: user.Username, url: req.url, success: true, access: user.Username });
			} // successful response
		});
	} else {
		res.json({ auth_key: '', url: req.url, success: false, message: 'username and password missing' });
	}
});

let deCodeURLVal = (str) => {
	return decodeURIComponent((str + '').replace(/\+/g, '%20'));
};
let getParamsFromBase64EncodedPOSTParams = (input = '') => {
	let output = {};
	// Decode the base64
	console.log(String(input));

	// Split the params by "&"
	let params = String(input).split('&');
	// Turn the params into an object and url decode the values
	params.forEach((keyAndValue) => {
		let keyValueArray = keyAndValue.split('=');
		let key = keyValueArray[0];
		console.log('key', keyValueArray[0]);
		let value = keyValueArray[1];
		console.log('value', keyValueArray[1]);

		output[key] = deCodeURLVal(value);
	});
	return output;
};
router.post('/auth-sumo', async function (req, res) {
	//console.log('request body ',req.body);
	//let userPass = getParamsFromBase64EncodedPOSTParams(req.body);
	//let keys = Object.keys(userPass);
	//console.log('userPass',keys);

	let email = req.body.username || 'unknown';
	if (email === '' || email === 'unknown') {
		res.json({ bad_email: false, url: req.url, message: 'no email' });
	}

	const getUserParam = () => {
		return {
			UserPoolId: USERPOOLID,
			AttributesToGet: [],
			Filter: 'email = "' + email + '"',
			Limit: 1,
		};
	};
	if (email !== '' && req.body.password.trim() !== '') {
		console.log(getUserParam());
		const resp = await cognitoidentityserviceprovider.listUsers(getUserParam()).promise();
		const users = resp['Users'];
		const user = users[0];

		console.log('resp', resp);

		var params = {
			AuthFlow: 'ADMIN_NO_SRP_AUTH',
			ClientId: process.env.clientId,
			UserPoolId: userPoolId,
			AuthParameters: {
				USERNAME: user.Username,
				PASSWORD: req.body.password.trim(),
			},
		};
		console.log('params - ', params);
		await cognitoidentityserviceprovider.adminInitiateAuth(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
				res.json({ url: req.url, success: false, message: err });
			} // an error occurred
			else {
				console.log('data', data);
				res.json({ access: user.Username });
			} // successful response
		});
	} else {
		res.json({ auth_key: '', url: req.url, success: false, message: 'username and password missing' });
	}
});

router.post('/verify-email', async function (req, res) {
	let code = '';
	let email = '';
	if (req.body?.token && req.body.token !== '') {
		code = req.body.token.trim();
	}
	if (req.body?.email && req.body.email !== '') {
		email = req.body.email.trim();
	}
	if (code.length > 1 && code.length < 200 && email.length > 1 && email.length < 2000) {
		const getUserParam = () => {
			return {
				UserPoolId: USERPOOLID,
				Filter: 'email = "' + email + '"',
				Limit: 1,
			};
		};
		const getUserParams = getUserParam();
		console.log('user lookup - ', getUserParams);
		try {
			const resp = await cognitoidentityserviceprovider.listUsers(getUserParams).promise();
			console.log('resp - ', resp);
			console.log('Users[0] - ', resp['Users'][0]);
			const user = resp['Users'][0];
			const token_found = user?.Attributes?.find((attr) => attr?.Name === 'custom:temp_code')?.Value;
			const d1 = new Date();
			const nowtime = d1.getTime();

			if (token_found === code) {
				const update_params = {
					UserAttributes: [
						/* required */
						{
							Name: 'custom:verificationdate' /* required */,
							Value: nowtime.toString(),
						},
						/* more items */
					],
					UserPoolId: userPoolId /* required */,
					Username: user.Username /* required */,
				};
				const resp_verify = await cognitoidentityserviceprovider.adminUpdateUserAttributes(update_params).promise();
				console.log('resp_verify - ', resp_verify);
				res.json({ bad_code: false, url: req.url, message: 'verified' });
			} else {
				res.json({ bad_code: true, url: req.url, message: 'not found/mismatch' });
			}
		} catch (e) {
			console.log('error', e);
			res.json({ bad_code: true, url: req.url, message: 'error during lookup' });
			return;
		}
	} else {
		res.json({ bad_code: true, url: req.url, message: 'no code' });
	}
});

router.post('/resend-email-verification', async function (req, res) {
	console.log('-resend- req - ', req);
	console.log('-resend- req body - ', req.body);
	const email = req.body.email?.trim() || 'unknown';
	if (email === '' || email === 'unknown') {
		res.json({ bad_email: true, url: req.url, message: 'no email' });
		return;
	}
	const getUserParam = () => {
		return {
			UserPoolId: USERPOOLID,
			Filter: 'email = "' + email + '"',
			Limit: 1,
		};
	};
	const getUserParams = getUserParam();
	try {
		const resp = await cognitoidentityserviceprovider.listUsers(getUserParams).promise();

		const user = resp['Users'][0];
		let fname = user?.Attributes?.find((attr) => attr?.Name === 'given_name')?.Value;
		let lname = user?.Attributes?.find((attr) => attr?.Name === 'family_name')?.Value;
		let company = user?.Attributes?.find((attr) => attr?.Name === 'name')?.Value;
		let token = user?.Attributes?.find((attr) => attr?.Name === 'custom:temp_code')?.Value;
		let lastsent = user?.Attributes?.find((attr) => attr?.Name === 'custom:veriflastsent')?.Value;

		if (token === undefined || token === '') {
			const new_token = makeid(8);
			const update_params = {
				UserAttributes: [
					/* required */
					{
						Name: 'custom:temp_code' /* required */,
						Value: new_token,
					},
					/* more items */
				],
				UserPoolId: userPoolId /* required */,
				Username: user.Username /* required */,
			};
			const resp_verify = await cognitoidentityserviceprovider.adminUpdateUserAttributes(update_params).promise();
			token = new_token;
		}

		let send = true;
		let now = new Date();
		let now_int = now.getTime();
		if (lastsent !== undefined && lastsent != '' && parseInt(lastsent)) {
			if (parseInt(lastsent) + 60000 >= now_int) {
				send = false;
				console.log('cooldown', parseInt(lastsent), now_int);
			}
		}
		let sendgrid_data = {
			from: { email: 'koko@nymblr.com' },
			personalizations: [
				{
					to: [{ email: email }],
					dynamic_template_data: {
						fname: fname,
						lname: lname,
						company: company,
						token: token,
						verify_url: 'https://nymblr.mysalesapplication.com/verify-email?token=' + token + '&email=' + encodeURIComponent(email),
					},
				},
			],
			template_id: 'd-c2fd681ce6c44fd69b2749cd89ba745c',
		};
		let sendgrid_url = 'https://api.sendgrid.com/v3/mail/send';
		console.log('sendgrid call - ', sendgrid_data);

		now_int = now.getTime();
		if (send) {
			let sendgrid_response = await axios.post(sendgrid_url, sendgrid_data, {
				headers: { Authorization: 'Bearer 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', 'Content-Type': 'application/json' },
			});
			const update_params = {
				UserAttributes: [
					/* required */
					{
						Name: 'custom:veriflastsent' /* required */,
						Value: now_int.toString(),
					},
					/* more items */
				],
				UserPoolId: userPoolId /* required */,
				Username: user.Username /* required */,
			};
			const resp_verify = await cognitoidentityserviceprovider.adminUpdateUserAttributes(update_params).promise();
			res.json({ bad_email: false, url: req.url, message: 'sent' });
		} else {
			res.json({ bad_email: false, url: req.url, message: 'not sent' });
		}
	} catch (e) {
		console.log('error', e);

		res.json({ bad_email: true, url: req.url, message: 'error during lookup' });
		return;
	}
});

router.post('/register-email', async function (req, res) {
	// Add your code here
	console.log('-register- req - ', req);
	console.log('-register- req body - ', req.body);

	const email = req.body.email?.trim() || 'unknown';
	if (email === '' || email === 'unknown') {
		res.json({ bad_email: false, url: req.url, message: 'no email' });
	}

	const getUserParam = () => {
		return {
			UserPoolId: USERPOOLID,
			AttributesToGet: [],
			Filter: 'email = "' + email + '"',
			Limit: 1,
		};
	};
	const getUserParams = getUserParam();
	let bad_email = true;
	let message = '';
	let email_status_code = 999;
	let email_status = '';
	try {
		const resp = await cognitoidentityserviceprovider.listUsers(getUserParams).promise();
		console.log('resp', resp);
		if (resp['Users'].length <= 0) {
			bad_email = false;
			message = message + ' email not found';
		} else if (resp['Users'].length > 0) {
			message = message + ' email exists';
			bad_email = true;
			res.json({ bad_email: bad_email, url: req.url, message: message });
			return;
		} else {
			message = message + ' unable to do initial lookup';
			bad_email = true;
			res.json({ bad_email: bad_email, url: req.url, message: message });
			return;
		}
	} catch (e) {
		console.log('error', e);
		bad_email = true;
		res.json({ bad_email: bad_email, url: req.url, message: message });
		return;
	}

	const emailEncoded = encodeURIComponent(email.trim());
	//let url = `https://api.towerdata.com/v5/ev?api_key=${atdata_api_key}&email=${emailEncoded}`;
	//let url = `https://api.debounce.io/v1/?api=64011b8541ef2&email=${emailEncoded}`;
	let url = `https://api.neverbounce.com/v4/single/check?key=private_7dc5c92ceccdd3e270fd063a5b7957ef&email=${emailEncoded}`;

	console.log('atdataVerifyEmail - ', { emailEncoded, url });
	let response;
	try {
		response = await axios.get(url);
		console.log('atdataVerifyEmail - success - ', response.data);
		//if (response.data.email_validation.status === "valid" || response.data.email_validation.status === "unverifiable" || response.data.email_validation.status_code == 20 ){
		//if (response.data.debounce.code === "4" || response.data.debounce.code === "5" || response.data.debounce.code === "7" || response.data.debounce.code === "8" ){
		if (response.data.result !== 'invalid' && response.data.result !== 'disposable') {
			email_status = response.data.result;
			email_status_code = response.data.result;
			bad_email = false;

			//message = message +' statusok '+email_status+' '+email_status_code;
			message = message + ' statusok ';
		} else {
			bad_email = true;
		}
	} catch (err) {
		console.log('atdataVerifyEmail - error - ', err);
		res.json({ bad_email: false, url: req.url, message: 'unable to validate email' });
		return;
	}
	let mxlookup = {};
	mxlookup.isGoogle = '';
	if (email_status_code === 45) {
		mxlookup = await isValidMxEmail(email);
		console.log(mxlookup);
		message = message + mxlookup.isGoogle;
	}

	if (!bad_email || mxlookup.isGoogle) {
		let password = makeid(8);
		let token = password;
		let group_id = makeid(8);
		let fname = 'First Name';
		let lname = 'Last Name';
		let company = 'Company Name';
		if (req.body?.fname && req.body.fname !== '') {
			fname = req.body.fname;
		}
		if (req.body?.lname && req.body.lname !== '') {
			lname = req.body.lname;
		}
		if (req.body?.companyName && req.body.companyName !== '') {
			company = req.body.companyName;
		}
		if (req.body?.password && req.body.password !== '') {
			password = req.body.password;
		}
		let is_google = mxlookup.isGoogle || false;

		let params = {
			ClientId: process.env.clientId /* required */,
			Password: password /* required */,
			Username: email.trim().toLowerCase() /* required */,
			UserAttributes: [
				{
					Name: 'name' /* required */,
					Value: group_id,
				},
				{
					Name: 'email' /* required */,
					Value: email.trim().toLowerCase(),
				},
				{
					Name: 'custom:created_at' /* required */,
					Value: (+new Date()).toString(),
				},
				{
					Name: 'custom:group_name' /* required */,
					Value: group_id,
				},
				{
					Name: 'custom:account_type' /* required */,
					Value: 'Trial',
				},
				{
					Name: 'given_name' /* required */,
					Value: fname || 'First Name',
				},
				{
					Name: 'family_name' /* required */,
					Value: lname,
				},
				{
					Name: 'phone_number' /* required */,
					Value: '+11231231234',
				},
				{
					Name: 'custom:temp_code' /* required */,
					Value: token,
				},
				{
					Name: 'custom:email_status_code' /* required */,
					Value: email_status_code.toString(),
				},
				{
					Name: 'custom:email_google' /* required */,
					Value: is_google.toString(),
				},
				{
					Name: 'custom:company' /* required */,
					Value: company,
				},
				{
					Name: 'custom:country' /* required */,
					Value: 'US',
				},
				{
					Name: 'custom:has_api' /* required */,
					Value: '1',
				},

				/* more items */
			],
		};
		console.log('coginto setup -', params);
		try {
			const signup_resp = await cognitoidentityserviceprovider.signUp(params).promise();
			console.log('cognito - response - ', signup_resp);
			if (signup_resp?.UserSub || false) {
				//start sendgrid
				//https://api.sendgrid.com/v3/mail/send
				//Authorization: Bearer <<YOUR_API_KEY>>
				//Content-Type: application/json
				// Data {"from":{"email":"email@email.com"},"personalizations":[{"to":[{"email":"email@email"}],"dynamic_template_data":{},"template_id":"[template_id]"}

				let sendgrid_data = {
					from: { email: 'koko@nymblr.com' },
					personalizations: [
						{
							to: [{ email: email }],
							dynamic_template_data: {
								fname: fname,
								lname: lname,
								company: company,
								token: token,
								verify_url: 'https://nymblr.mysalesapplication.com/verify-email?token=' + token + '&email=' + encodeURIComponent(email),
							},
						},
					],
					template_id: 'd-c2fd681ce6c44fd69b2749cd89ba745c',
				};
				let sendgrid_url = 'https://api.sendgrid.com/v3/mail/send';
				let sendgrid_response = await axios.post(sendgrid_url, sendgrid_data, {
					headers: {
						Authorization: 'Bearer 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',
						'Content-Type': 'application/json',
					},
				});
				console.log(sendgrid_response);
				let now = new Date();
				let now_int = now.getTime();
				const update_params = {
					UserAttributes: [
						/* required */
						{
							Name: 'custom:veriflastsent' /* required */,
							Value: now_int.toString(),
						},
						/* more items */
					],
					UserPoolId: userPoolId /* required */,
					Username: user.Username /* required */,
				};
				const resp_verify = await cognitoidentityserviceprovider.adminUpdateUserAttributes(update_params).promise();
				res.json({ bad_email: bad_email, url: req.url });
				return;
			} else {
				res.json({ bad_email: bad_email, url: req.url, message: ' cognito error' });
				return;
			}
		} catch (e) {
			console.log('cognito - error - ', e);
			res.json({ bad_email: true, url: req.url, message: ' cognito - unable to create user' });
			return;
		}
	} else {
		res.json({ bad_email: bad_email, url: req.url, message: message });
		return;
	}
});

router.post('/register-email/*', function (req, res) {
	// Add your code here

	res.json({ bad_email: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

router.put('/register-email', function (req, res) {
	// Add your code here

	res.json({ bad_email: 'put call succeed!', url: req.url, body: req.body });
});

router.put('/register-email/*', function (req, res) {
	// Add your code here

	res.json({ bad_email: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

router.delete('/register-email', function (req, res) {
	// Add your code here

	res.json({ bad_email: 'delete call succeed!', url: req.url });
});

router.delete('/register-email/*', function (req, res) {
	// Add your code here

	res.json({ bad_email: 'delete call succeed!', url: req.url });
});

module.exports = router;

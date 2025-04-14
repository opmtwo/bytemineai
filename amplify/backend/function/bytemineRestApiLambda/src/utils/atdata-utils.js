const axios = require('axios');
const rax = require('retry-axios');

const { AT_DATA_API_KEY } = process.env;

const atDataResponseCodes = {
	5: { status: 'unknown', code: 5, description: `Timeout. Did not get a response in time` },
	10: { status: 'unknown', code: 10, description: `Syntax OK` },
	20: { status: 'unknown', code: 20, description: `Syntax OK and the domain is valid` },
	45: { status: 'unverifiable', code: 45, description: `Domain is a catch all and does not support validation` },
	50: { status: 'valid', code: 50, description: `Valid email address` },
	100: { status: 'invalid', code: 100, description: `General syntax error` },
	110: { status: 'invalid', code: 110, description: `Invalid character in address` },
	115: { status: 'invalid', code: 115, description: `Invalid domain syntax` },
	120: { status: 'invalid', code: 120, description: `Invalid username syntax` },
	125: { status: 'invalid', code: 125, description: `Invalid username syntax for that domain` },
	130: { status: 'invalid', code: 130, description: `Address is too long` },
	135: { status: 'invalid', code: 135, description: `Address has unbalanced parentheses` },
	140: { status: 'invalid', code: 140, description: `Address doesn’t have a username` },
	145: { status: 'invalid', code: 145, description: `Address doesn’t have a domain` },
	150: { status: 'invalid', code: 150, description: `Address doesn’t have an @ sign` },
	155: { status: 'invalid', code: 155, description: `Address has more than one @ sign` },
	200: { status: 'invalid', code: 200, description: `Invalid top-level domain (TLD) in address` },
	205: { status: 'invalid', code: 205, description: `IP address is not allowed as a domain` },
	210: { status: 'invalid', code: 210, description: `Address contains an extra space or character` },
	215: { status: 'invalid', code: 215, description: `Unquoted spaces not allowed in email addresses` },
	310: { status: 'invalid', code: 310, description: `Domain doesn’t exist` },
	315: { status: 'invalid', code: 315, description: `Domain doesn’t have a valid IP address` },
	325: { status: 'invalid', code: 325, description: `Domain can’t receive email` },
	400: { status: 'invalid', code: 400, description: `Mailbox doesn't exist` },
	410: { status: 'invalid', code: 410, description: `The mailbox is full and can’t receive email` },
	420: { status: 'invalid', code: 420, description: `Mail isn't accepted for this domain` },
	500: { status: 'invalid', code: 500, description: `Emails with that username aren’t accepted` },
	505: { status: 'invalid', code: 505, description: `Emails with that domain aren’t accepted` },
	510: { status: 'invalid', code: 510, description: `That address isn’t accepted` },
	520: { status: 'invalid', code: 520, description: `Address matched to known bouncers (optional feature)` },
	525: { status: 'risky', code: 525, description: `Address is a spamtrap, a known complainer or is suppressed` },
	530: { status: 'risky', code: 530, description: `Address has opted out from commercial email` },
	999: { status: 'unknown', code: 999, description: `System error` },
};

/**
 * @summary
 * Verify an email address using AtData API
 *
 * @see
 * https://docs.atdata.com/?javascript#email-validation-introduction
 *
 * @param {string} email The request email address to verify
 * @returns {Mixed} AtData response object on success else undefined
 */
const atDataVerifyEmail = async (email = false) =>
	new Promise(async (resolve, reject) => {
		console.log('atdataVerifyEmail - email -', email);
		if (!email?.trim()?.length) {
			console.log('atdataVerifyEmail - error - email is required');
			return reject({ message: 'Email is required' });
		}
		const emailEncoded = encodeURIComponent(email.trim());
		const url = `https://api.towerdata.com/v5/ev?api_key=${AT_DATA_API_KEY}&email=${emailEncoded}`;
		console.log('atdataVerifyEmail - ', { emailEncoded, url });
		let response;
		try {
			response = await axios.get(url);
			console.log('atdataVerifyEmail - success - ', response.data);
			return resolve(response.data);
		} catch (err) {
			console.log('atdataVerifyEmail - error - ', err);
			return reject(err);
		}
	});

/**
 * @summary Verifies the email address using the AtData API
 *
 * @see https://docs.atdata.com/?javascript#email-validation-introduction
 *
 * @description
 * This function verifies an email address by making a request to the AtData API and processes the response to return
 * detailed email validation results. It includes retries on errors and a timeout configuration.
 *
 * @param {string} email The email address to verify
 * @param {boolean} shouldReturnError Whether to return the error response (defaults to false)
 * @returns {Object|undefined} The validation data on success or undefined (or error if shouldReturnError is true)
 */
const atDataVerifyEmailAddress = async (email, shouldReturnError = false) => {
	// Early return if the email is empty or invalid
	if (!email?.trim()) return;

	// Encode the email to be URL-safe
	const emailEncoded = encodeURIComponent(email.trim());

	// Construct the API URL with the encoded email and the API key
	const url = `https://api.towerdata.com/v5/ev?api_key=${AT_DATA_API_KEY}&email=${emailEncoded}`;

	// Configure retry logic and request timeout settings
	const config = {
		raxConfig: {
			retry: 16, // Number of retries on 4xx or 5xx errors
			noResponseRetries: 8, // Number of retries on connection errors
			onRetryAttempt: (err) => {
				// Log each retry attempt for tracking
				const cfg = rax.getConfig(err);
				console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
			},
		},
		timeout: 500, // Timeout for the request (in ms)
	};

	try {
		// Attach request interceptor to handle retries
		const interceptorId = rax.attach();

		// Send the request to the AtData API and get the response data
		const { data } = await axios.post(url, config);

		console.log('verifyEmailAddress - success:', data);

		// If the response contains a result, set custom validation codes based on the result
		if (data?.result) {
			switch (data.result) {
				case 'valid': // Email is valid
					data.code = '5';
					break;
				case 'catchall': // Email domain is catch-all
					data.code = '4';
					break;
				default: // Other cases (invalid or undetermined)
					data.code = '6';
					break;
			}
		}

		// Return the validated data
		return data;
	} catch (err) {
		// Log any error that occurs during the request
		console.log('verifyEmailAddress - error:', err);

		// If shouldReturnError is true, return the error object
		if (shouldReturnError) {
			return err;
		}
	}
};

/**
 * @summary Verifies the email address of a contact using AtData API
 *
 * @description
 * This function verifies the `contactEmail` field in the provided contact data and updates the contact data with
 * the email validation status code and domain type returned by the AtData API. It also marks the email as verified.
 *
 * @param {Object} contactData The contact object containing email information to verify
 * @param {string} contactData.contactEmail The email address of the contact to verify
 * @returns {Object} Updated contact data with verification details and `isEmailVerified` flag set to true
 */
const atDataVerifyEmailAccounts = async (contactData) => {
	let response;

	// Check if contactEmail exists and needs to be verified
	if (contactData?.contactEmail) {
		// Verify the email address using the AtData API
		response = await verifyEmailAddress(contactData.contactEmail);

		// If the response contains valid email validation data, update the contactData object
		if (response?.email_validation?.status_code) {
			contactData.contactEmailStatusCode = response.email_validation.status_code;
			contactData.contactEmailDomainType = response.email_validation.domain_type;
		}
	}

	// Mark the email as verified in the contact data
	contactData.isEmailVerified = true;

	// Return the updated contact data
	return contactData;
};

module.exports = {
	atDataResponseCodes,
	atdataVerifyEmail,
	atdataVerifyEmailAddress,
	atdataVerifyEmailAccounts,
};

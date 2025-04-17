const { AT_DATA_API_KEY } = process.env;

const atDataResponseCodes = {
	5: { status: 'unknown', code: 5, description: `Timeout. Did not get a response in time.` },
	10: { status: 'unknown', code: 10, description: `Syntax OK.` },
	20: { status: 'unknown', code: 20, description: `Syntax OK and the domain is valid.` },
	45: { status: 'unverifiable', code: 45, description: `Domain is a catch-all and does not support validation.` },
	50: { status: 'safetosend', code: 50, description: `Valid and guaranteed SafeToSend email address.` },
	100: { status: 'invalid', code: 100, description: `General syntax error.` },
	110: { status: 'invalid', code: 110, description: `Invalid character in address.` },
	115: { status: 'invalid', code: 115, description: `Invalid domain syntax.` },
	120: { status: 'invalid', code: 120, description: `Invalid username syntax.` },
	125: { status: 'invalid', code: 125, description: `Invalid username syntax for that domain.` },
	130: { status: 'invalid', code: 130, description: `The address is too long.` },
	140: { status: 'invalid', code: 140, description: `Address doesn’t have a username.` },
	145: { status: 'invalid', code: 145, description: `Address doesn’t have a domain.` },
	150: { status: 'invalid', code: 150, description: `Address doesn’t have an @ sign.` },
	155: { status: 'invalid', code: 155, description: `Address has more than one @ sign.` },
	200: { status: 'invalid', code: 200, description: `Invalid top-level domain (TLD) in address.` },
	210: { status: 'invalid', code: 210, description: `The address contains an extra space or character.` },
	215: { status: 'invalid', code: 215, description: `Unquoted spaces not allowed in email addresses.` },
	310: { status: 'invalid', code: 310, description: `Domain doesn’t exist.` },
	325: { status: 'invalid', code: 325, description: `Domain can’t receive email.` },
	400: { status: 'invalid', code: 400, description: `Mailbox doesn’t exist.` },
	410: { status: 'invalid', code: 410, description: `The mailbox is full and can’t receive email.` },
	420: { status: 'invalid', code: 420, description: `Mail isn’t accepted for this domain.` },
	500: { status: 'invalid', code: 500, description: `Emails with that username aren’t accepted.` },
	505: { status: 'invalid', code: 505, description: `Emails with that domain aren’t accepted.` },
	510: { status: 'invalid', code: 510, description: `That address isn’t accepted.` },
	520: { status: 'invalid', code: 520, description: `The address matched to known bouncers.` },
	525: { status: 'trap', code: 525, description: `Address is a spam trap or is suppressed.` },
	530: { status: 'trap', code: 530, description: `Address has opted out from commercial email.` },
	535: { status: 'trap', code: 535, description: `Address is on ANA\'s "Do Not Email List".` },
	540: { status: 'trap', code: 540, description: `Address belongs to a known or frequent complainer.` },
	999: { status: 'unknown', code: 999, description: `System error occurred.` },
};

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
	if (!email?.trim()) return;

	const emailEncoded = encodeURIComponent(email.trim());
	const url = `https://api.towerdata.com/v5/ev?api_key=${AT_DATA_API_KEY}&email=${emailEncoded}`;

	const maxRetries = 16;
	const retryDelay = 500; // ms
	let attempt = 0;

	while (attempt <= maxRetries) {
		try {
			const response = await fetch(url, {
				method: 'POST',
				// timeout: 500, // in Node.js v22+, fetch includes timeout natively
			});

			if (!response.ok) {
				throw new Error(`HTTP error ${response.status}`);
			}

			const data = await response.json();

			/*
			SAMPLE
			safe_to_send: {
				domain_type: 'freeisp',
				status_code: 50,
				address: 'onepunchmantwo@gmail.com',
				engagement: 2,
				status: 'safetosend'
			}
			*/

			console.log('verifyEmailAddress - success:', data);

			if (data?.result) {
				switch (data.result) {
					case 'valid':
						data.code = '5';
						break;
					case 'catchall':
						data.code = '4';
						break;
					default:
						data.code = '6';
						break;
				}
			}

			if (data?.safe_to_send?.status_code) {
				const code = parseInt(data.safe_to_send.status_code);
				data.safe_to_send.status_info = atDataResponseCodes[code];
			}

			return data;
		} catch (err) {
			attempt++;
			console.log(`Retry attempt #${attempt} - error:`, err.message);

			const isLastAttempt = attempt > maxRetries;
			const isRetryable = err.name === 'FetchError' || err.message.includes('timeout') || err.message.includes('network');

			if (isLastAttempt || !isRetryable) {
				if (shouldReturnError) {
					return err;
				}
				break;
			}

			// Wait before retrying
			await new Promise((resolve) => setTimeout(resolve, retryDelay));
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
	let contact = { ...contactData };

	// Check if contactEmail exists and needs to be verified
	if (contactData?.contactEmail) {
		// Verify the email address using the AtData API
		response = await atDataVerifyEmailAddress(contact.contactEmail);

		// If the response contains valid email validation data, update the contactData object
		if (response?.safe_to_send?.status_code) {
			contact.contactEmailStatusCode = response.safe_to_send.status_code;
			contact.contactEmailDomainType = response.safe_to_send.domain_type;
		}

		/*if (response?.debounce?.code) {
			contact.contactEmailStatusCode = response.debounce.code;
			contact.contactEmailDomainType = response.debounce.reason;
		}*/
		/*
		if (response?.code) {
			contact.contactEmailStatusCode = response.code;
			contact.contactEmailDomainType = response.result;
		}*/
	}

	// verify personal email
	//if (contact?.personalEmail) {
	//	response = await verifyEmailAddress(contact.personalEmail);
	//	if (response?.email_validation?.status_code) {
	//		contact.personalEmailStatusCode = response.email_validation.status_code;
	//		contact.personalEmailDomainType = response.email_validation.domain_type;
	//	}
	/*if (response?.debounce?.code) {
        contact.personalEmailStatusCode = response.debounce.code;
        contact.personalEmailDomainType = response.debounce.reason;
    }
    if (response?.code) {
        contact.personalEmailStatusCode = response.code;
        contact.personalEmailDomainType = response.result;
    }*/
	//}

	// verify contact personal email
	/*
	if (contact?.contactPersonalEmail) {
		response = await verifyEmailAddress(contact.contactPersonalEmail);
		/*if (response?.email_validation?.status_code) {
			contact.contactPersonalEmailStatusCode = response.email_validation.status_code;
			contact.contactPersonalEmailDomainType = response.email_validation.domain_type;
		}*/
	/*if (response?.debounce?.code) {
        contact.contactPersonalEmailStatusCode = response.debounce.code;
        contact.contactPersonalEmailDomainType = response.debounce.reason;
    }*/ /*
		if (response?.code) {
			contact.contactPersonalEmailStatusCode = response.code;
			contact.contactPersonalEmailDomainType = response.result;
		}
	}*/

	// Mark the email as verified in the contact data
	contact.isEmailVerified = true;

	// Return the updated contact data
	return contact;
};

module.exports = {
	atDataResponseCodes,
	atDataVerifyEmailAddress,
	atDataVerifyEmailAccounts,
};

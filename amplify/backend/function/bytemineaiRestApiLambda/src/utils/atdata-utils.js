const axios = require('axios');
const { AT_DATA_API_KEY } = process.env;

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
const atdataVerifyEmail = async (email = false) =>
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

module.exports = {
	atdataVerifyEmail,
};

const { Router } = require('express');
const { atDataVerifyEmail } = require('../utils/atdata-utils');

const router = Router();

router.post('/availability', async (req, res) => {
	const { email } = req.body;
	const response = await atDataVerifyEmail(email);
	console.log(response);
	console.log(response.safe_to_send.status);

	const specialChars = /[+]/;
	if (
		!specialChars.test(email) &&
		(response.safe_to_send.status === 'valid' ||
			response.safe_to_send.status === 'unverifiable' ||
			response.safe_to_send.status === 'safetosend' ||
			response.safe_to_send.status_code == 10 ||
			response.safe_to_send.status_code == 20 ||
			response.safe_to_send.status_code == 45 ||
			response.safe_to_send.status_code == 50)
	) {
		return res.status(200).json({ status: 'valid' });
	} else {
		return res.status(200).json({ status: 'invalid' });
	}
});

module.exports = router;

const { Router } = require('express');
const { atdataVerifyEmailAddress, atDataResponseCodes } = require('../utils/atdata-utils');

const router = Router();

router.get('/email', async (req, res) => {
	// Extract email from query parameters
	const { email } = req.query;

	// Check if email is provided, return error if not
	if (!email) {
		return res.json({ message: 'Email is required' }).status(422);
	}

	// Verify email address using external service
	const response = await atdataVerifyEmailAddress(email, true);

	// Handle potential errors from the email verification service
	if (response instanceof Error === true) {
		return res
			.json({
				message: response?.response?.data?.message || response?.response?.statusText || genericErrorMessage,
			})
			.status(response?.response?.status || 400);
	}

	// Update usage statistics
	await addUsage(body.groupId, currentUserId || token, 1);

	// Extract email validation details from response
	const { email_validation } = response;
	const { status_code } = response || {};

	// Format validation response with additional status description
	const validationResponse = {
		...email_validation,
		status_description: atDataResponseCodes[status_code]?.description || '',
	};

	// Return the validation response
	return res.json(validationResponse);
});

module.exports = router;

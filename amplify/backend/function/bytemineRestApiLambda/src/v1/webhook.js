const { Request, Response, Router } = require('express');
const Stripe = require('stripe');
const moment = require('moment/moment');

const { updateBytemineSub } = require('../graphql/mutations');
const { apsGql } = require('../utils/aps-utils');
const { safeJsonDecode } = require('../utils/helper-utils');
const { idpAdminGetUser } = require('../utils/idp-utils');
const { stripeGetCustomer, stripeGetSubscription, stripeSetDefaultPaymentMethod, stripeDeleteSubscription } = require('../utils/stripe-utils');
const { getBytemineUser, listSubByTeamId } = require('../graphql/queries');

const { AUTH_BYTEMINEF573E062_USERPOOLID: USERPOOLID } = process.env;

// const overachieveTrialHtml = require('./templates/free-trial-html');
// const overachieveTrialText = require('./templates/free-trial-text');
const router = Router();

router.post('/', async (req, res) => {
	// log request body
	console.log('Request body ', JSON.stringify(req.body, null, 2));

	// parse payload
	let body;
	try {
		body = safeJsonDecode(req.body);
		console.log('Testing payload json', body.type);
	} catch (err) {
		console.log('Error trying to parse incoming request as json - trying to load json directly', err);
		body = req.body;
	}

	// Stripe event data
	const stripeEvent = body.data?.object || {};
	const stripeEventType = body.type;
	const stripeCancancellation = stripeEvent?.cancellation_details?.reason;

	// -------------------------------------------------------------------------
	// Start
	// -------------------------------------------------------------------------

	// //need to move this to a variable sometime
	// const stripe = require('stripe')('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');
	// const stripe_webhook_key = 'whsec_5CSSRrok8vSyODxiSad5MEIjIKtXdT0f';
	// const stripeEvent = stripe.webhooks.constructEvent(event.body, event.headers['Stripe-Signature'], stripe_webhook_key);

	const now = moment();
	console.log(JSON.stringify({ now, stripeEvent }));

	// get subscription id
	let subscriptionId = stripeEvent?.['subscription'];

	// subscription created
	if (!subscriptionId && stripeEventType === 'customer.subscription.created') {
		subscriptionId = stripeEvent?.id;
	}

	// subscription updated
	if (!subscriptionId && stripeEventType === 'customer.subscription.updated') {
		subscriptionId = stripeEvent?.id;
	}

	// subscription deleted
	if (!subscriptionId && stripeEventType === 'customer.subscription.deleted') {
		subscriptionId = stripeEvent?.id;
	}

	// invoice.paid
	if (!subscriptionId && stripeEventType === 'invoice.paid') {
		subscriptionId = stripeEvent?.parent?.subscription_details?.subscription;
	}

	// get customer id
	let customer;
	const customerId = stripeEvent?.['customer'];
	console.log({ customerId });

	// get price id
	const priceId = stripeEvent?.['lines']?.['data']?.[0]?.['plan']?.id || stripeEvent?.['lines']?.['data']?.[0]?.['pricing']?.price_details?.price;
	console.log({ priceId });

	// subscription id is required
	if (!subscriptionId) {
		console.log('Subscription ID not found - bail - ', subscriptionId);
		return res.status(200).json({});
	}

	// customer id is required
	if (!customerId) {
		console.log('Customer ID not found - bail - ', customerId);
		return res.status(200).json({});
	}

	// get email address
	let userEmail =
		stripeEvent.metadata?.email ||
		stripeEvent.customer_email ||
		stripeEvent.receipt_email ||
		stripeEvent.billing_details?.email ||
		stripeEvent.customer_details?.email;

	// Fetch user email from stripe customer
	if (!userEmail) {
		customer = await stripeGetCustomer(customerId);
		userEmail = customer?.email;
	}

	const userEmailClean = userEmail?.toLowerCase().trim();
	console.log(JSON.stringify({ userEmailClean }));

	// User email not found?
	if (!userEmailClean) {
		console.log('User email not found - skipping', JSON.stringify({ userEmail, userEmailClean, stripeEvent }));
		return res.json({});
	}

	// get cognito user
	const userCognito = await idpAdminGetUser(USERPOOLID, userEmailClean);
	console.log(JSON.stringify({ userCognito }));

	// Cognito username
	const userSub = userCognito.Username;
	console.log(JSON.stringify({ userSub }));

	// Get user info
	const userInfo = await apsGql(getBytemineUser, { id: userSub }, 'data.getBytemineUser');
	console.log(JSON.stringify({ userInfo }));

	// User not found?
	if (!userInfo?.teamId) {
		console.log('User info not found - skipping', JSON.stringify(userInfo));
		return res.json({});
	}

	// Get stripe subscription model
	const subscriptionItems = await apsGql(listSubByTeamId, { teamId: userInfo.teamId }, 'data.listSubByTeamId.items');
	const subscriptionInfo = subscriptionItems?.[0];
	console.log(JSON.stringify({ subscriptionItems, subscriptionInfo }));

	// Subscription info not found?
	if (!subscriptionInfo?.id) {
		console.log('Subscription info not found - skipping', JSON.stringify(subscriptionItems));
		return res.json({});
	}

	// checkout.session.completed
	if (stripeEventType === 'checkout.session.completed') {
		const input = {
			id: subscriptionInfo.id,
			stripeCustomerId: customerId,
			stripeSubscriptionID: subscriptionId,
			subscriptionStatus: 'ActiveCustomer',
			firstPaid: now.toISOString(),
		};
		console.log('checkout.session.completed', JSON.stringify({ input }));

		const updatedSubscriptionInfo = await apsGql(updateBytemineSub, { input }, 'data.updateBytemineSub');
		console.log('All done - processed checkout.session.completed', JSON.stringify(updatedSubscriptionInfo));

		return res.json(updatedSubscriptionInfo);
	}

	// invoice.paid
	if (stripeEventType === 'invoice.paid') {
		let mainPlan;
		let mainQty = 0;
		let extraQty = 0;
		let monthlyCredit = 0;
		let annualCredit = 0;
		let quarterlyCredit = 0;

		let lines = stripeEvent.lines.data;
		console.log(JSON.stringify({ lines }));

		const parseLine = (item, index, arr) => {
			console.log(JSON.stringify({ item, index }));

			const itemPriceId = item?.price?.id || item?.pricing?.price_details?.price;
			console.log({ itemPriceId });

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4ebEsp66r6') {
				mainPlan = 'Monthly';
				mainQty = 1000;
				monthlyCredit = 1000;
				quarterlyCredit = 0;
				annualCredit = 0;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4ePWqXnWQ3') {
				mainPlan = 'Yearly';
				mainQty = 12000;
				monthlyCredit = 0;
				quarterlyCredit = 0;
				annualCredit = 12000;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eItv1ahpI') {
				mainPlan = 'Monthly';
				mainQty = 2500;
				monthlyCredit = 2500;
				quarterlyCredit = 0;
				annualCredit = 0;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eAY4rwsOF') {
				mainPlan = 'Yearly';
				mainQty = 30000;
				monthlyCredit = 0;
				quarterlyCredit = 0;
				annualCredit = 30000;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eEI0CbhUZ') {
				mainPlan = 'Monthly';
				mainQty = 7500;
				monthlyCredit = 7500;
				quarterlyCredit = 0;
				annualCredit = 0;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eG9yFwBNQ') {
				mainPlan = 'Yearly';
				mainQty = 90000;
				monthlyCredit = 0;
				quarterlyCredit = 0;
				annualCredit = 90000;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eEUzamNdQ') {
				mainPlan = 'Monthly';
				mainQty = 20000;
				monthlyCredit = 20000;
				quarterlyCredit = 0;
				annualCredit = 0;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eQL14r4I2') {
				mainPlan = 'Yearly';
				mainQty = 240000;
				monthlyCredit = 0;
				quarterlyCredit = 0;
				annualCredit = 240000;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eYMocuEBF') {
				mainPlan = 'Monthly';
				mainQty = 50000;
				monthlyCredit = 50000;
				quarterlyCredit = 0;
				annualCredit = 0;
			}

			if (itemPriceId === 'price_1RP5LUDsM2Cd0g4eVwbp22Gi') {
				mainPlan = 'Yearly';
				mainQty = 600000;
				monthlyCredit = 0;
				quarterlyCredit = 0;
				annualCredit = 600000;
			}

			console.log({ item, index, mainPlan, mainQty, monthlyCredit, quarterlyCredit, annualCredit });
		};
		lines.forEach(parseLine);

		const newCredits = parseInt(subscriptionInfo.currentCredits || '0') + monthlyCredit + annualCredit;
		console.log(JSON.stringify({ currentCredits: subscriptionInfo.currentCredits, monthlyCredit, annualCredit, newCredits }));

		const input = {
			id: subscriptionInfo.id,
			monthlyCredits: monthlyCredit,
			quarterlyCredits: quarterlyCredit,
			annualCredits: annualCredit,
			currentCredits: newCredits,
			subscriptionPeriod: mainPlan,
			lastPaid: now.toISOString(),
		};
		console.log('invoice.paid', JSON.stringify({ input }));

		const updatedSubscriptionInfo = await apsGql(updateBytemineSub, { input }, 'data.updateBytemineSub');
		console.log('All done - processed invoice.paid', JSON.stringify(updatedSubscriptionInfo));

		return res.json(updatedSubscriptionInfo);
	}

	// customer.subscription.deleted
	if (stripeEventType === 'customer.subscription.deleted') {
		const input = {
			id: subscriptionInfo.id,
			monthlyCredits: 0,
			quarterlyCredits: 0,
			annualCredits: 0,
			subscriptionPeriod: 'Monthly',
			subscriptionStatus: 'Trial',
		};
		console.log('customer.subscription.deleted', JSON.stringify({ input }));

		const updatedSubscriptionInfo = await apsGql(updateBytemineSub, { input }, 'data.updateBytemineSub');
		console.log('All done - processed customer.subscription.deleted', JSON.stringify(updatedSubscriptionInfo));

		return res.json(updatedSubscriptionInfo);
	}

	// customer.subscription.updated - cancel the subscription immediately
	if (stripeEventType === 'customer.subscription.updated' && stripeCancancellation === 'cancellation_requested') {
		try {
			await stripeDeleteSubscription(subscriptionId);
		} catch (err) {
			console.log('customer.subscription.updated - error', err);
		}
	}

	console.log('All done');
	return res.json({});

	// -------------------------------------------------------------------------
	// End
	// -------------------------------------------------------------------------

	// extract body
	const type = body.type;
	const data = body.data?.object || {};
	console.log(JSON.stringify({ data, type }, null, 2));

	// get stripe customer email
	const customerEmail = data.customer_details?.email;

	// -------------------------------------------------------------------------
	// Start lifetime subscription payment
	// -------------------------------------------------------------------------

	if (['charge.succeeded', 'checkout.session.completed'].includes(type) && !data.subscription) {
		// get email address
		const email = data.metadata?.email || data.receipt_email || data.billing_details?.email || data.customer_details?.email;
		const emailClean = email?.toLowerCase().trim();

		// get amount paid
		// will be "amount" in case of "charge.succeeded"
		// will be "amount_total" "checkout.session.completed"
		const amount = data.amount || data.amount_total || data.amount_captured || data.amount_subtotal;

		// get payment status
		// will be "succeeded" in case of "charge.succeeded"
		// will be "complete" in case of "checkout.session.completed"
		const status = data.status || data.status;

		// get stripe charge id and payment intent id
		const chargeId = type === 'charge.succeeded' ? data.id : undefined;
		const paymentIntentId = data.payment_intent;

		// log all stats
		console.log({ emailClean, amount, status, chargeId, paymentIntentId, customerEmail });

		// email not found
		let user;

		// try and fetch user by email
		if (emailClean && !user) {
			const usersByEmail = await apsGql(listUsersByEmail, { email: emailClean }, 'data.listUsersByEmail.items');
			if (usersByEmail.length) {
				user = usersByEmail[0];
			}
		}

		// check for lifetime payment
		// enable lifetime sub if payment status is valid
		// amount will be 59900 for normal user lifetime sub
		if (['succeeded', 'complete'].includes(status) && [54900, 59900, 49900].includes(amount)) {
			console.log('Found valid payment - activating lifetime sub');
			const input = { id: user.id, stripeChargeId: chargeId, stripePaymentIntentId: paymentIntentId, isLifetime: true, customerEmail };
			await apsGql(updateUser, { input }, 'data.updateUser');
		}

		console.log('All done - processed stripe lifetime payment');
		return res.status(200).json({});
	}

	// -------------------------------------------------------------------------
	// End lifetime subscription payment
	// -------------------------------------------------------------------------

	/*
	// get subscription id
	let subscriptionId = data?.['subscription'];

	// subscription created
	if (!subscriptionId && type === 'customer.subscription.created') {
		subscriptionId = data['id'];
	}

	// subscription updated
	if (!subscriptionId && type === 'customer.subscription.updated') {
		subscriptionId = data['id'];
	}

	// subscription deleted
	if (!subscriptionId && type === 'customer.subscription.deleted') {
		subscriptionId = data['id'];
	}

	// get customer id
	const customerId = data?.['customer'];
	console.log({ customerId });

	// get price id
	const priceId = data?.['lines']?.['data']?.[0]?.['plan']?.id;
	console.log({ priceId });

	// subscription id is required
	if (!subscriptionId) {
		console.log('Subscription ID not found - bail - ', subscriptionId);
		return res.status(200).json({});
	}

	// customer id is required
	if (!customerId) {
		console.log('Customer ID not found - bail - ', customerId);
		return res.status(200).json({});
	}

	// get subscription
	let subscription;
	try {
		subscription = await stripeGetSubscription(subscriptionId);
		if (!subscription.id) {
			console.log('Subscription not found - bail');
			return res.status(200).json({});
		}
	} catch (err) {
		console.log('Error getting subscription - bail - ', err);
		return res.status(200).json({});
	}

	// get customer
	let customer;
	try {
		customer = (await stripeGetCustomer(customerId));
		if (!customer?.id) {
			console.log('Customer not found - bail');
			return res.status(200).json({});
		}
	} catch (err) {
		console.log('Error getting customer - bail -', err);
		return res.status(200).json({});
	}

	// get cognito user by email - username is same as email
	let email;
	try {
		email = customer?.email?.toLowerCase().trim();
	} catch (err) {
		console.log('Error fetching customer info - bail - ', err);
		return res.status(200).json({});
	}

	// check for customer email provided via metadata
	if (data.metadata.email) {
		email = data.metadata.email;
	}

	// get cognito user
	const cognitoUser = await idpAdminGetUser({
		UserPoolId: USERPOOLID,
		Username: email,
	});
	const sub = cognitoUser.Username;

	// extract latest invoice
	const latestInvoice = subscription.latest_invoice;

	// extract latest plan
	const latestPlan = subscription.plan;
	console.log(JSON.stringify(latestPlan, null, 2));

	const stripeCustomerId = customer.id;
	const stripeSubscriptionId = subscription.id;
	const stripeSubscriptionStatus = subscription.status;
	const stripeInvoiceId = latestInvoice.id;
	const stripeInvoiceStatus = latestInvoice.status;
	const stripePlanId = subscription.items.data[0].plan.id;

	// prepare user update data
	const input = {
		id: sub,
		email: email,
		customerEmail,
		owner: sub,
		userId: sub,
		stripeCustomerId: stripeCustomerId,
		stripeInvoiceId: stripeInvoiceId,
		stripeInvoiceStatus: stripeInvoiceStatus,
		stripePlanId: stripePlanId,
		stripeSubscriptionId: stripeSubscriptionId,
		stripeSubscriptionStatus: stripeSubscriptionStatus,
	};
	console.log(JSON.stringify({ input }, null, 2));

	// invoice was paid - update customer to use new data
	if (
		[
			// 'invoice.created',
			// 'invoice.updated',
			// 'invoice.deleted',
			// 'invoice.paid',
			// 'invoice.payment_succeeded',
			// 'customer.subscription.created',
			// 'customer.subscription.updated',
			// 'customer.subscription.paused',
			// 'customer.subscription.resumed',
			'checkout.session.completed',
		].includes(type)
	) {
		try {
			await apsGql(updateUser, { input }, 'data.updateUser');
		} catch (err) {
			console.log('Error updating subscription info', err);
			await apsGql(createUser, { input }, 'data.createUser');
		}

		// set default payment payment for stripe customer
		if (data['default_payment_method']) {
			try {
				await stripeSetDefaultPaymentMethod(customerId, data['default_payment_method']);
			} catch (err) {
				console.log('Error setting default payment method - ', err);
			}
		}
	}

	// payment failed / subscription cancelled - cancel all future schedules after expiry
	if (
		[
			// 'invoice.payment_failed',
			// 'customer.subscription.deleted'
			'stripe.event.name'
		].includes(type)
	) {
		try {
			await apsGql(updateUser, { input }, 'data.updateUser');
		} catch (err) {
			console.log('Error updating subscription info', err);
			await apsGql(createUser, { input }, 'data.createUser');
		}
	}
    */

	// all done
	console.log('All done');
	return res.status(200).json({});
});

module.exports = router;

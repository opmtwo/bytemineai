const { Router } = require('express');

const { createUser, updateUser } = require('../../graphql/mutations');
const { apsGql } = require('../utils/aps-utils');
const { safeJsonDecode } = require('../utils/helper-utils');
const { idpAdminGetUser } = require('../utils/idp-utils');
const { stripeGetCustomer, stripeGetSubscription, stripeSetDefaultPaymentMethod } = require('../utils/stripe-utils');
// const { listUsersByEmail } = require('../../graphql/queries');

const { AUTH_STACKUPAUTH_USERPOOLID: USERPOOLID } = process.env;

const router = Router();

router.post('/stripe', async (req, res) => {
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

	// -------------------------------------------------------------------------
	// Start
	// -------------------------------------------------------------------------

	//need to move this to a variable sometime
	const stripe = require('stripe')('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');
	const stripe_webhook_key = 'whsec_5CSSRrok8vSyODxiSad5MEIjIKtXdT0f';
	const stripe_event = stripe.webhooks.constructEvent(event.body, event.headers['Stripe-Signature'], stripe_webhook_key);

	let response;
	const now = moment();
	if (stripe_event.type === 'checkout.session.completed') {
		let stripe_customer = body.data.object.customer || '';
		let client_reference = body.data.object.client_reference_id;
		let payment_status = body.data.object.payment_status;
		let stripe_subscription = body.data.object.subscription || '';
		let founduser = await getUser(client_reference);
		account = founduser;
		account.Attributes = account.UserAttributes;
		const groupName = account?.UserAttributes?.find((attr) => attr?.Name === 'custom:group_name')?.Value;
		//response = {"client_reference":client_reference,"customer":stripe_customer,"payment_status":payment_status,"group":groupName};
		const nymblrSubResponse1 = await getNymblrSubscription(groupName);
		const items = nymblrSubResponse1?.listNymblrSubscriptionsByGroupId?.items || [];
		const nysub = items[0];

		const options2 = {
			input: {
				id: nysub.id,
				stripeSubscriptionID: [stripe_subscription],
				stripeCustomerId: stripe_customer,
				firstPaid: now.toISOString(),
			},
		};
		const response2 = await appSyncMutation(mutations.updateNymblrSubscription, options2);
		return getResponse(response2);
	} else if (stripe_event.type === 'invoice.paid') {
		let customer_id;
		let main_plan;
		let main_qty = 0;
		let addnl_qty = 0;
		let monthly_credit = 0;
		let annual_credit = 0;
		let quarterly_credit = 0;
		let lines = body.data.object.lines.data;
		customer_id = body.data.object.customer;
		const parseLine = (item, index, arr) => {
			//console.log(item.price.id);
			if (item.price.id === 'price_1MA7Q4KEmxTujg3VZbcuhUpo') {
				main_plan = 'Monthly';
				main_qty = 1000;
				monthly_credit = 1000;
				quarterly_credit = 1000;
			} else if (item.price.id === 'price_1MA7PnKEmxTujg3VOohzcP52') {
				main_plan = 'Yearly';
				main_qty = 12000;
				annual_credit = 12000;
				quarterly_credit = 1200;
			} else if (item.price.id === 'price_1MA7OyKEmxTujg3VwNMqMraq') {
				//monthly addn'l credits
				addnl_qty = parseInt(item.quantity || '0');
				monthly_credit = monthly_credit + addnl_qty;
			} else if (item.price.id === 'price_1MA7OLKEmxTujg3VRKbkGiHP') {
				//annual addn'l credits
				addnl_qty = parseInt(item.quantity || '0');
				annual_credit = annual_credit + addnl_qty;
			} else if (item.price.id === 'price_1Ml1ZAKEmxTujg3Vm2lzOrVn') {
				main_plan = 'Monthly';
				main_qty = 10000;
				monthly_credit = 10000;
				quarterly_credit = 10000;
			} else if (item.price.id === 'price_1Ml1dxKEmxTujg3V62aIZnE3') {
				main_plan = 'Yearly';
				main_qty = 120000;
				annual_credit = 120000;
				quarterly_credit = 15000;
			} else if (item.price.id === 'price_1Ml1htKEmxTujg3VParc8ZrL') {
				//monthly addn'l credits
				addnl_qty = parseInt(item.quantity || '0');
				monthly_credit = monthly_credit + addnl_qty;
			} else if (item.price.id === 'price_1Ml1idKEmxTujg3V0aCr2TbQ') {
				//annual addn'l credits
				addnl_qty = parseInt(item.quantity || '0');
				annual_credit = annual_credit + addnl_qty;
			}
		};
		lines.forEach(parseLine);

		const options = {
			stripeCustomerId: customer_id,
		};

		const response = await appSyncQuery(queries.listNymblrSubscriptionsByStripeCustomerId, options);
		const nymblrSubResponse1 = response.data;
		const items = nymblrSubResponse1?.listNymblrSubscriptionsByStripeCustomerId?.items || [];
		const nysub = items[0];
		const preCredits = nysub.currentCredits || '0';
		const newCredits = parseInt(nysub.currentCredits || '0') + monthly_credit + annual_credit;
		const options2 = {
			input: {
				id: nysub.id,
				monthlyCredits: monthly_credit,
				quarterlyCredits: quarterly_credit,
				annualCredits: annual_credit,
				currentCredits: newCredits,
				subscriptionPeriod: main_plan,
				lastPaid: now.toISOString(),
			},
		};
		const response2 = await appSyncMutation(mutations.updateNymblrSubscription, options2);
		return getResponse(response2);
	} else if (stripe_event.type === 'customer.subscription.deleted') {
		let customer_id;
		customer_id = body.data.object.customer;
		//console.log('sub delete - get nymblr stripeCustomerId-',customer_id);

		const options = {
			stripeCustomerId: customer_id,
		};
		const response = await appSyncQuery(queries.listNymblrSubscriptionsByStripeCustomerId, options);
		const nymblrSubResponse1 = response.data;
		const items = nymblrSubResponse1?.listNymblrSubscriptionsByStripeCustomerId?.items || [];
		if (items.length > 0) {
			const nysub = items[0];
			const options2 = {
				input: {
					id: nysub.id,
					monthlyCredits: 0,
					quarterlyCredits: 0,
					annualCredits: 0,
					subscriptionPeriod: 'Monthly',
					subscriptionStatus: 'Trial',
				},
			};
			const response2 = await appSyncMutation(mutations.updateNymblrSubscription, options2);
			return getResponse(response2);
		} else {
			return getErrorResponse({ message: 'User/Account Not Found' }, body);
		}
	}
	return getErrorResponse(body);

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
		customer = await stripeGetCustomer(customerId);
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

		/**
		 * @summary
		 * send trial email
		 *
		 * @description
		 * @event
		 * invoice.payment_succeeded:
		 * This event is triggered when a payment for an invoice is successfully
		 * processed. It indicates that the payment for a specific invoice has
		 * been successfully completed. This event is particularly useful when
		 * you need to track successful payment attempts on individual invoices.
		 *
		 * @event
		 * invoice.paid:
		 * This event is triggered when an invoice is marked as paid, regardless
		 * of whether the payment was successful or not. It is a broader event
		 * that simply indicates that the invoice's status has transitioned to
		 * "paid". This can occur when a payment is successfully processed, but
		 * it can also occur if the invoice is manually marked as paid in the
		 * Stripe Dashboard or through the API.
		 */
		if (subscription.status === 'trialing' && type === 'invoice.paid') {
			// await sesSendEmail(email, 'Congratulations for starting your free trial with Unfiltered!', overachieveTrialHtml, overachieveTrialText, {
			// 	email,
			// 	name,
			// });
		}
	}

	// payment failed / subscription cancelled - cancel all future schedules after expiry
	if (
		[
			// 'invoice.payment_failed',
			// 'customer.subscription.deleted'
			'stripe.event.name',
		].includes(type)
	) {
		try {
			await apsGql(updateUser, { input }, 'data.updateUser');
		} catch (err) {
			console.log('Error updating subscription info', err);
			await apsGql(createUser, { input }, 'data.createUser');
		}
	}

	// all done
	console.log('All done');
	return res.status(200).json({});
});

module.exports = router;

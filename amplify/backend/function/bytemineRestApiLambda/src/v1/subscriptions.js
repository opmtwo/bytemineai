const { Router } = require('express');
const moment = require('moment');

const { verifyToken, verifyTeam } = require('../middlewares/auth');
const { idpGetUserAttribute, idpAdminListGroupsForUser } = require('../utils/idp-utils');
const { stripeGeneratePaymentLink, stripeGetCustomer, stripeGetSubscription, stripeCreateCustomerPortalSession, stripeCreateCustomer } = require('../utils/stripe-utils');
const { listSubByTeamId, listUsageByTeamId, listUserByTeamId } = require('../graphql/queries');
const { apsGql } = require('../utils/aps-utils');

const { AUTH_BYTEMINEF573E062_USERPOOLID: USERPOOLID } = process.env;

const router = Router();

router.get('/me', verifyToken, verifyTeam, async (req, res) => {
	const { sub: userId } = res.locals;
	const { teamId } = res.locals.team;

	// get user profile
	let subscription = null;
	try {
		const subscriptions = await apsGql(listSubByTeamId, { teamId }, 'data.listSubByTeamId.items');
		subscription = subscriptions?.[0];
	} catch (err) {
		console.log('Error fetching team subscriptions', err);
	}
	console.log(JSON.stringify({ subscription }));

	// get stripe customer
	let stripeCustomer = null;
	if (subscription?.stripeCustomerId) {
		try {
			stripeCustomer = await stripeGetCustomer(subscription.stripeCustomerId);
			console.log('Found stripe customer', JSON.stringify({ stripeCustomer }, null, 2));
		} catch (err) {
			console.log('Error fetching stripe customer', err);
		}
	}
	console.log(JSON.stringify({ stripeCustomer }));

	// get user subscription
	let stripeSubscription = null;
	if (subscription?.stripeSubscriptionID?.length) {
		try {
			stripeSubscription = await stripeGetSubscription(subscription.stripeSubscriptionID[0]);
			console.log('Found valid subscription', JSON.stringify(stripeSubscription, null, 2));
		} catch (err) {
			console.log('Error getting subscription', err);
		}
	}
	console.log(JSON.stringify({ stripeSubscription }));

	const groups = await idpAdminListGroupsForUser(USERPOOLID, userId);
	console.log(JSON.stringify({ groups }));

	// all done
	console.log('All done');
	return res.status(200).json({
		self: res.locals.team,
		owner: res.locals.owner,
		subscription,
		stripeCustomer,
		stripeSubscription,
		groups: groups.map((_group) => _group.GroupName),
	});
});

/**
 * @summary
 * Get order subscription details
 */
router.get('/link', verifyToken, verifyTeam, async (req, res) => {
	const { sub: userId } = res.locals;
	const { teamId } = res.locals.team;

	// get current user
	const authUser = res.locals.user;

	// get stripe price id
	const priceId = req.query.id;

	// get current user email
	const email = authUser.email || (await idpGetUserAttribute(authUser, 'email'));

	// create stripe payment link for the specified price id
	const link = await stripeGeneratePaymentLink(priceId, { email, userId, teamId });

	// return stripe checkout session
	return res.json(link);
});

/**
 * @summary
 * Create customer portal session for the current user
 */
router.get('/me/portal', verifyToken, verifyTeam, async (req, res) => {
	// get current user
	const { sub } = res.locals;
	const { email } = res.locals.owner;
	const { teamId } = res.locals.team;

	let subscription = null;
	try {
		// get subscription info
		const subscriptions = await apsGql(listSubByTeamId, { teamId }, 'data.listSubByTeamId.items');
		subscription = subscriptions?.[0];

		// create customer portal
		const portal = await stripeCreateCustomerPortalSession(subscription.stripeCustomerId);

		// return portal data
		return res.json(portal);
	} catch (err) {
		console.log('Error opening customer portal', err);

		// ---------------------------------------------------------------------
		// Create or fetch existing stripe customer by email and try to open customer portal
		// ---------------------------------------------------------------------

		// clean email
		const emailClean = email.toLowerCase().trim();

		// get existing stripe customer or create new stripe customer
		const customer = await stripeCreateCustomer(emailClean);

		// create customer portal
		const portal = await stripeCreateCustomerPortalSession(customer.id);

		// return portal data
		return res.json(portal);
	}
});

router.get('/usage', verifyToken, verifyTeam, async (req, res) => {
	const { teamId } = res.locals.team;

	const thirtyDaysAgo = moment().subtract(30, 'days');

	let usageItems = [];
	let nextToken = null;
	let done = false;

	do {
		const response = await apsGql(
			listUsageByTeamId,
			{
				teamId: teamId,
				limit: 999,
				sortDirection: 'DESC',
				nextToken,
			},
			'data.listUsageByTeamId'
		);

		const pageItems = response.items;

		for (let item of pageItems) {
			if (moment(item.createdAt).isBefore(thirtyDaysAgo)) {
				done = true;
				break;
			}
			usageItems.push(item);
		}

		nextToken = done ? null : response.nextToken;
	} while (nextToken);

	const users = await apsGql(
		listUserByTeamId,
		{
			teamId: teamId,
			limit: 999,
			sortDirection: 'DESC',
		},
		'data.listUserByTeamId.items'
	);

	const creditsUsed = usageItems.reduce((sum, item) => sum + (item?.credits || 0), 0);

	const userInThirtyDays = users.filter((_user) => moment(_user.createdAt).isAfter(thirtyDaysAgo));

	return res.json({ usage: usageItems, users: userInThirtyDays, creditsUsed });
});

module.exports = router;

import { Stripe } from 'stripe';

const { STRIPE_CLIENT_SECRET } = process.env;

export const stripe = new Stripe(STRIPE_CLIENT_SECRET, { apiVersion: '2023-10-16' });

/**
 * @summary
 * Get a stripe price by id
 *
 * @see
 * https://stripe.com/docs/api/prices/retrieve?lang=node
 *
 * @param {string} priceId stripe price id
 * @returns {Promise<Stripe.Price>} Promise resolving to the retrieved price
 */
export const stripeGetPrice = async (priceId) => {
	try {
		const response = await stripe.prices.retrieve(priceId, { expand: ['product'] });
		console.log('stripeGetPrice - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetPrice - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Retrieve a stripe checkout session
 *
 * @see
 * https://stripe.com/docs/api/checkout/sessions/retrieve?lang=node
 *
 * @param {string} sessionId stripe checkout session id
 */
export const stripeGetCheckoutSession = async (secretKey, sessionId) => {
	try {
		const response = await stripe.checkout.sessions.retrieve(sessionId);
		console.log('stripeGetCheckoutSession - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetCheckoutSession - error - ', err);
		throw err;
	}
};

// /**
//  * @summary
//  * Create a Stripe session for checkout
//  *
//  * @link
//  * https://github.com/stripe-samples/accept-a-payment
//  * https://stripe.com/docs/api/checkout/sessions/create
//  * https://stripe.com/docs/payments/ideal/accept-a-payment?platform=web
//  *
//  * @see
//  * https://stripe.com/docs/api/checkout/sessions/create?lang=node
//  *
//  * @param {string} secretKey Stripe secret key
//  * @param {string} domainURL The full URL to the domain hosting the site - e.g. https://stripe.4t4.io
//  * @param {string} currency The price currency - e.g. usd / eur
//  * @param {string} name The product name
//  * @param {number} amount The price value
//  * @param {number} quantity The quantity
//  * @param {boolean} isIdealEnabled True if iDEAL is needed - check links above
//  * @returns {Promise<Stripe.Checkout.Session>} Promise resolving to the created checkout session
//  */
// export const stripeCreateCheckoutSession = async (
// 	secretKey: string,
// 	domainURL: string,
// 	currency: string,
// 	name: string,
// 	amount: number,
// 	quantity: number,
// 	isIdealEnabled: boolean
// ): Promise<Stripe.Checkout.Session> => {
// 	const paymentMethodTypes: string[] = ['card'];
// 	if (currency === 'eur' && isIdealEnabled) {
// 		paymentMethodTypes.push('ideal');
// 	}
// 	console.log('stripeCreateCheckoutSession - params - ', { secretKey, domainURL, currency, name, amount, quantity, isIdealEnabled });
// 	try {
// 		const session = await stripe.checkout.sessions.create({
// 			mode: 'payment',
// 			payment_method_types: paymentMethodTypes,
// 			line_items: [
// 				{
// 					name,
// 					amount,
// 					currency,
// 					quantity,
// 				},
// 			],
// 			success_url: `${domainURL}&stripe_success_id={CHECKOUT_SESSION_ID}`,
// 			cancel_url: `${domainURL}&stripe_cancel_id={CHECKOUT_SESSION_ID}`,
// 			automatic_tax: {
// 				enabled: false,
// 			},
// 		});
// 		console.log('stripeCreateCheckoutSession - success - ', session);
// 		return session;
// 	} catch (err) {
// 		console.log('stripeCreateCheckoutSession - error - ', err);
// 		throw err;
// 	}
// };

/**
 * @summary
 * Create a Stripe session for subscription checkout
 *
 * @link
 * https://github.com/stripe-samples/accept-a-payment
 * https://stripe.com/docs/api/checkout/sessions/create
 * https://stripe.com/docs/payments/ideal/accept-a-payment?platform=web
 *
 * @see
 * https://stripe.com/docs/api/checkout/sessions/create?lang=node
 *
 * @param {string} url The full URL to the domain hosting the site - e.g. https://stripe.4t4.io
 * @param {string} customerId Stripe customer id
 * @param {string} priceId Stripe price id for the subscription
 * @param {string} txnId The unique transaction id - uuid
 * @param {string} promoCode The discount promo code
 * @returns {Promise<Stripe.Checkout.Session>} Promise resolving to the created checkout session
 */
export const stripeCreateSubscriptionCheckoutSession = async (url, customerId, priceId, txnId, promoCode) => {
	try {
		const params = {
			mode: 'subscription',
			customer: customerId,
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: `${url}/orders/${txnId}`,
			cancel_url: `${url}/orders/${txnId}`,
			client_reference_id: txnId,
			metadata: { txnId },
			subscription_data: { metadata: { txnId } },
			// ...(promoCode ? { discounts: { promotion_code: promoCode } } : {}),
			...(promoCode ? { discounts: [{ promotion_code: promoCode }] } : {}),
		};
		console.log('stripeCreateSubscriptionCheckoutSession - params -', params);
		const session = await stripe.checkout.sessions.create(params);
		console.log('stripeCreateSubscriptionCheckoutSession - success - ', session);
		return session;
	} catch (err) {
		console.log('stripeCreateSubscriptionCheckoutSession - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get a Stripe customer by id
 *
 * @see
 * https://stripe.com/docs/api/customers/retrieve?lang=node
 *
 * @param {string} id Stripe customer id
 * @returns {Promise<Stripe.Customer>} Promise resolving to the retrieved customer
 */
export const stripeGetCustomer = async (id) => {
	try {
		const response = await stripe.customers.retrieve(id);
		console.log('stripeGetCustomer - response - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetCustomer - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get Stripe customer by email address
 *
 * @see
 * https://stripe.com/docs/api/customers/list?lang=node
 *
 * @param {string} email Stripe customer email
 * @returns {Promise<Stripe.Customer | undefined>} Promise resolving to the retrieved customer or undefined if not found
 */
export const stripeGetCustomerByEmail = async (email) => {
	try {
		const response = await stripe.customers.list({ email, limit: 1 });
		console.log('stripeGetCustomerByEmail - success - ', response);
		return response?.['data']?.[0];
	} catch (err) {
		console.log('stripeGetCustomerByEmail - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get Stripe customers
 *
 * @see
 * https://stripe.com/docs/api/customers/list?lang=node
 *
 * @param {number} limit - The number of customers to return (default: 100)
 * @returns {Promise<Stripe.Customer[]>} Promise resolving to the list of retrieved customers
 */
export const stripeListCustomers = async (limit = 100) => {
	let customers = [];
	let startingAfter = undefined;

	do {
		try {
			const response = await stripe.customers.list({
				limit,
				starting_after: startingAfter,
			});
			console.log('stripeListCustomers - response - ', response);
			customers = [...customers, ...response.data];
			if (response.data.length > 0) {
				startingAfter = response.data[response.data.length - 1].id;
			} else {
				startingAfter = undefined;
			}
		} catch (err) {
			console.log('stripeListCustomers - error - ', err);
			throw err;
		}
	} while (startingAfter !== undefined);

	console.log('stripeListCustomers - success - ', customers.length, ' customers found');
	return customers;
};

/**
 * @summary
 * Get Stripe customer subscription
 *
 * @see
 * https://stripe.com/docs/api/subscriptions/list
 *
 * @param {string} customerId - Stripe customer id
 * @param {string} priceId - Stripe price id
 * @param {string} txnId - Unique transaction id
 * @returns {Promise<Stripe.Subscription | undefined>} Promise resolving to the customer subscription or undefined if not found
 */
export const stripeGetCustomerSubscription = async (customerId, priceId, txnId) => {
	try {
		const response = await stripe.subscriptions.list({
			limit: 100,
			customer: customerId,
			price: priceId,
			status: 'active',
			expand: ['data.customer', 'data.latest_invoice'],
		});

		console.log(response);

		if (!txnId) {
			return response.data?.[0];
		}

		for (let i = 0; i < response.data.length; i++) {
			if (response.data[i].metadata?.txnId === txnId) {
				return response.data[i];
			}
		}

		return undefined;
	} catch (err) {
		console.log('stripeGetCustomerSubscription - error - ', err);
		throw err;
	}
};
/**
 * @summary
 * Create Stripe customer by email address
 *
 * @see
 * https://stripe.com/docs/api/customers/create?lang=node
 *
 * @param {string} email - Stripe customer email address
 * @returns {Promise<Stripe.Customer>} Promise resolving to the created or existing customer
 */
export const stripeCreateCustomer = async (email) => {
	try {
		const response = await stripeGetCustomerByEmail(email);
		if (response?.id) {
			console.log('stripeCreateCustomer - success - ', response);
			return response;
		}
	} catch (err) {
		console.log('stripeCreateCustomer - error - ', err);
		try {
			const response = await stripe.customers.create({ email });
			console.log('stripeCreateCustomer - success - ', response);
			return response;
		} catch (errNested) {
			console.log('stripeCreateCustomer - error - ', errNested);
		}
		throw err;
	}
};

/**
 * @summary
 * Create a session of the customer portal
 *
 * @see
 * https://stripe.com/docs/api/customer_portal/sessions/create
 *
 * @param {string} customerId - Stripe customer id
 * @returns {Promise<Stripe.BillingPortal.Session>} Promise resolving to the created customer portal session
 */
export const stripeCreateCustomerPortalSession = async (customerId) => {
	try {
		const response = await stripe.billingPortal.sessions.create({ customer: customerId });
		console.log('stripeCreateCustomerPortalSession - response - ', response);
		return response;
	} catch (err) {
		console.log('stripeCreateCustomerPortalSession - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get stripe charge by id
 *
 * @see
 * https://stripe.com/docs/api/charges/retrieve?lang=node
 *
 * @param {string} id - Stripe charge id
 * @returns {Promise<Stripe.Charges.Charge>} Promise resolving to the retrieved charge object
 */
export const stripeGetCharge = async (id) => {
	try {
		const response = await stripe.charges.retrieve(id);
		console.log('stripeGetCharge - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetCharge - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * List all invoices, or list the invoices for a specific customer
 *
 * @see
 * https://stripe.com/docs/api/invoices/list
 *
 * @param {string} customerId - Stripe customer id
 * @param {number} limit - Maximum number of invoices to retrieve (default: 100)
 * @param {boolean} verbose - Flag to enable verbose logging (default: false)
 * @returns {Promise<Stripe.Invoices.Invoice[]>} Promise resolving to the array of retrieved invoices
 */
export const stripeListInvoices = async (customerId, limit = 100, verbose) => {
	const invoices = [];
	let startingAfter = undefined; // Use undefined instead of null
	try {
		do {
			const response = await stripe.invoices.list({
				customer: customerId,
				limit: limit,
				starting_after: startingAfter,
			});
			if (verbose) {
				console.log('stripeListInvoices - response - ', response);
			}
			invoices.push(...response.data); // Use push() instead of +=
			if (response.data.length > 0) {
				startingAfter = response.data[response.data.length - 1].id;
			} else {
				startingAfter = undefined;
			}
		} while (startingAfter);
		if (verbose) {
			console.log('stripeListInvoices - success - ', invoices);
		} else {
			console.log('stripeListInvoices - success - found invoices - ', invoices.length);
		}
		return invoices;
	} catch (err) {
		console.log('stripeListInvoices - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get stripe invoice by id
 *
 * @see
 * https://stripe.com/docs/api/invoices/retrieve?lang=node
 *
 * @param {string} id - Stripe invoice id
 * @returns {Promise<Stripe.Invoices.Invoice>} Promise resolving to the retrieved invoice
 */
export const stripeGetInvoice = async (id) => {
	try {
		const response = await stripe.invoices.retrieve(id, { expand: ['subscription'] });
		console.log('stripeGetInvoice - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetInvoice - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get upcoming stripe subscription invoice for the specified customer id
 *
 * @see
 * https://stripe.com/docs/api/invoices/retrieve?lang=node
 *
 * @param {string} customerId - Stripe customer id
 * @param {string} subscriptionId - Stripe subscription id
 * @returns {Promise<Stripe.Invoices.Invoice>} Promise resolving to the upcoming invoice
 */
export const stripeGetUpcomingInvoice = async (customerId, subscriptionId) => {
	try {
		const response = await stripe.invoices.retrieveUpcoming({ customer: customerId, subscription: subscriptionId });
		console.log('stripeGetUpcomingInvoice - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetUpcomingInvoice - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get a stripe subscription by id
 *
 * @see
 * https://stripe.com/docs/api/subscriptions/retrieve?lang=node
 *
 * @param {string} id - Stripe subscription id
 * @returns {Promise<Stripe.Subscription>} Promise resolving to the subscription information
 */
export const stripeGetSubscription = async (id) => {
	try {
		const response = await stripe.subscriptions.retrieve(id, { expand: ['customer', 'latest_invoice'] });
		console.log('stripeGetSubscription - success - ', JSON.stringify(response, null, 2));
		return response;
	} catch (err) {
		console.log('stripeGetSubscription - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get stripe subscriptions
 *
 * @see
 * https://stripe.com/docs/api/subscriptions/list?lang=node
 *
 * @param {int} limit the number of subscriptions to return
 */
export const stripeListSubscriptions = async (limit = 100, verbose = true) => {
	if (verbose) {
		console.log('stripeListSubscriptions - ', { limit });
	}
	let subscriptions = [];
	let startingAfter = undefined;
	do {
		try {
			const params = {
				limit: limit,
				starting_after: startingAfter,
				expand: ['data.latest_invoice'],
			};
			if (verbose) {
				console.log('stripeListSubscriptions - params - ', params);
			}
			const res = await stripe.subscriptions.list(params);
			subscriptions = subscriptions.concat([...res.data]);
			if (res.has_more && res?.data?.length) {
				startingAfter = res?.data?.pop()?.id;
			}
		} catch (err) {
			console.log('stripeListSubscriptions - error - ', err);
			throw err;
		}
	} while (startingAfter);
	if (verbose) {
		console.log('stripeListSubscriptions -  success - found subscriptions', subscriptions.length);
	}
	return subscriptions;
};

/**
 * @summary
 * Create stripe subscription for the provided customer id
 *
 * @see
 * https://stripe.com/docs/api/subscriptions/create?lang=node
 *
 * @param {string} customerId - Stripe customer id
 * @param {string} priceId - Stripe price id
 * @param {string} coupon - Stripe coupon code
 * @param {number} trialPeriod - Trial period in days (default: 7)
 * @returns {Promise<Stripe.Subscription>} Promise resolving to the created subscription
 */
export const stripeCreateSubscription = async (customerId, priceId, coupon, trialPeriod = 7) => {
	try {
		const response = await stripe.subscriptions.create({
			customer: customerId,
			items: [
				{
					price: priceId,
				},
			],
			// trial_period_days: trialPeriod,
			expand: ['customer', 'latest_invoice.payment_intent'],
			promotion_code: coupon,
		});
		console.log('stripeCreateSubscription - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeCreateSubscription - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Cancel the specified stripe subscription id
 *
 * @see
 * https://stripe.com/docs/api/subscriptions/cancel?lang=node
 *
 * @param {string} subscriptionId - Stripe subscription id
 * @returns {Promise<Stripe.DeletedSubscription>} Promise resolving to the deleted subscription object
 */
export const stripeDeleteSubscription = async (subscriptionId) => {
	try {
		const response = await stripe.subscriptions.cancel(subscriptionId);
		console.log('stripeDeleteSubscription - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeDeleteSubscription - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get a stripe payment method by id
 *
 * @see
 * https://stripe.com/docs/api/payment_methods/retrieve?lang=node
 *
 * @param {string} id - Stripe payment method id
 * @returns {Promise<Stripe.PaymentMethod>} Promise resolving to the payment method object
 */
export const stripeGetPaymentMethod = async (id) => {
	try {
		const response = await stripe.paymentMethods.retrieve(id);
		console.log('stripeGetPaymentMethod - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetPaymentMethod - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Attach a payment method to the specified stripe customer
 *
 * @see
 * https://stripe.com/docs/api/payment_methods/attach?lang=node
 *
 * @param {string} paymentMethodId - Stripe payment method id
 * @param {string} customerId - Stripe customer id
 * @returns {Promise<Stripe.PaymentMethod>} Promise resolving to the attached payment method object
 */
export const stripeAddPaymentMethod = async (paymentMethodId, customerId) => {
	try {
		const response = await stripe.paymentMethods.attach(paymentMethodId, {
			customer: customerId,
		});
		console.log('stripeAddPaymentMethod - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeAddPaymentMethod - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Update the payment method of the specified stripe subscription
 *
 * @see
 * https://stripe.com/docs/api/subscriptions/update?lang=node
 *
 * @param {string} subscriptionId - Stripe subscription id
 * @param {string} paymentMethodId - Stripe payment method id
 * @returns {Promise<Stripe.Subscription>} Promise resolving to the updated subscription object
 */
export const stripeUpdateSubscriptionPaymentMethod = async (subscriptionId, paymentMethodId) => {
	try {
		const response = await stripe.subscriptions.update(subscriptionId, {
			default_payment_method: paymentMethodId,
		});
		console.log('stripeUpdateSubscriptionPaymentMethod - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeUpdateSubscriptionPaymentMethod - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * See what the next invoice would look like with a price switch and proration set
 *
 * @see
 * https://stripe.com/docs/api/invoices/upcoming?lang=node
 * https://stripe.com/docs/billing/subscriptions/prorations
 *
 * @param {Stripe.Subscription} subscription - the subscription object
 * @param {string} pricingId - new pricing id
 * @param {string} customerId - stripe customer id
 * @param {number} prorationDate - epoch time in seconds - forces the proration to be calculated as though the update was done at the specified time
 * @returns {Promise<Stripe.UpcomingInvoice>} - Promise resolving to the upcoming prorated invoice object
 */
export const stripeGetProratedInvoice = async (subscription, pricingId, customerId, prorationDate) => {
	const items = [
		{
			id: subscription.items.data[0].id,
			price: pricingId, // Switch to new price
		},
	];
	try {
		const response = await stripe.invoices.retrieveUpcoming({
			customer: customerId,
			subscription: subscription.id,
			subscription_items: items,
			subscription_proration_date: prorationDate,
		});
		console.log('stripeGetProratedInvoice - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetProratedInvoice - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get all payment methods of the specified stripe customer
 *
 * @see
 * https://stripe.com/docs/api/payment_methods/customer_list?lang=node
 *
 * @param {string} customerId - stripe customer id
 * @returns {Promise<Stripe.ApiList<Stripe.PaymentMethod>>} Promise resolving to the list of payment methods
 */
export const stripeListPaymentMethods = async (customerId) => {
	try {
		const response = await stripe.paymentMethods.list({
			customer: customerId,
			type: 'card',
		});
		console.log('stripeListPaymentMethods - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeListPaymentMethods - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Set default payment method of a stripe customer to the specified payment method
 *
 * @see
 * https://stripe.com/docs/api/customers/update?lang=node
 *
 * @param {string} customerId - stripe customer id
 * @param {string} paymentMethodId - stripe payment method id
 * @returns {Promise<Stripe.Customer>} - Promise resolving to the updated customer object
 */
export const stripeSetDefaultPaymentMethod = async (customerId, paymentMethodId) => {
	try {
		const response = await stripe.customers.update(customerId, {
			invoice_settings: {
				default_payment_method: paymentMethodId,
			},
		});
		console.log('stripeSetDefaultPaymentMethod - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeSetDefaultPaymentMethod - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get stripe coupon code
 *
 * @see
 * https://stripe.com/docs/api/coupons/retrieve?lang=node
 *
 * @param {string} code - stripe coupon code
 * @returns {Promise<Stripe.Coupon>} - Promise resolving to the retrieved coupon object
 */
export const stripeGetCoupon = async (code) => {
	try {
		const response = await stripe.coupons.retrieve(code);
		console.log('stripeGetCoupon - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGetCoupon - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Get stripe promo code by code
 *
 * @see
 * https://stripe.com/docs/api/promotion_codes/list?lang=node
 *
 * @param {string} code - the stripe promo code
 * @returns {Promise<Stripe.PromotionCode | undefined>} - Promise resolving to the retrieved promo code object or undefined if not found
 */
export const stripeGetPromoCodeByCode = async (code) => {
	try {
		const response = await stripe.promotionCodes.list({ code, limit: 1 });
		console.log('stripeGetPromoCodeByCode - success - ', response);
		return response?.data?.[0];
	} catch (err) {
		console.log('stripeGetPromoCodeByCode - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Apply promo code to stripe subscription
 *
 * @see
 * https://stripe.com/docs/api/subscriptions/update?lang=node
 *
 * @param {string} subscriptionId - the stripe subscription id
 * @param {string} code - the stripe promo code
 * @returns {Promise<Stripe.Subscription>} - Promise resolving to the modified subscription object
 */
export const stripeSetSuscriptionPromoCode = async (subscriptionId, code) => {
	try {
		const response = await stripe.subscriptions.update(subscriptionId, {
			promotion_code: code,
			expand: ['latest_invoice.payment_intent'],
		});
		console.log('stripeSetSuscriptionPromoCode - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeSetSuscriptionPromoCode - error - ', err);
		throw err;
	}
};

/**
 * @summary
 * Generate Stripe payment link
 *
 * @see
 * https://stripe.com/docs/api/payment_links/create
 *
 * @param {string} priceId - The ID of the Stripe price object
 * @param {Record<string, string>} metadata - Custom metadata to associate with the payment link
 * @returns {Promise<Stripe.PaymentLink>} - Promise resolving to the created payment link object
 */
export const stripeGeneratePaymentLink = async (priceId, metadata) => {
	try {
		const response = await stripe.paymentLinks.create({
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			metadata: metadata,
			allow_promotion_codes: true,
			automatic_tax: { enabled: true }, // Enable automatic tax collection
			tax_id_collection: { enabled: true }, // Collect customer tax IDs
		});
		console.log('stripeGeneratePaymentLink - success - ', response);
		return response;
	} catch (err) {
		console.log('stripeGeneratePaymentLink - error - ', err);
		throw err;
	}
};

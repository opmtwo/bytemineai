import { MouseEvent, useState } from 'react';
import Stripe from 'stripe';

import { MONTHLY_PRICE_ID, YEARLY_PRICE_ID } from '../../../../consts';
import { useAuthContext } from '../../../../providers/auth-data-provider';
import { callApi } from '../../../../utils/helper-utils';
import Card from '../../../Card';
import FormButtonNew from '../../../form/FormButtonNew';
import IconNewCheck from '../../../icons/IconNewCheck';
import IconNewPlanBasic from '../../../icons/IconNewPlanBasic';
import IconNewPlanStandard from '../../../icons/IconNewPlanStandard';
import Slot from '../../../Slot';

const SettingsSubscriptionPlans = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [isMonthlyBusy, setIsMonthlyBusy] = useState(false);
	const [isYearlyBusy, setIsYearlyBusy] = useState(false);

	const { isActive, isTrial, isMonthly, isYearly } = useAuthContext();

	const openCustomerPortal = async () => {
		setIsBusy(true);
		try {
			const res = (await callApi(null, 'api/v1/subscriptions/me/portal', {
				method: 'GET',
			})) as { url: string };
			console.log('openCustomerPortal - success', res);
			window.location.href = res.url;
		} catch (err) {
			console.log('openCustomerPortal - error', err);
		}
		setIsBusy(false);
	};

	const openPaymentLink = async (priceId: string) => {
		setIsBusy(true);
		try {
			const res = (await callApi(null, `api/v1/subscriptions/link?id=${priceId}`, {})) as Stripe.PaymentLink;
			window.location.href = res.url;
		} catch (err) {
			console.log('getPaymentLink - error', err);
		}
		setIsBusy(false);
	};

	const openClientMonthly = async () => {
		setIsMonthlyBusy(true);
		await openPaymentLink(MONTHLY_PRICE_ID);
		setIsMonthlyBusy(false);
	};

	const openClientYearly = async () => {
		setIsYearlyBusy(true);
		await openPaymentLink(YEARLY_PRICE_ID);
		setIsYearlyBusy(false);
	};

	const plans = [
		{
			title: 'Basic plan',
			price: '$10',
			cycle: 'Monthly Subscription',
			isAnnual: false,
			isBusy: isMonthlyBusy,
			features: ['Unlimited users', 'Cancel anytime', 'Largest database of contacts', 'Mobiles', 'Personal Emails', 'Work Emails', 'API access'],
			onClick: isMonthly ? openCustomerPortal : openClientMonthly,
		},
		{
			title: 'Standard plan',
			price: '$100',
			cycle: 'Annual Subscription',
			isAnnual: true,
			isBusy: isYearlyBusy,
			features: ['Unlimited users', 'Cancel anytime', 'Largest database of contacts', 'Mobiles', 'Personal Emails', 'Work Emails', 'API access'],
			onClick: isYearly ? openCustomerPortal : openClientYearly,
		},
	];

	return (
		<Card card={{ className: 'panel has-background-white' }}>
			<Slot slot="body">
				<div className="panel-block is-block">
					<div className="columns is-centered">
						{plans.map((plan, idx) => (
							<div className="column is-half" key={idx}>
								<Card card={{ className: 'panel has-background-white' }}>
									<Slot slot="body">
										<div className="panel-block is-block has-text-centered">
											<span className="icon is-large has-text-info is-rounded has-background-white-ter">
												{plan.isAnnual ? <IconNewPlanBasic width={16} /> : <IconNewPlanStandard width={16} />}
											</span>
											<h2 className="title is-5 has-text-info my-4">{plan.title}</h2>
											<p className="title is-2 my-4">{plan.price}</p>
											<p>{plan.cycle}</p>
											<ul className="has-text-left mt-5" style={{ listStyle: 'none', paddingLeft: 0 }}>
												{plan.features.map((feature, i) => (
													<li key={i} className="my-4">
														<span className="is-relative is-clipped icon is-rounded has-text-success mr-2">
															<IconNewCheck width={10} />
															<span
																className="is-absolute has-background-success"
																style={{ opacity: 0.2, top: 0, right: 0, bottom: 0, left: 0 }}
															></span>
														</span>
														<span>{feature}</span>
													</li>
												))}
											</ul>
										</div>
									</Slot>
									<Slot slot="footer">
										<div className="p-5">
											<FormButtonNew
												type="button"
												className="is-fullwidth has-text-centered"
												variant={plan.isAnnual ? 'active' : 'default'}
												disabled={plan.isBusy}
												loading={plan.isBusy}
												onClick={plan.onClick}
											>
												{isActive ? 'Manage' : 'Select Plan'}
											</FormButtonNew>
										</div>
									</Slot>
								</Card>
							</div>
						))}
					</div>
				</div>
			</Slot>
		</Card>
	);
};

export default SettingsSubscriptionPlans;

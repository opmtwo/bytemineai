import { MouseEvent, useEffect, useState } from 'react';
import Stripe from 'stripe';

import { MONTHLY_PRICE_ID, planOptions, YEARLY_PRICE_ID } from '../../../../consts';
import { useAuthContext } from '../../../../providers/auth-data-provider';
import { callApi } from '../../../../utils/helper-utils';
import Card from '../../../Card';
import FormButtonNew from '../../../form/FormButtonNew';
import FormSelect from '../../../form/FormSelect';
import IconNewCheck from '../../../icons/IconNewCheck';
import IconNewPlanBasic from '../../../icons/IconNewPlanBasic';
import IconNewPlanStandard from '../../../icons/IconNewPlanStandard';
import Slot from '../../../Slot';

const SettingsSubscriptionPlans = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [isMonthlyBusy, setIsMonthlyBusy] = useState(false);
	const [isYearlyBusy, setIsYearlyBusy] = useState(false);

	const [creditPlan, setCreditPlan] = useState<string>();
	const [creditPlanError, setCreditPlanError] = useState<Error>();

	const { isActive, isTrial, isMonthly, isYearly } = useAuthContext();

	const [monthlyOption, setMonthlyOption] = useState(planOptions[0]);
	const [yearlyOption, setYearlyOption] = useState(planOptions[1]);

	useEffect(() => {
		const planId = creditPlan || '';

		if (['PLAN_STARTER_MONTHLY', 'PLAN_STARTER_YEARLY'].includes(planId)) {
			setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_STARTER_MONTHLY')!);
			setYearlyOption(planOptions.find((p) => p.id === 'PLAN_STARTER_YEARLY')!);
		}

		if (['PLAN_GROWTH_MONTHLY', 'PLAN_GROWTH_YEARLY'].includes(planId)) {
			setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_GROWTH_MONTHLY')!);
			setYearlyOption(planOptions.find((p) => p.id === 'PLAN_GROWTH_YEARLY')!);
		}

		if (['PLAN_PRO_MONTHLY', 'PLAN_PRO_YEARLY'].includes(planId)) {
			setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_PRO_MONTHLY')!);
			setYearlyOption(planOptions.find((p) => p.id === 'PLAN_PRO_YEARLY')!);
		}

		if (['PLAN_BUSINESS_MONTHLY', 'PLAN_BUSINESS_YEARLY'].includes(planId)) {
			setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_BUSINESS_MONTHLY')!);
			setYearlyOption(planOptions.find((p) => p.id === 'PLAN_BUSINESS_YEARLY')!);
		}

		if (['PLAN_ENTERPRISE_MONTHLY', 'PLAN_ENTERPRISE_YEARLY'].includes(planId)) {
			setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_ENTERPRISE_MONTHLY')!);
			setYearlyOption(planOptions.find((p) => p.id === 'PLAN_ENTERPRISE_YEARLY')!);
		}
	}, [creditPlan]);

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
		if (!monthlyOption) {
			return;
		}
		setIsMonthlyBusy(true);
		await openPaymentLink(monthlyOption.priceId);
		setIsMonthlyBusy(false);
	};

	const openClientYearly = async () => {
		if (!yearlyOption) {
			return;
		}
		setIsYearlyBusy(true);
		await openPaymentLink(yearlyOption.priceId);
		setIsYearlyBusy(false);
	};

	const onConfirm = async () => {
		const planId = planOptions.find((p) => p.id === creditPlan);
		if (!planId) {
			return;
		}
		await openPaymentLink(planId.priceId);
	};

	const plans = [
		{
			title: monthlyOption.name,
			price: monthlyOption.price,
			cycle: 'Monthly Subscription',
			isAnnual: false,
			isBusy: isMonthlyBusy,
			features: ['Unlimited users', 'Cancel anytime', 'Largest database of contacts', 'Mobiles', 'Personal Emails', 'Work Emails', 'API access'],
			onClick: isMonthly || isYearly ? undefined : openClientMonthly,
		},
		{
			title: yearlyOption.name,
			price: yearlyOption.price,
			cycle: 'Annual Subscription',
			isAnnual: true,
			isBusy: isYearlyBusy,
			features: ['Unlimited users', 'Cancel anytime', 'Largest database of contacts', 'Mobiles', 'Personal Emails', 'Work Emails', 'API access'],
			onClick: isMonthly || isYearly ? undefined : openClientYearly,
		},
	];

	return (
		<>
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
												<p className="title is-2 my-4">${plan.price}</p>
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
													disabled={plan.isBusy || !plan.onClick}
													loading={plan.isBusy}
													onClick={plan.onClick}
												>
													Select Plan
												</FormButtonNew>
											</div>
										</Slot>
									</Card>
								</div>
							))}
						</div>
						<div className="has-radius has-rounded">
							<h3 className="title is-4 my-5">Add Additional Credits</h3>
							<FormSelect
								name="creditPlan"
								placeholder="Select Credits"
								value={creditPlan}
								onChange={setCreditPlan}
								error={creditPlanError}
								options={planOptions}
								idField="id"
								nameField="name"
								label=""
							/>
							{creditPlan && !isActive ? (
								<div className="mt-5">
									<FormButtonNew type="button" variant="active" style={{ width: 160 }} disabled={isBusy} loading={isBusy} onClick={onConfirm}>
										Confirm
									</FormButtonNew>
								</div>
							) : null}
							{isActive ? (
								<p className="has-text-danger has-text-weight-semibold my-5">
									Please cancel your active subscription before switching to another plan.
								</p>
							) : null}
						</div>
					</div>
				</Slot>
			</Card>
		</>
	);
};

export default SettingsSubscriptionPlans;

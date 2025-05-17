import { MouseEvent, useEffect, useState } from 'react';
import Stripe from 'stripe';

import { MONTHLY_PRICE_ID, planOptions, YEARLY_PRICE_ID } from '../../../../consts';
import { useAuthContext } from '../../../../providers/auth-data-provider';
import { callApi } from '../../../../utils/helper-utils';
import Card from '../../../Card';
import FormButtonNew from '../../../form/FormButtonNew';
import FormField from '../../../form/FormField';
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

	const [monthlyPriceId, setMonthlyPriceId] = useState(planOptions[0].priceId);
	const [yearlyPriceId, setYearlyPriceId] = useState(planOptions[1].priceId);

	// useEffect(() => {
	// 	const planId = creditPlan || '';

	// 	if (['PLAN_STARTER_MONTHLY', 'PLAN_STARTER_YEARLY'].includes(planId)) {
	// 		setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_STARTER_MONTHLY')!);
	// 		setYearlyOption(planOptions.find((p) => p.id === 'PLAN_STARTER_YEARLY')!);
	// 	}

	// 	if (['PLAN_GROWTH_MONTHLY', 'PLAN_GROWTH_YEARLY'].includes(planId)) {
	// 		setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_GROWTH_MONTHLY')!);
	// 		setYearlyOption(planOptions.find((p) => p.id === 'PLAN_GROWTH_YEARLY')!);
	// 	}

	// 	if (['PLAN_PRO_MONTHLY', 'PLAN_PRO_YEARLY'].includes(planId)) {
	// 		setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_PRO_MONTHLY')!);
	// 		setYearlyOption(planOptions.find((p) => p.id === 'PLAN_PRO_YEARLY')!);
	// 	}

	// 	if (['PLAN_BUSINESS_MONTHLY', 'PLAN_BUSINESS_YEARLY'].includes(planId)) {
	// 		setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_BUSINESS_MONTHLY')!);
	// 		setYearlyOption(planOptions.find((p) => p.id === 'PLAN_BUSINESS_YEARLY')!);
	// 	}

	// 	if (['PLAN_ENTERPRISE_MONTHLY', 'PLAN_ENTERPRISE_YEARLY'].includes(planId)) {
	// 		setMonthlyOption(planOptions.find((p) => p.id === 'PLAN_ENTERPRISE_MONTHLY')!);
	// 		setYearlyOption(planOptions.find((p) => p.id === 'PLAN_ENTERPRISE_YEARLY')!);
	// 	}
	// }, [creditPlan]);

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
		if (!monthlyPriceId) {
			return;
		}
		setIsMonthlyBusy(true);
		await openPaymentLink(monthlyPriceId);
		setIsMonthlyBusy(false);
	};

	const openClientYearly = async () => {
		if (!yearlyPriceId) {
			return;
		}
		setIsYearlyBusy(true);
		await openPaymentLink(yearlyPriceId);
		setIsYearlyBusy(false);
	};

	const onConfirm = async () => {
		const planId = planOptions.find((p) => p.id === creditPlan);
		if (!planId) {
			return;
		}
		await openPaymentLink(planId.priceId);
	};

	const yearlyPlanOptions = planOptions.filter((p) => p.interval === 'yearly');
	const monthlyPlanOptions = planOptions.filter((p) => p.interval === 'monthly');

	const yearlyOption = planOptions.find((p) => p.priceId === yearlyPriceId) || yearlyPlanOptions[0];
	const monthlyOption = planOptions.find((p) => p.priceId === monthlyPriceId) || monthlyPlanOptions[0];

	const plans = [
		{
			title: 'Annual',
			price: yearlyOption.price,
			cycle: 'Annual Subscription',
			isAnnual: true,
			isBusy: isYearlyBusy,
			isDisabled: !yearlyPriceId || isYearlyBusy,
			features: [
				'Unlimited users',
				'1 Credit = All Data Attributes',
				'Built-in Work Email Validation',
				'Mobile Numbers',
				'Personal Emails',
				'Work Emails',
				'API access',
			],
			options: yearlyPlanOptions,
			onClick: isMonthly || isYearly ? undefined : openClientYearly,
			onChange: (value: string) => setYearlyPriceId(value),
		},
		{
			title: 'Monthly',
			price: monthlyOption.price,
			cycle: 'Monthly Subscription',
			isAnnual: false,
			isBusy: isMonthlyBusy,
			isDisabled: !monthlyPriceId || isMonthlyBusy,
			features: [
				'Unlimited users',
				'1 Credit = All Data Attributes',
				'Built-in Work Email Validation',
				'Mobile Numbers',
				'Personal Emails',
				'Work Emails',
				'API access',
			],
			options: monthlyPlanOptions,
			onClick: isMonthly || isYearly ? undefined : openClientMonthly,
			onChange: (value: string) => setMonthlyPriceId(value),
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
													{plan.isAnnual ? <IconNewPlanStandard width={20} /> : <IconNewPlanBasic width={20} />}
												</span>
												<h2 className="title is-5 has-text-info my-4">{plan.title}</h2>
												<p className="title is-2 my-4">${plan.price}</p>
												{/* <p>{plan.cycle}</p> */}
												{/* <p className="has-text-weight-semibold">
													{plan.isAnnual ? yearlyOption?.credits : monthlyOption?.credits} credits
												</p> */}
												{/* <p className="my-5 has-text-left">Features</p> */}
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
											<div className="has-background-white-bis p-5">
												<FormField>
													<FormSelect
														name="creditPlan"
														placeholder="Select Credits"
														value={creditPlan}
														onChange={plan.onChange}
														error={creditPlanError}
														options={plan.options}
														idField="priceId"
														nameField="label"
														label=""
													/>
												</FormField>
												<FormField>
													<FormButtonNew
														type="button"
														className="is-fullwidth has-text-centered"
														variant={plan.isAnnual ? 'active' : 'default'}
														disabled={plan.isDisabled}
														loading={plan.isBusy}
														onClick={plan.onClick}
													>
														Select Plan
													</FormButtonNew>
												</FormField>
											</div>
										</Slot>
									</Card>
								</div>
							))}
						</div>
						{/* <div className="has-radius has-rounded">
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
						</div> */}
					</div>
				</Slot>
			</Card>
		</>
	);
};

export default SettingsSubscriptionPlans;

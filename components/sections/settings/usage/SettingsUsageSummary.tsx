import moment from 'moment';

import { useAuthContext } from '../../../../providers/auth-data-provider';
import { formatNum } from '../../../../utils/helper-utils';
import Card from '../../../Card';
import IconNewCredits from '../../../icons/IconNewCredits';
import IconNewPaid from '../../../icons/IconNewPaid';
import IconNewPlan from '../../../icons/IconNewPlan';
import IconNewRenewal from '../../../icons/IconNewRenewal';
import Slot from '../../../Slot';

const SettingsUsageSummary = () => {
	const { subscription } = useAuthContext();

	const options = [
		{
			id: 'current-credits',
			bg: '#9068D0',
			icon: <IconNewCredits width={32} />,
			text: 'Current Credits',
			value: formatNum((subscription?.currentCredits || 0).toString()),
		},
		{
			id: 'monthly-credits',
			bg: '#9068D0',
			icon: <IconNewCredits width={32} />,
			text: 'Monthly Credits',
			value: formatNum((subscription?.monthlyCredits || 0).toString()),
		},
		{
			id: 'plan',
			bg: '#D84C10',
			icon: <IconNewPlan width={32} />,
			text: 'Plan',
			value: subscription?.subscriptionStatus || 'Trial',
		},
		{
			id: 'quarterly-bonus-credits',
			bg: '#D84C10',
			icon: <IconNewPlan width={32} />,
			text: 'Quarterly Bonus Credits',
			value: formatNum((subscription?.quarterlyCredits || 0).toString()),
		},
		{
			id: 'renewal',
			bg: '#0084FF',
			icon: <IconNewRenewal width={32} />,
			text: 'Renewal',
			value: 'Monthly',
		},
		{
			id: 'annual-credits',
			bg: '#0084FF',
			icon: <IconNewRenewal width={32} />,
			text: 'Annual Credits',
			value: formatNum((subscription?.annualCredits || 0).toString()),
		},
		{
			id: 'last-paid',
			bg: '#52BA69',
			icon: <IconNewPaid width={32} />,
			text: 'Last Paid',
			value: subscription?.lastPaid ? moment(subscription?.lastPaid).format('MM/DD/YYYY') : 'NA',
		},
		{
			id: 'created',
			bg: '#52BA69',
			icon: <IconNewPaid width={32} />,
			text: 'Created',
			value: subscription?.lastPaid ? moment(subscription?.createdAt).format('MM/DD/YYYY') : 'NA',
		},
	];

	return (
		<>
			<Card card={{ className: 'panel has-background-white' }}>
				<Slot slot="body">
					<div className="panel-block is-block">
						<div className="columns is-tablet is-multiline">
							{options.map((_option) => {
								return (
									<div key={_option.id} className="column is-6-tablet">
										<div className="is-flex is-align-items-center has-radius has-border has-backgroud-white-bis p-5">
											<div
												className="is-relative is-clipped is-flex is-align-items-center is-justify-content-center has-radius"
												style={{
													width: 60,
													height: 60,
												}}
											>
												<div className="is-absolute" style={{ opacity: 0.2, top: 0, right: 0, bottom: 0, left: 0, backgroundColor: _option.bg }}></div>
												{_option.icon}
											</div>
                                            <div className="ml-5">
                                                <h4 className="title is-4 has-text-dark has-text-weight-medium mb-3">{_option.value}</h4>
                                                <p className="has-text-grey has-text-weight-light">{_option.text}</p>
                                            </div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Slot>
			</Card>
		</>
	);
};

export default SettingsUsageSummary;

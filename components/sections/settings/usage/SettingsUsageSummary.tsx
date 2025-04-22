import moment from 'moment';

import { formatNum } from '../../../../utils/helper-utils';
import Card from '../../../Card';
import IconNewCredits from '../../../icons/IconNewCredits';
import IconNewPaid from '../../../icons/IconNewPaid';
import IconNewPlan from '../../../icons/IconNewPlan';
import IconNewRenewal from '../../../icons/IconNewRenewal';
import Slot from '../../../Slot';

const SettingsUsageSummary = () => {
	const options = [
		{
			id: 'current-credits',
			bg: '#9068D0',
			icon: <IconNewCredits width={32} />,
			text: 'Current Credits',
			value: formatNum((976275).toString()),
		},
		{
			id: 'monthly-credits',
			bg: '#9068D0',
			icon: <IconNewCredits width={32} />,
			text: 'Monthly Credits',
			value: formatNum((1000000).toString()),
		},
		{
			id: 'plan',
			bg: '#D84C10',
			icon: <IconNewPlan width={32} />,
			text: 'Plan',
			value: 'Active Customer',
		},
		{
			id: 'quarterly-bonus-credits',
			bg: '#D84C10',
			icon: <IconNewPlan width={32} />,
			text: 'Quarterly Bonus Credits',
			value: formatNum((10000).toString()),
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
			value: '0',
		},
		{
			id: 'last-paid',
			bg: '#52BA69',
			icon: <IconNewPaid width={32} />,
			text: 'Last Paid',
			value: moment().format('DD/MM/YYYY'),
		},
		{
			id: 'created',
			bg: '#52BA69',
			icon: <IconNewPaid width={32} />,
			text: 'Created',
			value: moment().format('DD/MM/YYYY'),
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

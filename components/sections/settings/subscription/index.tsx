import AccountMenu from '../../../AccountMenu';
import SettingsSubscriptionPlans from './SettingsSubscriptionPlans';

const SectionSettingsSubscription = () => {
	return (
		<div className="columns is-tablet">
			<div className="column is-4-tablet is-3-widescreen">
				<AccountMenu />
			</div>
			<div className="column is-8-tablet is-9-widescreen">
				<SettingsSubscriptionPlans />
			</div>
		</div>
	);
};

export default SectionSettingsSubscription;

import { useAuthContext } from '../../../../providers/auth-data-provider';
import AccountMenu from '../../../AccountMenu';
import LoaderFullscreen from '../../../LoaderFullscreen';
import SettingsSubscriptionPlans from './SettingsSubscriptionPlans';

const SectionSettingsSubscription = () => {
	const { isLoading } = useAuthContext();

	return (
		<>
			{isLoading ? <LoaderFullscreen /> : null}
			<div className="columns is-tablet">
				<div className="column is-4-tablet is-3-widescreen">
					<AccountMenu />
				</div>
				<div className="column is-8-tablet is-9-widescreen">
					<SettingsSubscriptionPlans />
				</div>
			</div>
		</>
	);
};

export default SectionSettingsSubscription;

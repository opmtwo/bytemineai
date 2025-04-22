import AccountMenu from '../../../AccountMenu';
import SettingsUsageInfo from './SettingsUsageInfo';
import SettingsUsageSummary from './SettingsUsageSummary';

const SectionSettingsUsage = () => {
	return (
		<div className="columns is-tablet">
			<div className="column is-4-tablet is-3-widescreen">
				<AccountMenu />
			</div>
			<div className="column is-8-tablet is-9-widescreen">
                <SettingsUsageSummary />
                <SettingsUsageInfo />
			</div>
		</div>
	);
};

export default SectionSettingsUsage;

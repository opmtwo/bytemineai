import AccountMenu from '../../../AccountMenu';
import SettingsAccountForm from './SettingsAccountForm';

const SectionSettingsAccount = () => {
	return (
		<div className="columns is-tablet">
			<div className="column is-4-tablet is-3-widescreen">
				<AccountMenu />
			</div>
			<div className="column is-8-tablet is-9-widescreen">
				<SettingsAccountForm />
			</div>
		</div>
	);
};

export default SectionSettingsAccount;

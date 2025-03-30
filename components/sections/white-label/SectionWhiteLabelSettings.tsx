import { useAuthContext } from '../../../providers/auth-data-provider';
import { useSettingsContext } from '../../../providers/settings-provider';
import AccountMenu from '../../AccountMenu';
import CustomizeForm from '../../CustomizeForm';
import Loader from '../../Loader';

const SectionWhiteLabelSettings = () => {
	const { user } = useAuthContext();
	const { settings, initSettings } = useSettingsContext();
	const groupname = user?.attributes['custom:group_name'];

	const onSubmit = async () => {
		if (groupname) {
			await initSettings(groupname);
		}
	};

	return (
		<div className="columns is-tablet">
			<div className="column is-3-tablet is-2-widescreen">
				<AccountMenu />
			</div>
			<div className="column is-9-tablet is-10-widescreen">
				{settings !== undefined && groupname && groupname !== 'nymblr' ? (
					<CustomizeForm
						settings={settings}
						groupName={groupname}
						onSubmit={onSubmit}
						title="White-Label Settings"
						submitButtonLabel="Save"
					/>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default SectionWhiteLabelSettings;

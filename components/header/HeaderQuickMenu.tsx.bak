import { useAuthContext } from '../../providers/auth-data-provider';
import { useSettingsContext } from '../../providers/settings-provider';
import Anchor from '../Anchor';
import FormButton from '../form/FormButton';
import IconAvatar from '../icons/IconAvatar';
import { useRouter } from 'next/router';

const HeaderQuickMenu = () => {
	const { user, isAdmin, isRoot } = useAuthContext();
	const { canUpgrade } = useSettingsContext();
    const router = useRouter();

    const onUpgrade = async () => {
        await router.push('/account-settings/subscription-billing/plan');
    }
	return (
		<div className="navbar-item navbar-quickmenu">
			{canUpgrade && (
				<FormButton className="m-0" onClick={onUpgrade}>
					Upgrade
				</FormButton>
			)}
			<div className="navbar-item has-dropdown is-hoverable">
				<FormButton
					icon={<IconAvatar />}
					size="is-medium"
					variant={['is-icon', 'is-rounded', 'is-outlined']}
					className="ml-5"
					color="is-primary"
				/>
				<div className="navbar-dropdown is-right">
					<div className="navbar-dropdown-card">
						<div className="navbar-item pb-0" style={{ height: 'auto' }}>
							<strong>
								<small>{user?.attributes.given_name} {user?.attributes.family_name}</small>
							</strong>
						</div>

						{isAdmin || isRoot ? (
							<Anchor href="/account-settings" className="navbar-item">
								Account Settings
							</Anchor>
						) : null}

						{isRoot ? (
							<Anchor href="/admin-panel" className="navbar-item">
								Admin Panel
							</Anchor>
						) : null}
						{/*
						<Anchor href="/my-contacts" className="navbar-item">
							All Contacts
						</Anchor>*/}
						<Anchor href="/logout" className="navbar-item has-text-weight-normal">
							Log out
						</Anchor>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderQuickMenu;

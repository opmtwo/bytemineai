import { useRouter } from 'next/router';

import { useAuthContext } from '../../providers/auth-data-provider';
import Anchor from '../Anchor';
import FormButton from '../form/FormButton';
import IconAvatar from '../icons/IconAvatar';
import { cleanupBodyClassList } from '../../utils/helper-utils';
import FormButtonNew from '../form/FormButtonNew';

const HeaderQuickMenu = () => {
	const { user, isAdmin, isRoot, attributes } = useAuthContext();
	// const { canUpgrade } = useSettingsContext();
	const router = useRouter();

	const { self, refresh } = useAuthContext();

	const avatarUrl = self?.avatarS3Url ?? '/avatar.png';

	const canUpgrade = false;

	const onUpgrade = async () => {
		await router.push('/settings/subscription');
	};

	return (
		<div className="navbar-item navbar-quickmenu">
			{canUpgrade && (
				<FormButtonNew type="button" variant="active" className="m-0" onClick={onUpgrade}>
					Upgrade
				</FormButtonNew>
			)}
			<div className="navbar-item has-dropdown is-hoverable">
				{/* <FormButton icon={<IconAvatar />} size="is-medium" variant={['is-icon', 'is-rounded', 'is-outlined']} className="ml-5" color="is-primary" /> */}
				<div className="is-clipped image is-48x48 has-radius is-rounded">
					<img src={avatarUrl} alt="" style={{ maxHeight: 'none' }} />
				</div>

				<div className="navbar-dropdown is-right">
					<div className="navbar-dropdown-card">
						<div className="navbar-item mb-3" style={{ height: 'auto', lineHeight: 1 }}>
							<strong className="has-text-grey">
								<small className="has-text-dark">
									{self?.name || `${self?.givenName || ''} ${self?.familyName || ''}`}
									<br />
									<small className="has-text-grey">{self?.email}</small>
								</small>
							</strong>
						</div>

						{isAdmin || isRoot ? (
							<Anchor href="/settings/account" className="navbar-item py-3">
								Account Settings
							</Anchor>
						) : null}

						{isRoot ? (
							<Anchor href="/admin-panel" className="navbar-item py-3">
								Admin Panel
							</Anchor>
						) : null}
						{/*
						<Anchor href="/my-contacts" className="navbar-item py-3">
							All Contacts
						</Anchor>*/}
						<Anchor href="/logout" className="navbar-item py-3 has-text-weight-normal" onClick={cleanupBodyClassList}>
							Log out
						</Anchor>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderQuickMenu;

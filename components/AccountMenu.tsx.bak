import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useAuthContext } from '../providers/auth-data-provider';
import { useSettingsContext } from '../providers/settings-provider';
import { Roles } from '../types';
import Anchor from './Anchor';

const AccountMenu = () => {
	const router = useRouter();
	const { isAdmin, isRoot, user } = useAuthContext();
	const { settings, canUpgrade } = useSettingsContext();
	const isUser = user?.attributes['custom:role'] === Roles.User;
	const isManager = user?.attributes['custom:role'] === Roles.Manager;
	const canAccess = isRoot || isAdmin || isManager;
    //const subscriptionsURL = canUpgrade ? '/account-settings/subscription-billing/plan' : '/account-settings/subscription-billing';
    const subscriptionsURL = canUpgrade ? '/account-settings/subscription-billing/plan' : 'https://billing.stripe.com/p/login/4gwg0Lep1aYO6JOcMM';
    const menuItems = [
		{
			title: 'Account Settings',
			href: '/account-settings',
			canAccess: canAccess,
        },
        {
            title: 'Subscription & Billing',
            href: subscriptionsURL,
            canAccess: canAccess,
        },
		{
			title: 'White Label Settings',
			href: '/account-settings/white-label-settings',
			canAccess: isManager || isAdmin || isRoot,
		},
		{
			title: 'My Team',
			href: '/account-settings/my-team',
			canAccess: isManager || isAdmin || isRoot,
		},
		{
			title: 'Usage',
			href: '/account-settings/usage',
			canAccess: isManager || isAdmin || isRoot,
		},
		{
			title: 'Connect Email',
			href: '/account-settings/connect-email',
			canAccess: settings?.['custom:has_email'],
		},
		{
			title: 'API',
			href: '/account-settings/api',
			canAccess: settings?.['custom:has_api'],
		}
	];

	const items = menuItems
		.filter((item) => item.canAccess)
		.map((item) => {
			const isActive = router.pathname === item.href;
			return (
				<Anchor
					key={item.title}
					href={item.href}
					className={classNames('is-size-6 py-3', isActive ? 'has-text-primary' : 'has-text-grey')}
				>
					{item.title}
				</Anchor>
			);
		});

	return <div className="is-flex is-flex-direction-column">{items}</div>;
};

export default AccountMenu;

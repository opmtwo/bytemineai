import classNames from 'classnames';
import { useRouter } from 'next/router';

import { useAuthContext } from '../providers/auth-data-provider';
import Anchor from './Anchor';
import Card from './Card';
import Slot from './Slot';
import IconNewAccount from './icons/IconNewAccount';
import IconNewSubscription from './icons/IconNewSubscription';
import IconNewTeam from './icons/IconNewTeam';
import IconNewUsage from './icons/IconNewUsage';

const AccountMenu = () => {
	const router = useRouter();

	const { isRoot, isAdmin, isManager, isEditor, isViewer } = useAuthContext();

	const canUpgrade = isRoot || isAdmin || isManager || true;

	// const subscriptionsURL = canUpgrade ? '/account-settings/subscription-billing/plan' : 'https://billing.stripe.com/p/login/4gwg0Lep1aYO6JOcMM';
	// const subscriptionsURL = canUpgrade ? '/account-settings/subscription-billing/plan' : 'https://billing.stripe.com/p/login/4gwg0Lep1aYO6JOcMM';

	const menuItems = [
		{
			icon: <IconNewAccount width={18} stroke="currentColor" />,
			title: <span>Account Settings</span>,
			href: '/settings/account',
			canAccess: true,
		},
		{
			icon: <IconNewSubscription width={18} stroke="currentColor" />,
			title: <span>Subscription & Billing</span>,
			href: '/settings/subscription',
			canAccess: canUpgrade,
		},
		// {
		// 	title: 'White Label Settings',
		// 	href: '/account-settings/white-label-settings',
		// 	canAccess: isManager || isAdmin || isRoot || true,
		// },
		// {
		// 	icon: <IconNewTeam width={18} stroke="currentColor" />,
		// 	title: <span>My Team</span>,
		// 	href: '/settings/team',
		// 	canAccess: isManager || isAdmin || isRoot || true,
		// },
		{
			icon: <IconNewUsage width={18} stroke="currentColor" />,
			title: <span>Usage</span>,
			href: '/settings/usage',
			canAccess: isManager || isAdmin || isRoot || true,
		},
	];

	const items = menuItems
		.filter((item) => item.canAccess)
		.map((item) => {
			const isActive = router.pathname === item.href;
			return (
				<Anchor
					key={item.href}
					href={item.href}
					className={classNames('is-flex is-align-items-center is-size-6 p-4', isActive ? 'has-radius has-text-primary has-background-white-bis' : 'has-text-grey')}
				>
					{item.icon}
					<span className="ml-3">{item.title}</span>
				</Anchor>
			);
		});

	return (
		<Card>
			<Slot slot="body">
				<div className="panel-block is-flex-direction-column is-align-items-stretch has-text-weight-semibold">{items}</div>
			</Slot>
		</Card>
	);
};

export default AccountMenu;

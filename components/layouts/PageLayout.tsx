import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Children, MouseEvent, ReactElement, ReactNode, useEffect, useState } from 'react';

import { useAuthContext } from '../../providers/auth-data-provider';
import { useHeader } from '../../providers/header-provider';
import { useSettingsContext } from '../../providers/settings-provider';
import ContactForm from '../ContactForm';
import Header from '../header/Header';
import IconNewApi from '../icons/IconNewApi';
import IconNewDashboard from '../icons/IconNewDashboard';
import IconNewEnrich from '../icons/IconNewEnrich';
import IconNewMyLists from '../icons/IconNewMyLists';
import IconNewProspectFinder from '../icons/IconNewProspectFinder';
import IconNewSettings from '../icons/IconNewSettings';
import IconNewSignOut from '../icons/IconNewSignOut';
import IconNewSupport from '../icons/IconNewSupport';
import IconNewTeam from '../icons/IconNewTeam';
import IconNewToggleSidebar from '../icons/IconNewToggleSidebar';
import Modal from '../modals/Modal';
import Sidebar, { SidebarMenuItem } from '../Sidebar';

const PageLayout = ({
	children,
	size = 'is-fluid',
}: {
	children: ReactNode;
	size?: 'is-fullhd' | 'is-widescreen' | 'is-max-desktop' | 'is-max-widescreen' | 'is-fluid' | '';
}) => {
	const router = useRouter();
	const pathName = router?.asPath;
	const childrenArray = Children.toArray(children) as unknown as ReactElement[];
	const [isContactModalActive, setIsContactModalActive] = useState(false);

	const { onCompactToggle } = useHeader();

	const { attributes } = useAuthContext();
	const { settings, initSettings } = useSettingsContext();
	const groupName = attributes?.['custom:group_name'];
	const currentPathName =
		pathName === '/campaigns/summary/' || pathName === '/campaigns/contacts/' || pathName === '/campaigns/settings/' || pathName === '/campaigns/builder/';
	useEffect(() => {
		groupName && initSettings(groupName);
	}, [groupName]);

	useEffect(() => {
		document.body.style.setProperty('--primary', settings?.['custom:color_code'] || '');
	}, [settings?.['custom:color_code']]);

	useEffect(() => {
		document.body.classList.add('is-dashboard');
		return () => {
			document.body.classList.remove('is-dashboard');
		};
	}, []);

	const onUpgrade = () => setIsContactModalActive(true);

	const onUpgradeCancel = () => setIsContactModalActive(false);

	const onUpgradeSubmit = () => {};

	const menuItemsTop: SidebarMenuItem[] = [
		{ label: 'Dashboard', icon: <IconNewDashboard width={18} />, href: '/' },
		{ label: 'Prospect Finder', icon: <IconNewProspectFinder width={18} />, href: '/' },
		{ label: 'My Lists', icon: <IconNewMyLists width={18} />, href: '/' },
		{ label: 'My Team', icon: <IconNewTeam width={18} />, href: '/' },
		{ label: 'Enrich', icon: <IconNewEnrich width={18} />, href: '/' },
		{ label: 'API', icon: <IconNewApi width={18} />, href: '/' },
	];

	const menuItemsBottom: SidebarMenuItem[] = [
		{ label: 'Account Settings', icon: <IconNewSettings width={18} />, href: '/' },
		{ label: 'Support', icon: <IconNewSupport width={18} />, href: '/' },
		{ label: 'Sign out', icon: <IconNewSignOut width={18} />, href: '/' },
		{
			label: 'Toggle',
			icon: <IconNewToggleSidebar width={18} />,
			href: '#',
			onClick: (e: MouseEvent<HTMLAnchorElement>) => {
				e.preventDefault();
				onCompactToggle();
				console.log('ewerwer');
			},
		},
	];

	return (
		<>
			<Header onUpgrade={onUpgrade} />
			<Sidebar items={menuItemsTop} bottomItems={menuItemsBottom} />
			<main className={classNames(currentPathName === true ? '' : 'container', size)}>{children}</main>
			<Modal isActive={isContactModalActive} onCancel={onUpgradeCancel}>
				<ContactForm onSubmit={onUpgradeSubmit} onCancel={onUpgradeCancel} />
			</Modal>
		</>
	);
};

export default PageLayout;

import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import AdminGuard from '../../guards/AdminGuard';
import SectionSettingsAccount from '../../components/sections/settings/account';

const SettingsAccount = () => {
	return (
		<>
			<Head>
				<title>Account Settings</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionSettingsAccount />
			</PageLayout>
		</>
	);
};

export default SettingsAccount;

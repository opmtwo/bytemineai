import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionSettingsUsage from '../../components/sections/settings/usage';
import ModGuard from '../../guards/ModGuard';
import UserGuard from '../../guards/UserGuard';

const SettingsUsage = () => {
	return (
		<UserGuard>
			<Head>
				<title>Account Info | Usage</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionSettingsUsage />
			</PageLayout>
		</UserGuard>
	);
};

export default SettingsUsage;

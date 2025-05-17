import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionSettingsSubscription from '../../components/sections/settings/subscription';
import ModGuard from '../../guards/ModGuard';
import UserGuard from '../../guards/UserGuard';

const SettingsSubscription = () => {
	return (
		<UserGuard>
			<Head>
				<title>Subscription Info</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionSettingsSubscription />
			</PageLayout>
		</UserGuard>
	);
};

export default SettingsSubscription;

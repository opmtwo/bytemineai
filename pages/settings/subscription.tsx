import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionSettingsSubscription from '../../components/sections/settings/subscription';
import ModGuard from '../../guards/ModGuard';

const SettingsSubscription = () => {
	return (
		<>
			<Head>
				<title>Subscription Info</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionSettingsSubscription />
			</PageLayout>
		</>
	);
};

export default SettingsSubscription;

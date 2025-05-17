import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionSettingsTeam from '../../components/sections/settings/team';
import ModGuard from '../../guards/ModGuard';
import UserGuard from '../../guards/UserGuard';

const SettingsMyTeam = () => {
	return (
		<UserGuard>
			<Head>
				<title>My Team</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionSettingsTeam />
			</PageLayout>
		</UserGuard>
	);
};

export default SettingsMyTeam;

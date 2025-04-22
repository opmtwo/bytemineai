import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionSettingsTeam from '../../components/sections/settings/team';
import ModGuard from '../../guards/ModGuard';

const SettingsMyTeam = () => {
	return (
		<>
			<Head>
				<title>My Team</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionSettingsTeam />
			</PageLayout>
		</>
	);
};

export default SettingsMyTeam;

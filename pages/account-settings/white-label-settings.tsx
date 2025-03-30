import Head from 'next/head';
import ModGuard from '../../guards/ModGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionWhiteLabelSettings from '../../components/sections/white-label/SectionWhiteLabelSettings';

const WhiteLabelSettings = () => {
	return (
		<ModGuard>
			<Head>
				<title>White-Label Settings</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionWhiteLabelSettings />
			</PageLayout>
		</ModGuard>
	);
};

export default WhiteLabelSettings;

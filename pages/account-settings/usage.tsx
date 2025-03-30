import Head from 'next/head';
import ModGuard from '../../guards/ModGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionUsage from '../../components/sections/usage/SectionUsage';

const Usage = () => {
	return (
		<ModGuard>
			<Head>
				<title>Usage</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionUsage />
			</PageLayout>
		</ModGuard>
	);
};

export default Usage;

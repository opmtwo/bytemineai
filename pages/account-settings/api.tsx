import Head from 'next/head';
import ModGuard from '../../guards/ModGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionApi from '../../components/sections/api/SectionApi';

const Api = () => {
	return (
		<ModGuard>
			<Head>
				<title>API</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionApi />
			</PageLayout>
		</ModGuard>
	);
};

export default Api;

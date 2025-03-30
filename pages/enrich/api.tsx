import Head from 'next/head';
import UserGuard from '../../guards/UserGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionEnrichApi from '../../components/sections/enrich/SectionEnrichApi';

const EnrichBulk = () => {
	return (
		<UserGuard>
			<Head>
				<title>API Enrichment</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionEnrichApi />
			</PageLayout>
		</UserGuard>
	);
};

export default EnrichBulk;

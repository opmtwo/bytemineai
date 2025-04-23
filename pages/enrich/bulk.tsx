import Head from 'next/head';
import UserGuard from '../../guards/UserGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionEnrichBulk from '../../components/sections/enrich/SectionEnrichBulk';

const EnrichBulk = () => {
	return (
		<UserGuard>
			<Head>
				<title>Bulk Enrichment</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionEnrichBulk />
			</PageLayout>
		</UserGuard>
	);
};

export default EnrichBulk;

import Head from 'next/head';
import UserGuard from '../../guards/UserGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionEnrichRecord from '../../components/sections/enrich/SectionEnrichRecord';

const EnrichRecord = () => {
	return (
		<UserGuard>
			<Head>
				<title>Record Enrichment</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionEnrichRecord />
			</PageLayout>
		</UserGuard>
	);
};

export default EnrichRecord;

import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionEnrichments from '../../components/sections/enrichment/SectionEnrichments';
import UserGuard from '../../guards/UserGuard';
import CrudProvider from '../../providers/crud-provider';
import awsmobile from '../../src/aws-exports';

const EnrichmentsIndex = () => {
	return (
		<UserGuard>
			<Head>
				<title>Bulk Enrichment</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<CrudProvider baseApi={awsmobile.aws_cloud_logic_custom[0].name} baseUrl="api/v1/enrichments" searchKeys={['name', 'slug']} baseSortMap={[]}>
					<SectionEnrichments />
				</CrudProvider>
			</PageLayout>
		</UserGuard>
	);
};

export default EnrichmentsIndex;

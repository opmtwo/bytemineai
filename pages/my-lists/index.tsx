import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionMyLists from '../../components/sections/my-lists/SectionMyLists';
import UserGuard from '../../guards/UserGuard';
import CrudProvider from '../../providers/crud-provider';
import awsmobile from '../../src/aws-exports';

const MyLists = () => {
	return (
		<>
			<Head>
				<title>My Lists</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<CrudProvider baseApi={awsmobile.aws_cloud_logic_custom[0].name} baseUrl="api/v1/collections" searchKeys={['name', 'slug']} baseSortMap={[]}>
					<SectionMyLists />
				</CrudProvider>
			</PageLayout>
		</>
	);
};

export default MyLists;

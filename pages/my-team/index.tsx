import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionMyTeam from '../../components/sections/my-team/SectionMyTeam';
import UserGuard from '../../guards/UserGuard';
import CrudProvider from '../../providers/crud-provider';
import awsmobile from '../../src/aws-exports';

const MyTeam = () => {
	return (
		<>
			<Head>
				<title>My Team</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<CrudProvider baseApi={awsmobile.aws_cloud_logic_custom[0].name} baseUrl="api/v1/users" searchKeys={['name', 'slug']} baseSortMap={[]}>
					<SectionMyTeam />
				</CrudProvider>
			</PageLayout>
		</>
	);
};

export default MyTeam;

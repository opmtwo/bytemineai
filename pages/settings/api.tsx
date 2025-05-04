import Head from 'next/head';
import ModGuard from '../../guards/ModGuard';
import UserGuard from '../../guards/UserGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionApi from '../../components/sections/api/SectionApi';

const Api = () => {
	return (
		<UserGuard>
			<Head>
				<title>API</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionApi />
			</PageLayout>
		</UserGuard>
	);
};

export default Api;

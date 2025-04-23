import Head from 'next/head';
import RootGuard from '../../../guards/RootGuard';
import PageLayout from '../../../components/layouts/PageLayout';
import SectionAdminAccount from '../../../components/sections/admin-account/SectionAdminAccount';

const AdminAccount = () => {
	return (
		<RootGuard>
			<Head>
				<title>Admin Account</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionAdminAccount />
			</PageLayout>
		</RootGuard>
	);
};

export default AdminAccount;

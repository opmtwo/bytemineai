import Head from 'next/head';
import PageLayout from '../../components/layouts/PageLayout';
import SectionUserAccountSettings from '../../components/sections/user-account-settings/SectionUserAccountSettings';
import AdminGuard from '../../guards/AdminGuard';

const AdminAccount = () => {
	return (
		<AdminGuard>
			<Head>
				<title>Account Settings</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionUserAccountSettings />
			</PageLayout>
		</AdminGuard>
	);
};

export default AdminAccount;

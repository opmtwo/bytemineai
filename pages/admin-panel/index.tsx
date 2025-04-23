import Head from 'next/head';
import RootGuard from '../../guards/RootGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionAdminPanel from '../../components/sections/admin-panel/SectionAdminPanel';

const AdminPanel = () => {
	return (
		<RootGuard>
			<Head>
				<title>Admin Panel</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionAdminPanel />
			</PageLayout>
		</RootGuard>
	);
};

export default AdminPanel;

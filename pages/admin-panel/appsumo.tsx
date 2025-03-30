import Head from 'next/head';
import RootGuard from '../../guards/RootGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionAdminPanelSumo from '../../components/sections/admin-panel/SectionAdminPanelSumo';

const AdminPanel = () => {
	return (
		<RootGuard>
			<Head>
				<title>Admin Panel</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionAdminPanelSumo />
			</PageLayout>
		</RootGuard>
	);
};

export default AdminPanel;

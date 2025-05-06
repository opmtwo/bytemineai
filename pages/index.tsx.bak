import Head from 'next/head';
import UserGuard from '../guards/UserGuard';
import PageLayout from '../components/layouts/PageLayout';
import SectionDashboard from '../components/sections/dashboard/SectionDashboard';
// import SectionHome from '../components/sections/home/SectionHome';

const Home = () => {
	return (
		<UserGuard>
			<Head>
				<title>Dashboard</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				{/* <SectionHome /> */}
				<SectionDashboard />
			</PageLayout>
		</UserGuard>
	);
};

export default Home;

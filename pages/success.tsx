import Head from 'next/head';
import UserGuard from '../guards/UserGuard';
import PageLayout from '../components/layouts/PageLayout';
import SuccessPurchase from '../components/sections/SuccessPurchase';
// import SectionHome from '../components/sections/home/SectionHome';


const Success = () => {
	return (
		<UserGuard>
			<Head>
				<title>Dashboard</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				{/* <SectionHome /> */}
                <SuccessPurchase />
			</PageLayout>
		</UserGuard>
	);
};

export default Success;

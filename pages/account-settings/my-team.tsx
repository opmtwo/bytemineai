import Head from 'next/head';
import ModGuard from '../../guards/ModGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionMyTeam from '../../components/sections/my-team/SectionMyTeam';

const MyTeam = () => {
	return (
		<ModGuard>
			<Head>
				<title>My Team</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionMyTeam />
			</PageLayout>
		</ModGuard>
	);
};

export default MyTeam;

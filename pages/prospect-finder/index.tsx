import Head from 'next/head';

import PageLayout from '../../components/layouts/PageLayout';
import SectionProspects from '../../components/sections/prospects/SectionProspects';
import UserGuard from '../../guards/UserGuard';

const ProspectFinder = () => {
	return (
		<UserGuard>
			<Head>
				<title>Prospect Finder</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionProspects />
			</PageLayout>
		</UserGuard>
	);
};

export default ProspectFinder;

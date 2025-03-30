import Head from 'next/head';
import UserGuard from '../guards/UserGuard';
import PageLayout from '../components/layouts/PageLayout';
import SectionProspectFinder from '../components/sections/prospect-finder/SectionProspectFinder';

const MyContacts = () => {
	return (
		<UserGuard>
			<Head>
				<title>My Contacts</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				<SectionProspectFinder isContactsOnly={true} />
			</PageLayout>
		</UserGuard>
	);
};

export default MyContacts;

import Head from 'next/head';
import UserGuard from '../../guards/UserGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionMyLists from '../../components/sections/my-lists/SectionMyLists';

const MyLists = () => {
	return (
		<UserGuard>
			<Head>
				<title>My Lists</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionMyLists />
			</PageLayout>
		</UserGuard>
	);
};

export default MyLists;

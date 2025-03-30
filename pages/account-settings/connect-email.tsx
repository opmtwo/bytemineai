import Head from 'next/head';
import UserGuard from '../../guards/UserGuard';
import PageLayout from '../../components/layouts/PageLayout';
import SectionConnectEmail from '../../components/sections/connect-email/SectionConnectEmail';

const ConnectEmail = () => {
	return (
		<UserGuard>
			<Head>
				<title>Connect Email</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout size="is-max-widescreen">
				<SectionConnectEmail />
			</PageLayout>
		</UserGuard>
	);
};

export default ConnectEmail;

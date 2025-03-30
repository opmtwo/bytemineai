import Head from 'next/head';
import AuthLayout from '../components/layouts/AuthLayout';
import PageLayout from '../components/layouts/PageLayout';
import SectionPrivacy from '../components/sections/privacy/SectionPrivacy';

const Privacy = () => (
	<>
		<Head>
			<title>Privacy policy</title>
			<meta name="description" content="" />
		</Head>
		<AuthLayout>
			<SectionPrivacy />
		</AuthLayout>
	</>
);

export default Privacy;

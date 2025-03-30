import Head from 'next/head';
import AuthLayout from '../components/layouts/AuthLayout';
import PageLayout from '../components/layouts/PageLayout';
import SectionTerms from '../components/sections/terms/SectionTerms';

const Terms = () => (
	<>
		<Head>
			<title>Terms and conditions</title>
			<meta name="description" content="" />
		</Head>
		<AuthLayout>
			<SectionTerms />
		</AuthLayout>
	</>
);

export default Terms;

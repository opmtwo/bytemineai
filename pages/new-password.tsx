import Head from 'next/head';
import AuthLayout from '../components/layouts/AuthLayout';
import SectionNewPassword from '../components/sections/new-password/SectionNewPassword';
import GuestGuard from '../guards/GuestGuard';

const NewPassword = () => (
	<GuestGuard>
		<Head>
			<title>New password</title>
			<meta name="description" content="" />
		</Head>
		<AuthLayout>
			<SectionNewPassword />
		</AuthLayout>
	</GuestGuard>
);

export default NewPassword;

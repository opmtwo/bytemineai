import Head from 'next/head';
import AuthLayout from '../components/layouts/AuthLayout';
import SectionResetPassword from '../components/sections/reset-password/SectionResetPassword';
import GuestGuard from '../guards/GuestGuard';

const ResetPassword = () => (
	<GuestGuard>
		<Head>
			<title>Reset Password</title>
			<meta name="description" content="" />
		</Head>
		<AuthLayout>
			<SectionResetPassword />
		</AuthLayout>
	</GuestGuard>
);

export default ResetPassword;

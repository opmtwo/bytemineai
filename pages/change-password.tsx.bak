import Head from 'next/head';
import UserGuard from '../guards/UserGuard';
import AuthLayout from '../components/layouts/AuthLayout';
import SectionChangePassword from '../components/sections/change-password/SectionChangePassword';

const ChangePassword = () => (
	<UserGuard>
		<Head>
			<title>Change password</title>
			<meta name="description" content="" />
		</Head>
		<AuthLayout>
			<SectionChangePassword />
		</AuthLayout>
	</UserGuard>
);

export default ChangePassword;

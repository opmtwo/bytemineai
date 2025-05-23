import Head from 'next/head';

import AuthLayout from '../components/layouts/AuthLayout';
import SectionChangePassword from '../components/sections/change-password/SectionChangePassword';
import UserGuard from '../guards/UserGuard';

const ChangePassword = () => (
	<>
		<Head>
			<title>Change password</title>
			<meta name="description" content="" />
		</Head>
		<AuthLayout>
			<SectionChangePassword />
		</AuthLayout>
	</>
);

export default ChangePassword;

import Head from 'next/head';
import GuestGuard from '../guards/GuestGuard';
import AuthLayout from '../components/layouts/AuthLayout';
import SectionLogin from '../components/sections/login/SectionLogin';

const Login = () => (
	<GuestGuard>
		<Head>
			<title>Login</title>
			<meta name="description" content="" />
		</Head>
		<AuthLayout>
			<SectionLogin />
		</AuthLayout>
	</GuestGuard>
);

export default Login;

import Head from 'next/head';
import GuestGuard from '../guards/GuestGuard';
import AuthLayout from '../components/layouts/AuthLayout';
import ResendCodeForm from '../components/sections/register/ResendCodeForm';

const Register = () => {
	return (
		<GuestGuard>
			<Head>
				<title>Verify</title>
				<meta name="description" content="" />
			</Head>
			<AuthLayout>
				<ResendCodeForm />
			</AuthLayout>
		</GuestGuard>
	);
};

export default Register;

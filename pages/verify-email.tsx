import Head from 'next/head';
import GuestGuard from '../guards/GuestGuard';
import AuthLayout from '../components/layouts/AuthLayout';
import RegisterCodeForm from '../components/sections/register/RegisterCodeForm';

const Register = () => {
	return (
		<GuestGuard>
			<Head>
				<title>Verify</title>
				<meta name="description" content="" />
			</Head>
			<AuthLayout>
				<RegisterCodeForm />
			</AuthLayout>
		</GuestGuard>
	);
};

export default Register;

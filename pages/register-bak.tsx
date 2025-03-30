import Head from 'next/head';
import GuestGuard from '../guards/GuestGuard';
import AuthLayout from '../components/layouts/AuthLayout';
import SectionRegister from '../components/sections/register/SectionRegister';

const Register = () => {
	return (
		<GuestGuard>
			<Head>
				<title>Register</title>
				<meta name="description" content="" />
			</Head>
			<AuthLayout>
				<SectionRegister />
			</AuthLayout>
		</GuestGuard>
	);
};

export default Register;

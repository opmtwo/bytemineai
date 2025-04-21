import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import RegisterCodeFormNew from '../register/RegisterCodeFormNew';
import LoginForm from './LoginForm';
import NewPasswordFormNew from '../new-password/NewPasswordFormNew';

const SectionLogin = () => {
	const [username, setUsername] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<Error>();

	const [isVerify, setIsVerify] = useState(false);
	const [isNewPassword, setIsNewPassword] = useState(false);

	const { onSignIn } = useAuthContext();

	const router = useRouter();

	const onVerify = (email: string, pass: string) => {
		setUsername(email);
		setPassword(pass);
		setIsVerify(true);
	};

	const onNewPassword = (email: string, pass: string) => {
		setUsername(email);
		setPassword(pass);
		setIsNewPassword(true);
	};

	const onNewPasswordSubmit = () => {
		window.location.href = '/';
	};

	const onVerifyCancel = () => {
		setIsVerify(false);
	};

	const onSubmit = async () => {
		try {
			const user = await signIn({ username, password });
			onSignIn(user);
		} catch (err) {
			router.push('/login');
		}
	};
	return (
		<>
			{/* <CardAuthHeader /> */}
			{isVerify ? <RegisterCodeFormNew email={username} username={username} password={password} onSubmit={onSubmit} onCancel={onVerifyCancel} /> : null}
			{isNewPassword ? <NewPasswordFormNew oldPass={password} onSubmit={onNewPasswordSubmit} isNewPassword /> : null}
			{!isVerify && !isNewPassword ? <LoginForm onVerify={onVerifyCancel} onNewPassword={onNewPassword} /> : null}
		</>
	);
};

export default SectionLogin;

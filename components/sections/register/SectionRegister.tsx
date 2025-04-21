import { SignInOutput } from 'aws-amplify/auth';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { UrlObject } from 'url';

import RegisterCodeFormNew from './RegisterCodeFormNew';
import RegisterMainForm from './RegisterMainForm';

const SectionRegister = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [activeForm, setActiveForm] = useState<'main' | 'code'>('main');

	const onMainFormSubmit = (email: string, username: string, password: string) => {
		setEmail(email);
		setUsername(username);
		setPassword(password);
		setActiveForm('code');
	};

	const onCodeFormSubmit = async (user: SignInOutput, urlObject?: UrlObject) => {
		// onSignIn(user);
		window.location.href = '/';
	};

	const onCodeFormCancel = () => {
		setActiveForm('main');
	};

	return (
		<AnimatePresence>
			{activeForm === 'main' && <RegisterMainForm onSubmit={onMainFormSubmit} />}
			{activeForm === 'code' && (
				<RegisterCodeFormNew email={email} username={username} password={password} onSubmit={onCodeFormSubmit} onCancel={onCodeFormCancel} />
			)}
		</AnimatePresence>
	);
};

export default SectionRegister;

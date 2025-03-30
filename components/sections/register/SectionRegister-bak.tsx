import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RegisterCodeForm from './RegisterCodeForm';
import RegisterMainForm from './RegisterMainForm';

const SectionRegister = () => {

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [activeForm, setActiveForm] = useState('main-form');

	const onMainFormSubmit = (email: string, username: string, password: string) => {
		setEmail(email);
		setUsername(username);
		setPassword(password);
		//setActiveForm('code-form');


	};

	const onCodeFormCancel = () => {
		setActiveForm('main-form');
	};

	return (
		<AnimatePresence>
			{activeForm === 'main-form' && <RegisterMainForm onSubmit={onMainFormSubmit} />}
			{activeForm === 'code-form' && <RegisterCodeForm  />}
		</AnimatePresence>
	);
};

export default SectionRegister;

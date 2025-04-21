import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import ResetPasswordCodeForm from './ResetPasswordCodeForm';
import ResetPasswordEmailForm from './ResetPasswordEmailForm';

const SectionResetPassword = () => {
	const [email, setEmail] = useState('');
	const [activeForm, setActiveForm] = useState<'email' | 'code'>('email');

	const onEmailFormSubmit = (newEmail: string) => {
		setEmail(newEmail);
		setActiveForm('code');
	};

	const onVerificationCodeFormCancel = () => {
		setActiveForm('email');
	};

	return (
		<AnimatePresence>
			{activeForm === 'email' && <ResetPasswordEmailForm onSubmit={onEmailFormSubmit} />}
			{activeForm === 'code' && <ResetPasswordCodeForm email={email} onCancel={onVerificationCodeFormCancel} />}
		</AnimatePresence>
	);
};

export default SectionResetPassword;

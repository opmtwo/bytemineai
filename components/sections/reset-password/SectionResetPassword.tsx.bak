import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ResetPasswordEmailForm from './ResetPasswordEmailForm';
import ResetPasswordCodeForm from './ResetPasswordCodeForm';

const SectionResetPassword = () => {
	const [email, setEmail] = useState('');
	const [activeForm, setActiveForm] = useState('email-form');

	const onEmailFormSubmit = (newEmail: string) => {
		setEmail(newEmail);
		setActiveForm('code-form');
	};

	const onVerificationCodeFormCancel = () => {
		setActiveForm('email-form');
	}

	return (
		<AnimatePresence>
			{activeForm === 'email-form' && <ResetPasswordEmailForm onSubmit={onEmailFormSubmit} />}
			{activeForm === 'code-form' && <ResetPasswordCodeForm email={email} onCancel={onVerificationCodeFormCancel} />}
		</AnimatePresence>
	);
};

export default SectionResetPassword;

import { FormEvent, useState } from 'react';
import validator from 'validator';

import { resetPassword } from '@aws-amplify/auth';

import Anchor from '../../Anchor';
import Card from '../../cards/Card';
import CardRelated from '../../cards/CardRelated';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Logo from '../../Logo';
import Slot from '../../Slot';
import FormButtonNew from '../../form/FormButtonNew';

const ResetPasswordEmailForm = ({ onSubmit }: { onSubmit: Function }) => {
	const [isBusy, setIsBusy] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const emailNormalized = validator.normalizeEmail(email);
		const isValidEmail = emailNormalized && emailNormalized.trim().length && validator.isEmail(emailNormalized);

		setEmailError(undefined);
		if (!isValidEmail) {
			setEmailError(new Error('Please enter a valid email address'));
			return;
		}

		setIsBusy(true);
		try {
			await resetPassword({ username: emailNormalized });
			onSubmit(emailNormalized);
		} catch (err) {
			setEmailError(err);
		}
		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<div className="has-text-centered" style={{ marginBottom: 80 }}>
				<Logo />
			</div>
			<Card>
				<Slot slot="header">
					<big>
						<strong>Reset password</strong>
					</big>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="email" value={email} label="Email Address" required={true} error={emailError} onChange={setEmail} />
					</div>
				</Slot>
				<Slot slot="footer">
					<Anchor href="/login">Back</Anchor>
					<FormButtonNew type="submit" variant="active" disabled={isBusy} loading={isBusy} className="ml-5" onClick={handleSubmit}>
						<span className="px-5">Next</span>
					</FormButtonNew>
				</Slot>
			</Card>
			<CardRelated>Enter your email for instructions to reset your password.</CardRelated>
		</form>
	);
};

export default ResetPasswordEmailForm;

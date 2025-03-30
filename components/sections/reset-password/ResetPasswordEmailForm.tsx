import { FormEvent, useState } from 'react';
import validator from 'validator';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Slot from '../../Slot';
import Auth from '@aws-amplify/auth';
import Card from '../../cards/Card';
import Anchor from '../../Anchor';
import CardRelated from '../../cards/CardRelated';
import Logo from '../../Logo';

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
			await Auth.forgotPassword(emailNormalized);
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
					<FormButton type="submit" disabled={isBusy} loading={isBusy} className="ml-5" onClick={handleSubmit}>
						<span className="px-5">Next</span>
					</FormButton>
				</Slot>
			</Card>
			<CardRelated>Enter your email for instructions to reset your password.</CardRelated>
		</form>
	);
};

export default ResetPasswordEmailForm;

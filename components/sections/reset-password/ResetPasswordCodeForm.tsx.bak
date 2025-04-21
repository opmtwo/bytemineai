import { FormEvent, useState } from 'react';
import generator from 'generate-password';
import Auth from '@aws-amplify/auth';
import { useAuthContext } from '../../../providers/auth-data-provider';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Slot from '../../Slot';
import CardRelated from '../../cards/CardRelated';
import Card from '../../cards/Card';
import Logo from '../../Logo';

const ResetPasswordCodeForm = ({ email, onCancel }: { email: string; onCancel: Function }) => {
	const { onSignIn } = useAuthContext();

	const [isBusy, setIsBusy] = useState(false);
	const [isResent, setIsResent] = useState(false);
	const [code, setCode] = useState('');
	const [codeError, setCodeError] = useState<Error>();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const otp = code.trim();
		const pwd = generator.generate({
			length: 8,
			numbers: true,
			strict: true,
		});

		setIsBusy(true);
		setCodeError(undefined);
		try {
			await Auth.forgotPasswordSubmit(email, otp, pwd);
			const user = await Auth.signIn({
				username: email,
				password: pwd,
			});
			setIsBusy(false);
			onSignIn(user, {
				pathname: '/change-password',
				query: {
					oldPassword: pwd,
				},
			});
		} catch (err) {
			setIsBusy(false);
			setCodeError(err);
		}
	};

	const onResend = async () => {
		setIsBusy(true);
		try {
			await Auth.forgotPassword(email);
			setIsResent(true);
		} catch (err) {
			setCodeError(err);
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
						<strong>Change Password</strong>
					</big>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="code" value={code} label="Verification code" required={true} error={codeError} onChange={setCode} />
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButton variant="is-inverted" onClick={onCancel} disabled={isBusy}>
						Back
					</FormButton>
					<FormButton type="submit" disabled={isBusy} loading={isBusy} className="ml-5" onClick={handleSubmit}>
						Next
					</FormButton>
				</Slot>
			</Card>
			<CardRelated>
				{isResent ? 'A new verification code was sent to your email' : 'A verification code was sent to your email. Enter the code to continue.'}
			</CardRelated>
			<FormButton variant="is-inverted" size="is-small" className="is-block mx-auto mt-3" onClick={onResend} disabled={isResent || isBusy}>
				Did&apos;nt receive code? Click here to resend
			</FormButton>
		</form>
	);
};

export default ResetPasswordCodeForm;

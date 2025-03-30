import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Slot from '../../Slot';
import Card from '../../cards/Card';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import { useAuthContext } from '../../../providers/auth-data-provider';
import Logo from '../../Logo';
import { CognitoUserExt } from '../../../types';

const NewPasswordForm = () => {
	const router = useRouter();
	const { onSignIn } = useAuthContext();

	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [pwd, setPwd] = useState('');
	const [pwdError, setPwdError] = useState<Error>();
	const [pwdConfirm, setPwdConfirm] = useState('');
	const [pwdConfirmError, setPwdConfirmError] = useState<Error>();

	useEffect(() => {
		if (typeof router.query.username === 'string') {
			setUsername(router.query.username);
		}
	}, [router.query.username]);

	useEffect(() => {
		if (typeof router.query.password === 'string') {
			setPassword(router.query.password);
		}
	}, [router.query.password]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const pwdNormalized = pwd.trim();
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/;
		const isValidPassword = passwordRegex.test(pwdNormalized);
		setError(undefined);
		setPwdError(undefined);
		setPwdConfirmError(undefined);

		if (!isValidPassword) {
			setPwdError(new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces'));
			return;
		}

		if (pwdNormalized !== pwdConfirm) {
			setPwdConfirmError(new Error("Passwords don't match"));
			return;
		}

		setIsBusy(true);
		try {
			const user = await Auth.signIn(username, password);
			await Auth.completeNewPassword(user, pwdNormalized);
			const newUser: CognitoUserExt = await Auth.currentAuthenticatedUser();

			// email verification is pending - send email verification code and redirect to email verification page
			const email = newUser.attributes.email.trim();
			if (!newUser.attributes['custom:verificationdate']) {
				await API.post('nymblrRegisterApi', '/resend-email-verification', { body: { email } });
				router.push({ pathname: '/verify-email', query: { email } });
				return;
			}

			onSignIn(newUser);
		} catch (err) {
			setError(err);
			setIsBusy(false);
		}
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<div className="has-text-centered" style={{ marginBottom: 80 }}>
				<Logo />
			</div>
			<Card>
				<Slot slot="header">
					<big>
						<strong>New Password</strong>
					</big>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="pwd" value={pwd} label="New password" required={true} error={pwdError} onChange={setPwd} type="password" />
						<FormInput
							name="pwdConfirm"
							value={pwdConfirm}
							label="Confirm password"
							required={true}
							error={pwdConfirmError}
							onChange={setPwdConfirm}
							type="password"
						/>
						<ErrorNotificaition error={error} />
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButton type="submit" disabled={isBusy} loading={isBusy} className="ml-5" variant={['is-ui-button']}>
						Update Password
					</FormButton>
				</Slot>
			</Card>
		</form>
	);
};

export default NewPasswordForm;

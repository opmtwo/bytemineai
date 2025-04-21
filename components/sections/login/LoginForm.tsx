import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { callApi } from '../../../utils/helper-utils';
import { isEmailValid, isPasswordValid } from '../../../utils/user-utils';
import Anchor from '../../Anchor';
import Card from '../../cards/Card';
import CardRelated from '../../cards/CardRelated';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Logo from '../../Logo';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Slot from '../../Slot';

const LoginForm = ({
	onVerify,
	onNewPassword,
}: {
	onVerify?: (username: string, password: string) => void;
	onNewPassword: (username: string, password: string) => void;
}) => {
	const router = useRouter();
	const { onSignIn } = useAuthContext();

	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState<Error>();
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<Error>();
	const [error, setError] = useState<Error>();
	const [isBusy, setIsBusy] = useState(false);
	const [isVerified, setIsVerified] = useState<Boolean>(false);

	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = (await isEmailValid(username || '')) ? undefined : new Error('Invalid email address');
		isValid = err ? false : isValid;
		setUsernameError(err);

		err = (await isPasswordValid(password || ''))
			? undefined
			: new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces');
		isValid = err ? false : isValid;
		setPasswordError(err);

		return isValid;
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const isValid = await isFormValid();
		if (!isValid) {
			return;
		}
		setError(undefined);
		setIsBusy(true);
		const usernameNormalized = username?.toLowerCase().trim()!;
		const passwordNormalized = password?.trim()!;
		try {
			const user = await signIn({
				username: usernameNormalized,
				password: passwordNormalized,
			});
			const continueUrl = router.query.continue?.length ? (router.query.continue[0] as string) : undefined;
			if (user.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
				onNewPassword && onNewPassword(usernameNormalized, passwordNormalized);
				return;
			}
			await callApi(null, '/api/v1/me/login', {
				method: 'POST',
				body: JSON.stringify({}),
			});
			window.location.href = continueUrl ?? '/';
		} catch (err: any) {
			console.log('Sign in error', err);
			if (err.toString().indexOf('UserNotConfirmedException') !== -1 && onVerify) {
				setIsBusy(false);
				onVerify(usernameNormalized, passwordNormalized);
				return;
			}
			setError(err);
		}
		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={onSubmit}>
			<div className="has-text-centered" style={{ paddingBottom: 20 }}>
				<Logo />
			</div>
			<CardRelated>{isVerified ? `Thanks for verifying your email, please login to continue.` : ` `}</CardRelated>
			<Card>
				<Slot slot="header">
					<strong>
						<big>Log In</big>
					</strong>
					<Anchor href="/reset-password">
						<small>Forgot Password?</small>
					</Anchor>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="username" value={username} label="Email Address" onChange={setUsername} required={true} error={usernameError} />
						<FormInput
							name="password"
							value={password}
							type="password"
							label="Password"
							onChange={setPassword}
							required={true}
							error={passwordError}
						/>
						<ErrorNotificaition error={error} />
					</div>
				</Slot>
				<Slot slot="footer">
					<Anchor href="/register">Create Account</Anchor>
					<FormButton type="submit" className="ml-5" loading={isBusy} disabled={isBusy} variant={['is-ui-button']}>
						Log in
					</FormButton>
				</Slot>
			</Card>
			<CardRelated />
		</form>
	);
};

export default LoginForm;

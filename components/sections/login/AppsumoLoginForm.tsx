import {FormEvent, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';
import isEmail from 'validator/lib/isEmail';
import Anchor from '../../Anchor';
import FormInput from '../../form/FormInput';
import FormButton from '../../form/FormButton';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import { useAuthContext } from '../../../providers/auth-data-provider';
import Slot from '../../Slot';
import Card from '../../cards/Card';
import CardRelated from '../../cards/CardRelated';
import Logo from '../../Logo';
import { UserAttributes } from '../../../types';
import { getSubdomain } from '../../../utils/helper-utils';

const LoginForm = () => {
	const router = useRouter();
	const { onSignIn } = useAuthContext();

	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState<Error>();
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<Error>();
	const [error, setError] = useState<Error>();
	const [isBusy, setIsBusy] = useState(false);
    const [isVerified, setIsVerified] = useState<Boolean>(false);

	useEffect(()=>{
		const query = router.query;
		if(query?.verify_email && query.verify_email === 'true'){
			setIsVerified(true);
		}

	},[])
	const isFormValid = (usernameNormalized: string, passwordNormalized: string) => {
		let isValid = true;
		if (!usernameNormalized || !isEmail(usernameNormalized)) {
			setUsernameError(new Error('Invalid email'));
			isValid = false;
		}
		if (!passwordNormalized || passwordNormalized.length < 8) {
			setPasswordError(new Error('Invalid password'));
			isValid = false;
		}
		return isValid;
	};

	const isValidLoginOrigin = (attributes: UserAttributes) => {
		const subdomain = getSubdomain()?.toLowerCase();
		if (!subdomain) {
			return true;
		}
		if (subdomain === 'dev' || subdomain === 'www') {
			return true;
		}
		if (attributes['custom:group_name']?.toLowerCase() === subdomain) {
			return true;
		}
		return false;
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(undefined);

		const usernameNormalized = username.toLowerCase().trim();
		const passwordNormalized = password.trim();

		setUsernameError(undefined);
		setPasswordError(undefined);
		if (!isFormValid(usernameNormalized, passwordNormalized)) {
			return;
		}

		setIsBusy(true);
		try {
			const user = await Auth.signIn({
				username: usernameNormalized,
				password: passwordNormalized,
			});
			setIsBusy(false);

			// if (!isValidLoginOrigin(user.attributes)) {
			// 	try {
			// 		await Auth.signOut();
			// 	} catch (error) {
			// 		// in case user password needs to be changed, we will be here
			// 	}
			// 	setError(new Error('Invalid username or password'));
			// 	return;
			// }

			if (user && user.attributes && user.attributes.sub) {
				await onSignIn(user, router.query.continue);
				return;
			}
			if (user && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				await router.push({ pathname: '/new-password', query: { username, password } });
				return;
			}
			setError(new Error('Something went wrong - please try again.'));
		} catch (err) {
			console.log('Sign in error', err);
			setError(err);
			setIsBusy(false);
		}
	};

	return (
		<form method="POST" onSubmit={onSubmit}>
			<div className="has-text-centered" style={{ paddingBottom: 20 }}>
				<Logo />
				<br /><br /><strong>AppSumo Users, check your e-mail for your password in order to log in.</strong>
			</div>
			<CardRelated>
				{isVerified
					? `Thanks for verifying your email, please login to continue.`
					: ` `}
			</CardRelated>
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
						<FormInput
							name="username"
							value={username}
							label="Email Address"
							onChange={setUsername}
							required={true}
							error={usernameError}
						/>
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

					<FormButton
						type="submit"
						className="ml-5"
						loading={isBusy}
						disabled={isBusy}
						variant={['is-ui-button']}
					>
						Log in
					</FormButton>
				</Slot>
			</Card>



			<CardRelated />
		</form>
	);
};

export default LoginForm;

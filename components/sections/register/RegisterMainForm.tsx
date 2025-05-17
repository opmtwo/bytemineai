import { signUp } from 'aws-amplify/auth';
import { FormEvent, useState } from 'react';

import { getErrorMsg } from '../../../utils/helper-utils';
import { isEmailValid, isFirstNameValid, isLastNameValid, isPasswordValid } from '../../../utils/user-utils';
import Anchor from '../../Anchor';
import Card from '../../cards/Card';
import CardRelated from '../../cards/CardRelated';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import Logo from '../../Logo';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Slot from '../../Slot';

const RegisterMainForm = ({ onSubmit }: { onSubmit: Function }) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState<Error>();

	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState<Error>();

	const [lastName, setLastName] = useState('');
	const [lastNameError, setLastNameError] = useState<Error>();

	const [companyName, setCompanyName] = useState('');
	const [companyNameError, setCompanyNameError] = useState<Error>();

	const [country, setCountry] = useState('US');
	const [countryError, setCountryError] = useState<Error>();

	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState<Error>();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<Error>();

	/**
	 * @summary
	 * Reset all errors
	 */
	const resetErrors = () => {
		setError(undefined);
		setUsernameError(undefined);
		setEmailError(undefined);
		setPhoneError(undefined);
		setPasswordError(undefined);
		setFirstNameError(undefined);
		setLastNameError(undefined);
	};

	const isCompanyNameValid = async (companyName: string) => {
		return companyName && companyName.trim().length >= 2;
	};

	/**
	 * Validate form
	 * @returns {Boolean}
	 */
	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = (await isFirstNameValid(firstName)) ? undefined : new Error('Invalid first name');
		isValid = err ? false : isValid;
		setFirstNameError(err);

		err = (await isLastNameValid(lastName)) ? undefined : new Error('Invalid last name');
		isValid = err ? false : isValid;
		setLastNameError(err);

		err = (await isCompanyNameValid(companyName)) ? undefined : new Error('Invalid company name');
		isValid = err ? false : isValid;
		setCompanyNameError(err);

		err = (await isEmailValid(email ?? '')) ? undefined : new Error('Invalid email address');
		isValid = err ? false : isValid;
		setEmailError(err);

		err = (await isPasswordValid(password))
			? undefined
			: new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces');
		isValid = err ? false : isValid;
		setPasswordError(err);

		return isValid;
	};

	const handleSignUp = async () => {
		setIsBusy(true);
		try {
			const usernameClean = email!.toLowerCase().trim();
			const passwordClean = password!.trim();
			await signUp({
				username: usernameClean,
				password: passwordClean,
				options: {
					userAttributes: {
						name: `${firstName} ${lastName}`,
						given_name: firstName,
						family_name: lastName,
						nickname: companyName,
					},
				},
			});
			onSubmit(email, usernameClean, passwordClean);
		} catch (err: any) {
			setError(new Error(getErrorMsg(err)));
			setIsBusy(false);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsBusy(true);
		setError(undefined);
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		await handleSignUp();
		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			{/* <div className="has-text-centered" style={{ marginBottom: 20 }}>
				<Logo />
			</div> */}
			<Card>
				<Slot slot="header">
					<strong>
						<big>Create a Free Account</big>
					</strong>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput name="firstName" value={firstName} label="First Name" onChange={setFirstName} error={firstNameError} />
						<FormInput name="lastName" value={lastName} label="Last Name" onChange={setLastName} error={lastNameError} />
						<FormInput name="companyName" value={companyName} label="Company Name" onChange={setCompanyName} error={companyNameError} />
						<FormInput name="email" value={email} label="Email Address" onChange={setEmail} error={emailError} />
						<FormInput name="password" value={password} label="Password" onChange={setPassword} type="password" error={passwordError} />
						<ErrorNotificaition error={error} />
					</div>
				</Slot>
				<Slot slot="footer">
					<Anchor href="/login">Log In</Anchor>
					<FormButton type="submit" className="ml-5" disabled={isBusy} loading={isBusy} variant={['is-ui-button']}>
						Create Account
					</FormButton>
				</Slot>
			</Card>
			<CardRelated />
		</form>
	);
};

export default RegisterMainForm;

import { FormEvent, useState } from 'react';
import { API, Auth } from 'aws-amplify';
import FormInput from '../../form/FormInput';
import FormButton from '../../form/FormButton';
import Slot from '../../Slot';
import Card from '../../cards/Card';
import Anchor from '../../Anchor';
import CardRelated from '../../cards/CardRelated';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { AccountType, RenewalPeriod, Roles } from '../../../types';
import Logo from '../../Logo';
import FormField from '../../form/FormField';
import FormSelect from '../../form/FormSelect';
import countryCodes from '../../../data/country-codes';
import {
	isCountryValid,
	isEmailValid,
	isFirstNameValid,
	isLastNameValid,
	isPasswordValid,
	isPhoneValid,
	isUsernameValid,
} from '../../../utils/user-utils';
import { getCountryDialCode } from '../../../utils/helper-utils';
import { genericErrorMessage } from '../../../consts';
import ErrorNotificaition from '../../notifications/ErrorNotification';

const RegisterMainForm = ({ onSubmit }: { onSubmit: Function }) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState<Error>();
	const [lastName, setLastName] = useState('');
	const [lastNameError, setLastNameError] = useState<Error>();
	const [country, setCountry] = useState('US');
	const [countryError, setCountryError] = useState<Error>();
	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState<Error>();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();
	const [usernameError, setUsernameError] = useState<Error>();
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState<Error>();
    const { onSignIn } = useAuthContext();
	const { getGroupName } = useAuthContext();

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

	const isEmailAvailable = async (email: string) => {
		try {
			const response = await API.post('restApiExpress', '/restapi/auth/availability', {
				body: {
					email,
				},
			});
			return response?.status === 'valid';
		} catch (err) {
			console.log('isEmailValid - error: ' + err);
			return false;
		}
	};

	/**
	 * Validate form
	 * @returns {Boolean}
	 */
	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = (await isUsernameValid(username))
			? undefined
			: new Error(
					'Invalid user name. User name must contain alpha characters only and can be up to 20 characters long'
			  );
		isValid = err ? false : isValid;
		setUsernameError(err);

		err = (await isEmailValid(email)) ? undefined : new Error('Invalid email address');
		isValid = err ? false : isValid;
		setEmailError(err);

		err = (await isCountryValid(country)) ? undefined : new Error('Invalid country');
		isValid = err ? false : isValid;
		setCountryError(err);

		err = (await isPhoneValid(phone)) ? undefined : new Error('Invalid phone number');
		isValid = err ? false : isValid;
		setPhoneError(err);

		err = (await isFirstNameValid(firstName)) ? undefined : new Error('Invalid first name');
		isValid = err ? false : isValid;
		setFirstNameError(err);

		err = (await isLastNameValid(lastName)) ? undefined : new Error('Invalid last name');
		isValid = err ? false : isValid;
		setLastNameError(err);

		err = (await isPasswordValid(password))
			? undefined
			: new Error(
					'Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces'
			  );
		isValid = err ? false : isValid;
		setPasswordError(err);

		if (isValid) {
			err = (await isEmailAvailable(email)) ? undefined : new Error('Reach out to us via our chat to verify your e-mail.');
			isValid = err ? false : isValid;
			setEmailError(err);
		}

		return isValid;
	};

	/**
	 * Sign up a new user in Cognito
	 * @returns {Void}
	 */
	const signUp = async () => {
		setIsBusy(true);
		const countryCode = getCountryDialCode(country);
		try {
			const usernameNormalized = email.toLowerCase().trim();
			const passwordNormalized = password.trim();
			await Auth.signUp({
				username: usernameNormalized,
				password: passwordNormalized,
				attributes: {
					name: username.trim(),
					email: email.trim(),
					phone_number: `${countryCode}${phone.trim()}`,
					given_name: firstName.trim(),
					family_name: lastName.trim(),
					'custom:country': country.trim(),
					'custom:role': Roles.Admin,
					'custom:created_at': (+new Date()).toString(),
					'custom:group_name': username.trim(),
					'custom:account_type': AccountType.Trial,
					'custom:credits': '50',
					'custom:seats': '10',
					'custom:has_api': '1',
				},
			});

            onSubmit(email, usernameNormalized, passwordNormalized);

            const user = await Auth.signIn({ username: usernameNormalized, password: passwordNormalized });
            await onSignIn(user);


		} catch (err: any) {
			if (err?.message) {
				setError(new Error(err.message));
				return;
			}
			if (err instanceof Error) {
				setError(err);
				return;
			}
			setError(new Error(genericErrorMessage));
		}
		// setIsBusy(false);
	};

	/**
	 * Handle form submit event
	 * @param {Event} e the event object
	 * @returns {Mixed} HTTP redirect response on success - void on error
	 */
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsBusy(true);
		setError(undefined);
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		await signUp();

		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<div className="has-text-centered" style={{ marginBottom: 80 }}>
				<Logo />
			</div>
			<Card>
				<Slot slot="header">
					<strong>
						<big>Create a Free Account</big>
					</strong>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput
							name="username"
							value={username}
							label="Account User Name"
							onChange={setUsername}
							required={true}
							error={usernameError}
						/>
						<FormInput
							name="firstName"
							value={firstName}
							label="First Name"
							onChange={setFirstName}
							required={true}
							error={firstNameError}
						/>
						<FormInput
							name="lastName"
							value={lastName}
							label="Last Name"
							onChange={setLastName}
							required={true}
							error={lastNameError}
						/>
						<FormField>
							<div className="columns is-is-mobile">
								<div className="column is-5">
									<FormSelect
										name="country"
										value={country}
										onChange={setCountry}
										error={countryError}
										options={countryCodes}
										idField="code"
										nameField="name"
										label="Country"
									/>
								</div>
								<div className="column is-7">
									<FormInput
										name="phone"
										value={phone}
										label="Phone Number"
										onChange={setPhone}
										required={true}
										error={phoneError}
									/>
								</div>
							</div>
						</FormField>
						<FormInput
							name="email"
							value={email}
							label="Email Address"
							onChange={setEmail}
							required={true}
							error={emailError}
						/>
						<FormInput
							name="password"
							value={password}
							label="Password"
							onChange={setPassword}
							required={true}
							type="password"
							error={passwordError}
						/>
						<ErrorNotificaition error={error} />
					</div>
				</Slot>
				<Slot slot="footer">
					<Anchor href="/login">Log In</Anchor>
					<FormButton
						type="submit"
						className="ml-5"
						disabled={isBusy}
						loading={isBusy}
						variant={['is-ui-button']}
					>
						Create Account
					</FormButton>
				</Slot>
			</Card>
			<CardRelated />
		</form>
	);
};

export default RegisterMainForm;

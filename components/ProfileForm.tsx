import { FormEvent, useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';
import Card from './cards/Card';
import FormButton from './form/FormButton';
import FormInput from './form/FormInput';
import Slot from './Slot';
import ErrorNotificaition from './notifications/ErrorNotification';
import CardTitle from './CardTitle';
import {
	isCountryValid,
	isEmailValid,
	isFirstNameValid,
	isLastNameValid,
	isPasswordValid,
	isPhoneValid,
	isUsernameValid,
} from '../utils/user-utils';
import FormSelect from './form/FormSelect';
import { getCountryDialCode } from '../utils/helper-utils';
import FormField from './form/FormField';
import countryCodes from '../data/country-codes';
import { useAuthContext } from '../providers/auth-data-provider';
import { genericErrorMessage } from '../consts';
import newPassword from '../pages/new-password';
import isEmpty from 'validator/lib/isEmpty';
import { useSettingsContext } from '../providers/settings-provider';

const ProfileForm = () => {
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

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();
	const [country, setCountry] = useState('US');
	const [countryError, setCountryError] = useState<Error>();
	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState<Error>();
	const [oldPassword, setOldPassword] = useState('');
	const [oldPasswordError, setOldPasswordError] = useState<Error>();
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordError, setNewPasswordError] = useState<Error>();

	const { user, updateAttributes } = useAuthContext();
	const { isExpired, canUpgrade } = useSettingsContext();
	const userItem = user?.attributes;



	useEffect(() => {
		if (!userItem) {
			return;
		}
		let company = '';
		if (userItem['custom:company'] && userItem['custom:company'].toString() !== ''){
			company = userItem['custom:company'].toString();
		}
		console.log('userItem', userItem);
		setUsername(userItem.name);
		setFirstName(userItem.given_name);
		setLastName(userItem.family_name);
		setCompanyName(company);
		setEmail(userItem.email);

		let phone = userItem.phone_number;
		let code = getCountryDialCode(userItem['custom:country']);
		if (code && phone.startsWith(code)) {
			phone = phone.replace(code, '');
		}
		setPhone(phone);
		setCountry(userItem['custom:country']);
	}, [userItem]);

	/**
	 * Validate form
	 * @returns {Boolean}
	 */
	const isFormValid = async () => {
		let err;
		let isValid = true;

		err = (await isEmailValid(email)) ? undefined : new Error('Invalid email address');
		isValid = err ? false : isValid;
		setEmailError(err);

		/*
		err = (await isUsernameValid(username))
			? undefined
			: new Error(
					'Invalid user name. User name must contain alpha characters only and can be up to 20 characters long'
			  );
		isValid = err ? false : isValid;
		setUsernameError(err);
		*/

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

		err = (companyName && companyName.trim().length > 0) ? undefined : new Error('Invalid company name');
		isValid = err ? false : isValid;
		setCompanyNameError(err);

		if (!isEmpty(oldPassword)) {
			err = (await isPasswordValid(newPassword))
				? undefined
				: new Error(
						'Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces'
				  );
			isValid = err ? false : isValid;
			setOldPasswordError(err);
		} else {
			setOldPasswordError(undefined);
		}

		if (!isEmpty(newPassword)) {
			err = (await isPasswordValid(newPassword))
				? undefined
				: new Error(
						'Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces'
				  );
			isValid = err ? false : isValid;
			setNewPasswordError(err);
		} else {
			setNewPasswordError(undefined);
		}

		return isValid;
	};

	const getOptions = async (queryStringParameters: any) => {
		const options = {
			queryStringParameters,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const updateUser = async () => {
		const countryCode = getCountryDialCode(country);
		const options = {
			given_name: firstName.trim(),
			family_name: lastName.trim(),
			phone_number: `${countryCode}${phone.trim()}`,
			'custom:country': country.trim(),
			'custom:company': companyName.trim(),
		};
		try {
			await updateAttributes(options);
		} catch (err) {
			console.log('updateUser - error', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
	};

	const updatePassword = async () => {
		if (!oldPassword || !newPassword) {
			return;
		}
		const currentUser = await Auth.currentAuthenticatedUser();
		try {
			await Auth.changePassword(currentUser, oldPassword, newPassword);
			setNewPassword('');
			setOldPassword('');
			setError(new Error('Password successfully updated.'));
		} catch (err) {
            console.log(err);
			setNewPasswordError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const isValid = await isFormValid();
		if (!isValid) {
			return;
		}
		setIsBusy(true);
		await updateUser();
		await updatePassword();
		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={onSubmit}>
			<Card>
				<Slot slot="header">
					<CardTitle>Account Settings</CardTitle>
					<FormButton variant={['is-ui-button', 'is-inverted']} className="has-text-primary" style={{ cursor: 'auto' }}>
						<span className="is-overlay has-background-primary has-radius" style={{ opacity: 0.1 }}></span>
						{isExpired ? 'Expired' : canUpgrade ? 'Trial' : 'Active'}
					</FormButton>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
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
						<FormInput
							name="companyName"
							value={companyName}
							label="Company Name"
							onChange={setCompanyName}
							required={true}
							error={companyNameError}
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
							disabled={userItem?.sub ? true : false}
						/>
						<FormInput
							name="oldPassword"
							value={oldPassword}
							label="Old Password"
							onChange={setOldPassword}
							required={false}
							type="password"
							error={oldPasswordError}
						/>
						<FormInput
							name="newPassword"
							value={newPassword}
							label="New Password"
							onChange={setNewPassword}
							required={false}
							type="password"
							error={newPasswordError}
						/>
						<ErrorNotificaition error={error} />
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButton
						type="submit"
						variant={['is-outlined', 'is-ui-button']}
						disabled={isBusy}
						loading={isBusy}
					>
						Save
					</FormButton>
				</Slot>
			</Card>
		</form>
	);
};

export default ProfileForm;

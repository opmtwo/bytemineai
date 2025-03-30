import { useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';
import { roleOptions, Roles, UserAttributes } from '../types';
import { useAuthContext } from '../providers/auth-data-provider';
import Card from './cards/Card';
import FormButton from './form/FormButton';
import FormInput from './form/FormInput';
import Slot from './Slot';
import ErrorNotificaition from './notifications/ErrorNotification';
import IconClose from './icons/IconClose';
import CardTitle from './CardTitle';
import {
	isCountryValid,
	isEmailValid,
	isFirstNameValid,
	isLastNameValid,
	isPhoneValid,
	isRoleValid,
	parseCognitoUser,
} from '../utils/user-utils';
import API from '@aws-amplify/api';
import FormSelect from './form/FormSelect';
import FormField from './form/FormField';
import countryCodes from '../data/country-codes';
import { genericErrorMessage } from '../consts';
import { getCountryDialCode } from '../utils/helper-utils';

const UserForm = ({
	userItem,
	groupName,
	onCreate,
	onUpdate,
	onCancel,
}: {
	userItem?: UserAttributes;
	groupName: string;
	onCreate: Function;
	onUpdate: Function;
	onCancel?: () => void;
}) => {
	const { user, isAdmin, groups, getUserGroups } = useAuthContext();

	const [id, setId] = useState('');
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
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
	const [role, setRole] = useState('');
	const [roleError, setRoleError] = useState<Error>();

	const resetForm = () => {
		setId('');
		setFirstName('');
		setLastName('');
		setPhone('');
		setEmail('');
		setRole('');
		setError(undefined);
	};

	useEffect(() => {
		if (!userItem) {
			resetForm();
			return;
		}
		setId(userItem.sub);
		setFirstName(userItem.given_name);
		setLastName(userItem.family_name);
		setEmail(userItem.email);
		setRole(userItem['custom:role']);
		
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

		err = (await isCountryValid(country)) ? undefined : new Error('Invalid country');
		isValid = err ? false : isValid;
		setCountryError(err);

		err = (await isPhoneValid(phone)) ? undefined : new Error('Invalid phone number');
		isValid = err ? false : isValid;
		setPhoneError(err);

		err = (await isRoleValid(role)) ? undefined : new Error('Invalid role');
		isValid = err ? false : isValid;
		setRoleError(err);

		err = (await isFirstNameValid(firstName)) ? undefined : new Error('Invalid first name');
		isValid = err ? false : isValid;
		setFirstNameError(err);

		err = (await isLastNameValid(lastName)) ? undefined : new Error('Invalid last name');
		isValid = err ? false : isValid;
		setLastNameError(err);

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

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const addUserToGroup = async (username: string, groupname: string) => {
		const options = await getInput({
			username,
			groupname,
		});
		return new Promise((resolve, reject) => {
			API.post('AdminQueries', '/addUserToGroup', options)
				.then(() => {
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	const removeUserFromGroup = async (username: string, groupname: string) => {
		const options = await getInput({
			username,
			groupname,
		});
		return new Promise((resolve, reject) => {
			API.post('AdminQueries', '/removeUserFromGroup', options)
				.then(() => {
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	const createUser = async () => {
		const isValid = await isFormValid();
		if (!isValid || !groupName) {
			return;
		}

		const countryCode = getCountryDialCode(country);
		const options = await getInput({
			username: email.trim(),
			country: country.trim(),
			phone: `${countryCode}${phone.trim()}`,
			role: role,
			groupname: groupName,
			name: firstName.trim() + ' ' + lastName.trim(),
			firstname: firstName.trim(),
			lastname: lastName.trim(),
		});

		try {
			const response = await API.post('AdminQueries', '/adminCreateUser', options);
			const cognitoUsername = response?.data?.User.Username;
			await addUserToGroup(cognitoUsername, 'Default');
			await addUserToGroup(cognitoUsername, groupName);
			if (role === Roles.Admin || role == Roles.Manager) {
				await addUserToGroup(cognitoUsername, 'Admin');
			}
			const userData = await API.get('AdminQueries', '/getUser', await getOptions({ username: cognitoUsername }));
			onCreate(parseCognitoUser({ ...userData, Attributes: userData.UserAttributes }));
		} catch (err) {
			console.log('createUser - error', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
	};

	const updateUser = async () => {
		const isValid = await isFormValid();
		if (!isValid || !userItem?.sub) {
			return;
		}

		const countryCode = getCountryDialCode(country);
		const options = await getInput({
			username: userItem.sub,
			name: firstName.trim() + ' ' + lastName.trim(),
			firstname: firstName.trim(),
			lastname: lastName.trim(),
			role: role,
			country: country.trim(),
			phone: `${countryCode}${phone.trim()}`,
			email: email.trim(),
		});

		try {
			await API.post('AdminQueries', '/adminUpdateUserAttributes', options);
			const userData = await API.get('AdminQueries', '/getUser', await getOptions({ username: userItem.sub }));
			const cognitoUsername = userData?.Username;
			if (role === Roles.Admin || role == Roles.Manager) {
				await addUserToGroup(cognitoUsername, 'Admin');
			} else {
				await removeUserFromGroup(cognitoUsername, 'Admin');
			}
			onUpdate(parseCognitoUser({ ...userData, Attributes: userData.UserAttributes }));
		} catch (err) {
			console.log('updateUser - error', err);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
		setIsBusy(false);
	};

	const onSave = async () => {
		setIsBusy(true);
		try {
			id ? await updateUser(): await createUser();
		} catch (err) {
			console.log('Error saving user', err);
		}
		setIsBusy(false);
	};

	if (!groupName) {
		return null;
	}

	return (
		<Card>
			<Slot slot="header">
				<CardTitle>{userItem ? 'Edit User' : 'New User'}</CardTitle>
				<span className="is-clickable" onClick={onCancel}>
					<IconClose />
				</span>
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
					<FormSelect
						name="role"
						value={role}
						label="User Role"
						onChange={setRole}
						required={true}
						error={roleError}
						options={roleOptions}
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
					<ErrorNotificaition error={error} />
				</div>
			</Slot>
			<Slot slot="footer">
				<FormButton
					variant={['is-outlined', 'is-ui-button']}
					onClick={onSave}
					disabled={isBusy}
					loading={isBusy}
				>
					{userItem ? 'Save & Update' : 'Create'}
				</FormButton>
			</Slot>
		</Card>
	);
};

export default UserForm;

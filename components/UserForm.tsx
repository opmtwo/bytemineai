import { FormEvent, useEffect, useState } from 'react';

import countryCodes from '../data/country-codes';
import { useCrudContext } from '../providers/crud-provider';
import { IBytemineUser, roleOptions } from '../types';
import { isCountryValid, isEmailValid, isFirstNameValid, isLastNameValid, isPhoneValid, isPhoneValidStrict, isRoleValid } from '../utils/user-utils';
import Card from './cards/Card';
import CardTitle from './CardTitle';
import FormButton from './form/FormButton';
import FormField from './form/FormField';
import FormInput from './form/FormInput';
import FormSelect from './form/FormSelect';
import IconClose from './icons/IconClose';
import ErrorNotificaition from './notifications/ErrorNotification';
import Slot from './Slot';
import { callApi } from '../utils/helper-utils';
import FormButtonNew from './form/FormButtonNew';

const UserForm = () => {
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

	// crud context
	const {
		isBusy: userIsBusy,
		error: userError,
		formErrors: userFormErrors,
		activeItem: userActiveItem,
		onCreate: userOnCreate,
		onUpdate: userOnUpdate,
		onFormCancel: userOnFormCancel,
	} = useCrudContext<IBytemineUser>();

	useEffect(() => {
		loadFormData();
	}, [userActiveItem]);

	const loadFormData = async () => {
		if (!userActiveItem?.id) {
			resetForm();
			return;
		}
		setId(userActiveItem.id);
		setFirstName(userActiveItem.givenName || '');
		setLastName(userActiveItem.familyName || '');
		setPhone(userActiveItem.phone || '');
		setEmail(userActiveItem.email || '');
		setRole(userActiveItem.role || '');
	};

	const resetForm = async () => {
		setId('');
		setFirstName('');
		setLastName('');
		setPhone('');
		setEmail('');
		setRole('');
		setError(undefined);
	};

	const getFormData = () =>
		({
			role,
			email,
			phone,
			givenName: firstName,
			familyName: lastName,
			name: `${firstName} ${lastName}`,
			// country,
		});

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

		// err = (await isCountryValid(country)) ? undefined : new Error('Invalid country');
		// isValid = err ? false : isValid;
		// setCountryError(err);

		err = (await isPhoneValidStrict(phone)) ? undefined : new Error('Invalid phone number');
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

		if (isValid) {
			const available = (await callApi(null, `api/v1/users/available?email=${email}`, {})) as { id?: string };
			err = !available.id || available.id === id ? undefined : new Error(`Email already in use.`);
			isValid = err ? false : isValid;
			setEmailError(err);
		}

		return isValid;
	};

	const onSuccess = async (value: IBytemineUser) => {
		// const asPath = `/help/${value.id}/edit`;
		// if (router.asPath !== asPath) {
		// 	router.push(asPath);
		// }
		return value;
	};

	const create = async () => {
		await userOnCreate(getFormData() as Partial<IBytemineUser>, {}, {}, {}, onSuccess);
		window.dispatchEvent(new Event('logs.refresh'));
	};

	const update = async () => {
		await userOnUpdate(getFormData() as Partial<IBytemineUser>, {}, {}, {}, onSuccess);
		window.dispatchEvent(new Event('logs.refresh'));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsBusy(true);
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		id ? await update() : await create();
		setIsBusy(false);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<Card>
				<Slot slot="header">
					<CardTitle>{id ? 'Edit User' : 'New User'}</CardTitle>
					<span className="is-clickable" onClick={userOnFormCancel}>
						<IconClose />
					</span>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput
							name="email"
							value={email}
							label="Email Address"
							onChange={id ? undefined : setEmail}
							required={true}
							error={emailError}
							readonly={id ? true : false}
							disabled={id ? true : false}
						/>
						<FormInput name="firstName" value={firstName} label="First Name" onChange={setFirstName} required={true} error={firstNameError} />
						<FormInput name="lastName" value={lastName} label="Last Name" onChange={setLastName} required={true} error={lastNameError} />
						<FormSelect name="role" value={role} label="User Role" onChange={setRole} required={true} error={roleError} options={roleOptions} />
						{/* <FormField>
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
									<FormInput name="phone" value={phone} label="Phone Number" onChange={setPhone} required={true} error={phoneError} />
								</div>
							</div>
						</FormField> */}
						<FormInput name="phone" value={phone} label="Phone Number" onChange={setPhone} required={true} error={phoneError} />
						<ErrorNotificaition error={error} />
					</div>
				</Slot>
				<Slot slot="footer">
					<FormButtonNew type="submit" onClick={handleSubmit} disabled={isBusy} loading={isBusy}>
						{id ? 'Save & Update' : 'Create'}
					</FormButtonNew>
				</Slot>
			</Card>
		</form>
	);
};

export default UserForm;

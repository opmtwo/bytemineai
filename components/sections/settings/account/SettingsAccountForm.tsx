import { signOut, updatePassword } from 'aws-amplify/auth';
import { FormEvent, useEffect, useState } from 'react';

import { countryCodes } from '../../../../codes';
import { useAuthContext } from '../../../../providers/auth-data-provider';
import { callApi, cleanupBodyClassList, notifyError } from '../../../../utils/helper-utils';
import { isCountryValid, isFirstNameValid, isLastNameValid, isPasswordValid, isPhoneValid, isPhoneValidStrict } from '../../../../utils/user-utils';
import AvatarForm from '../../../AvatarForm';
import Card from '../../../Card';
import Confirm from '../../../Confirm';
import FormButtonNew from '../../../form/FormButtonNew';
import FormInput from '../../../form/FormInput';
import FormSelect from '../../../form/FormSelect';
import IconNewTrash from '../../../icons/IconNewTrash';
import LoaderFullscreen from '../../../LoaderFullscreen';
import Slot from '../../../Slot';

const SettingsAccountForm = () => {
	const [id, setId] = useState('');

	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState<Error>();

	const [lastName, setLastName] = useState('');
	const [lastNameError, setLastNameError] = useState<Error>();

	const [company, setCompany] = useState('US');
	const [companyError, setCompanyError] = useState<Error>();

	const [country, setCountry] = useState('US');
	const [countryError, setCountryError] = useState<Error>();

	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState<Error>();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();

	const [pwd, setPwd] = useState('');
	const [pwdError, setPwdError] = useState<Error>();

	const [pwdNew, setPwdNew] = useState('');
	const [pwdNewError, setPwdNewError] = useState<Error>();

	const [pwdCnf, setPwdCnf] = useState('');
	const [pwdCnfError, setPwdCnfError] = useState<Error>();

	const { isAuthBusy, self, refresh, onSignOut } = useAuthContext();

	// delete modal
	const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
	const [isDeleteBusy, setIsDeleteBusy] = useState(false);

	useEffect(() => {
		loadFormData();
	}, [self?.id]);

	const loadFormData = async () => {
		setIsBusy(true);
		// await refresh();
		if (!self?.id) {
			resetForm();
			setIsBusy(false);
			return;
		}
		setId(self.id);
		setFirstName(self.givenName || '');
		setLastName(self.familyName || '');
		setCountry(self.country || '');
		setPhone(self.phone || '');
		setEmail(self.email || '');
		setCompany(self.company || '');
		setIsBusy(false);
	};

	const resetForm = async () => {
		setId('');
		setFirstName('');
		setLastName('');
		setPhone('');
		setEmail('');
		setCompany('');
		setCountry('US');
		setError(undefined);
	};

	const resetPasswordForm = async () => {
		setPwd('');
		setPwdNew('');
		setPwdCnf('');
	};

	const getFormData = () => ({
		email,
		phone,
		givenName: firstName,
		familyName: lastName,
		name: `${firstName} ${lastName}`,
		company,
		country,
	});

	/**
	 * Validate form
	 * @returns {Boolean}
	 */
	const isFormValid = async () => {
		let err;
		let isValid = true;

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

		if (pwd || pwdNew || pwdCnf) {
			err = (await isPasswordValid(pwd ?? ''))
				? undefined
				: new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces');
			isValid = err ? false : isValid;
			setPwdError(err);

			err = (await isPasswordValid(pwdNew ?? ''))
				? undefined
				: new Error('Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, and no spaces');
			isValid = err ? false : isValid;
			setPwdNewError(err);

			err = pwdNew && pwdCnf && pwdNew === pwdCnf ? undefined : new Error('Password confirmation does not match');
			isValid = err ? false : isValid;
			setPwdCnfError(err);
		} else {
			setPwdError(undefined);
			setPwdNewError(undefined);
			setPwdCnfError(undefined);
		}

		return isValid;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsBusy(true);
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		try {
			await callApi(null, 'api/v1/me', {
				method: 'POST',
				body: JSON.stringify(getFormData()),
			});
			if (pwd) {
				try {
					await updatePassword({ oldPassword: pwd, newPassword: pwdNew });
					resetPasswordForm();
				} catch (err) {
					console.log('handleSubmit - error - update password failed', err);
					notifyError(null, 'Please check your current password, or ensure your new password meets all requirements.');
				}
			}
			await refresh();
		} catch (err) {
			console.log('handleSubmit - error', err);
		}
		setIsBusy(false);
	};

	const handleCancel = async () => {
		loadFormData();
		resetPasswordForm();
	};

	const onDelete = () => {
		setIsDeleteModalActive(true);
	};

	const onDeleteSubmit = async () => {
		setIsDeleteBusy(true);
		setIsDeleteModalActive(false);
		console.log(new Date());
		try {
			await callApi(null, 'api/v1/me', { method: 'DELETE' });
			await signOut();
			await onSignOut();
			await cleanupBodyClassList();
			window.location.href = '/';
		} catch (err) {
			notifyError(`We encountered an error while processing your request. Please try again later.`);
		}
		console.log(new Date());
		setIsDeleteBusy(false);
	};

	const onDeleteCancel = () => {
		setIsDeleteModalActive(false);
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			{isBusy || isDeleteBusy || isAuthBusy ? <LoaderFullscreen /> : null}
			<Card card={{ className: 'panel has-background-white' }}>
				<Slot slot="body">
					<div className="panel-block is-block">
						<AvatarForm />
						<div className="columns is-tablet is-multiline">
							<div className="column is-6-tablet">
								<FormInput
									name="firstName"
									value={firstName}
									label="First Name"
									onChange={setFirstName}
									required={true}
									error={firstNameError}
								/>
							</div>
							<div className="column is-6-tablet">
								<FormInput name="lastName" value={lastName} label="Last Name" onChange={setLastName} required={true} error={lastNameError} />
							</div>
							<div className="column is-12">
								<FormInput name="company" value={company} label="Company" onChange={setCompany} required={true} error={companyError} />
							</div>
							<div className="column is-12-tablet">
								<FormInput
									name="email"
									value={email}
									label="Email Address"
									required={true}
									error={emailError}
									readonly={true}
									disabled={true}
								/>
							</div>
							<div className="column is-6-tablet">
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
							<div className="column is-6-tablet">
								<FormInput name="phone" value={phone} label="Phone Number" onChange={setPhone} required={true} error={phoneError} />
							</div>
							<div className="column is-12">
								<h3 className="title is-4">Password</h3>
							</div>
							<div className="column is-12">
								<FormInput type="password" name="pwd" value={pwd} label="Current password" onChange={setPwd} error={pwdError} />
							</div>
							<div className="column is-12">
								<FormInput type="password" name="pwdNew" value={pwdNew} label="New password" onChange={setPwdNew} error={pwdNewError} />
							</div>
							<div className="column is-12">
								<FormInput type="password" name="pwdCnf" value={pwdCnf} label="Confirm new password" onChange={setPwdCnf} error={pwdCnfError} />
							</div>
							<div className="column is-12">
								<div className="is-flex is-justify-content-flex-end">
									<FormButtonNew type="button" className="mr-5" onClick={handleCancel}>
										Cancel
									</FormButtonNew>
									<FormButtonNew type="submit" variant="active">
										Update
									</FormButtonNew>
								</div>
							</div>
							<div className="column is-12">
								<hr className="my-3" />
							</div>
							<div className="column is-12">
								<div className="is-flex is-justify-content-space-between">
									<div className="is-left">
										<h3 className="title is-4 mb-2">Delete My Account</h3>
										<p>Permanently delete the account and remove access from all workspaces.</p>
									</div>
									<div className="is-right">
										<FormButtonNew type="button" variant="muted" onClick={onDelete}>
											<IconNewTrash width={20} />
											<span>Delete Account</span>
										</FormButtonNew>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Slot>
			</Card>
			<Confirm
				title="Cancel account?"
				msg=""
				isActive={isDeleteModalActive}
				submitLabel="Yes"
				cancelLabel="No"
				onSubmit={onDeleteSubmit}
				onCancel={onDeleteCancel}
			>
				Are you sure you want to cancel your account? This action cannot be undone!
				<br />
				<br />
				You will be logged out and will loose access to your account.
			</Confirm>
		</form>
	);
};

export default SettingsAccountForm;

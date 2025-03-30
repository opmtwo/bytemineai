import { FormEvent, useEffect, useState } from 'react';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { accountTypeOptions, renewalPeriodOptions, Roles, UserAttributes } from '../types';
import { useAuthContext } from '../providers/auth-data-provider';
import Card from './cards/Card';
import FormButton from './form/FormButton';
import FormInput from './form/FormInput';
import Slot from './Slot';
import ErrorNotificaition from './notifications/ErrorNotification';
import IconClose from './icons/IconClose';
import CardTitle from './CardTitle';
import {
	isAccountTypeValid,
	isBonusCreditsValid,
	isCountryValid,
	isCreditsValid,
	isEmailValid,
	isFirstNameValid,
	isLastNameValid,
	isPhoneValid,
	isRenewalPeriodValid,
	isSeatsValid,
	isUsernameValid,
	parseCognitoUser,
} from '../utils/user-utils';
import FormSelect from './form/FormSelect';
import { genericErrorMessage } from '../consts';
import { getCountryDialCode } from '../utils/helper-utils';
import FormField from './form/FormField';
import countryCodes from '../data/country-codes';
import FormCheckbox from './form/FormCheckbox';

const AccountForm = ({
	userItem,
    renewalPeriodIn,
    creditsIn,
    monthlyCreditsIn,
    quarterlyCredits,
    annualCreditsIn,
    stripeSubscriptionIdIn,
    stripeCustomerIdIn,
    subscriptionStatusIn,
    createdAtIn,
    firstPaidAtIn,
    lastPaidAtIn,
	isOwner,
	onCreate,
	onUpdate,
	onCancel,
}: {
	userItem?: UserAttributes;
    renewalPeriodIn?: string;
    creditsIn?: string;
    monthlyCreditsIn?: string;
    quarterlyCredits?: string;
    annualCreditsIn?: string;
    stripeSubscriptionIdIn?: string;
    stripeCustomerIdIn?: string;
    subscriptionStatusIn?: string;
    createdAtIn?: string;
    firstPaidAtIn?: string;
    lastPaidAtIn?: string;
	isOwner?: boolean;
	onCreate: Function;
	onUpdate: Function;
	onCancel?: () => void;
}) => {
	const { isRoot } = useAuthContext();

	const [id, setId] = useState('');
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState<Error>();
	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState<Error>();
	const [lastName, setLastName] = useState('');
	const [lastNameError, setLastNameError] = useState<Error>();
    const [accountType, setAccountType] = useState('');
	const [accountTypeError, setAccountTypeError] = useState<Error>();
	const [credits, setCredits] = useState<string>('');
	const [creditsError, setCreditsError] = useState<Error>();
	const [bonusCredits, setBonusCredits] = useState('');
	const [bonusCreditsError, setBonusCreditsError] = useState<Error>();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<Error>();
	const [seats, setSeats] = useState('');
	const [seatsError, setSeatsError] = useState<Error>();
	const [renewalPeriod, setRenewalPeriod] = useState('');
	const [renewalPeriodError, setRenewalPeriodError] = useState<Error>();
	const [country, setCountry] = useState('US');
	const [countryError, setCountryError] = useState<Error>();
	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState<Error>();
	const [hasApi, setHasApi] = useState(false);
	const [hasEmail, setHasEmail] = useState(false);
    const [annualCredits, setAnnualCredits] = useState<string>('');
    const [monthlyCredits, setMonthlyCredits] = useState<string>('');
    const [stripeCustomerId, setStripeCustomerId] = useState<string>('');
    const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string>('');
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<string>('');
    const [firstPaidAt, setFirstPaidAt] = useState<string>('');
    const [lastPaidAt, setLastPaidAt] = useState<string>('');
	const role = Roles.Admin;

	const resetForm = () => {
		setId('');
		setUsername('');
		setAccountType('');
		setCredits('');
		setBonusCredits('');
		setRenewalPeriod('');
		setEmail('');
		//setSeats('');
	};

	useEffect(() => {
		if (!userItem) {
			resetForm();
			return;
		}
		setId(userItem.sub);
		setUsername(userItem.name);
		setFirstName(userItem.given_name);
		setLastName(userItem.family_name);
		setEmail(userItem.email);
        let subStatus = 'Trial';
        if (subscriptionStatusIn === 'ActiveCustomer'){
            subStatus = 'ActiveCustomer';
        }
        setAccountType(subStatus);
        setRenewalPeriod(renewalPeriodIn || '');

        setCredits(creditsIn?.toString() || '');
		setBonusCredits(quarterlyCredits || '0');

		//setSeats(userItem['custom:seats']);
        setAnnualCredits(annualCreditsIn?.toString() || '');
        setMonthlyCredits(monthlyCreditsIn?.toString() || '');
        setStripeCustomerId(stripeCustomerIdIn || '');
        setStripeSubscriptionId(stripeSubscriptionIdIn || '');
        setSubscriptionStatus(subscriptionStatusIn || '');
        setCreatedAt(createdAtIn || '');
        setLastPaidAt(lastPaidAtIn || '');
        setFirstPaidAt(firstPaidAtIn || '');
		setHasApi(userItem['custom:has_api'] ? true: false);
		setHasEmail(userItem['custom:has_email'] ? true: false);
		
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
		err = (await isAccountTypeValid(accountType)) ? undefined : new Error('Invalid account type');
		isValid = err ? false : isValid;
		setAccountTypeError(err);

		err = (await isRenewalPeriodValid(renewalPeriod)) ? undefined : new Error('Invalid renewal period');
		isValid = err ? false : isValid;
		setRenewalPeriodError(err);

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

		err = (await isCreditsValid(credits)) ? undefined : new Error('Invalid credits');
		isValid = err ? false : isValid;
		setCreditsError(err);
		/*
		err = (await isSeatsValid(bonusCredits)) ? undefined : new Error('Invalid number of seats');
		isValid = err ? false : isValid;
		setSeatsError(err);*/

		err = (await isBonusCreditsValid(bonusCredits)) ? undefined : new Error('Invalid bonus credits');
		isValid = err ? false : isValid;
		setBonusCreditsError(err);

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

	const getInputData = () => ({
		username: username.trim(),
		email: email.trim(),
		'custom:role': role,
		'custom:group_name': name,
		'custom:account_type': accountType.trim(),
		'custom:renewal_period': renewalPeriod.trim(),
		'custom:credits': credits.trim(),
		'custom:bonus_credits': bonusCredits.trim(),
		'custom:created_at': (+new Date()).toString(),
	});

	const adminCreateGroup = async (groupname: string) => {
		const options = await getInput({ groupname });
		return new Promise((resolve, reject) => {
			API.post('AdminQueries', '/adminCreateGroup', options)
				.then(() => {
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
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

	const createUser = async () => {
		const countryCode = getCountryDialCode(country);
		const options = await getInput({
			name: username.trim(),
			firstname: firstName.trim(),
			lastname: lastName.trim(),
			email: email.trim(),
			username: email.trim(),
			role: role,
			groupname: username,
			account_type: accountType.trim(),
			renewal_period: renewalPeriod.trim(),
			credits: credits.trim(),
			bonus_credits: bonusCredits.trim(),
			country: country.trim(),
			phone: `${countryCode}${phone.trim()}`,
			hasApi: hasApi ? '1' : '',
			hasEmail: hasEmail ? '1' : '',
		});
		try {
			const response = await API.post('AdminQueries', '/adminCreateAgency', options);
			const cognitoUsername = response?.data?.User.Username;
			await adminCreateGroup(username);
			await addUserToGroup(cognitoUsername, username);
			await addUserToGroup(cognitoUsername, 'Default');
			await addUserToGroup(cognitoUsername, 'Admin');
			if (isOwner) {
				await addUserToGroup(cognitoUsername, 'Owners');
			}
			const userData = await API.get('AdminQueries', '/getUser', await getOptions({ username: cognitoUsername }));
			onCreate(parseCognitoUser({ ...userData, Attributes: userData.UserAttributes }));
		} catch (err) {
			console.log('createUser - error', err);
			setError(new Error(err?.response?.data?.message || genericErrorMessage));
		}
	};

	const updateUser = async () => {

		const countryCode = getCountryDialCode(country);
		const options = await getInput({
			name: username.trim(),
			firstname: firstName.trim(),
			lastname: lastName.trim(),
			email: email.trim(),
			username: email.trim(),
			account_type: accountType.trim(),
			renewal_period: renewalPeriod.trim(),
			credits: credits.trim(),
			bonus_credits: bonusCredits.trim(),
			country: country.trim(),
			phone: `${countryCode}${phone.trim()}`,
			hasApi: hasApi ? '1' : '',
			hasEmail: hasEmail ? '1' : '',
		});
		try {
			await API.post('AdminQueries', '/adminUpdateAgency', options);
			const userData = await API.get('AdminQueries', '/getUser', await getOptions({ username: email.trim() }));
            try {

                const options2 = await getInput(
                        {"groupId":username,
                            "currentCredits":credits,
                            "annualCredits":annualCredits,
                            "quarterlyCredits":bonusCredits,
                            "monthlyCredits":monthlyCredits,
                            "stripeCustomerId":stripeCustomerId,
                            "stripeSubscriptionID":stripeSubscriptionId,
                            "subscriptionStatus":accountType,
                            "createdAt":createdAt,
                            "lastPaid":lastPaidAt,
                            "firstPaid":firstPaidAt,
                            "subscriptionPeriod":renewalPeriod
                        });
                await API.post('nymblrRestApi', '/api/update-subscription', options2);
                onUpdate(parseCognitoUser({ ...userData, Attributes: userData.UserAttributes }));
            } catch (err) {
                console.log('updateUser - error', err);
                setError(new Error(err?.response?.data?.message || genericErrorMessage));
            }

		} catch (err) {
			console.log('updateUser - error', err);
			setError(new Error(err?.response?.data?.message || genericErrorMessage));
		}
        //here

	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const isValid = await isFormValid();
		if (!isValid) {
			return;
		}
		setIsBusy(true);
		if (id) {

			await updateUser();
		} else {
			await createUser();
		}
		setIsBusy(false);
	};

	if (!isRoot) {
		return null;
	}
	/*
	<FormCheckbox
							value={hasApi}
							label="API"
							isChecked={hasApi}
							onChange={setHasApi}
						/>
						<FormCheckbox
							value={hasEmail}
							label="Send E-mail"
							isChecked={hasEmail}
							onChange={setHasEmail}
						/>
	 */
	return (
		<form method="POST" onSubmit={onSubmit}>
			<Card>
				<Slot slot="header">
					<CardTitle>{userItem ? 'Edit Account' : 'New Account'}</CardTitle>
					<span className="is-clickable" onClick={onCancel}>
						<IconClose />
					</span>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block">
						<FormInput
							name="username"
							value={username}
							label="User Name"
							onChange={setUsername}
							required={true}
							error={usernameError}
							disabled={userItem?.sub ? true : false}
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
						<FormSelect
							name="accountType"
							value={accountType}
							label="Account Type"
							onChange={setAccountType}
							options={accountTypeOptions}
							required={true}
							error={accountTypeError}
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
						<FormSelect
							name="renewalPeriod"
							value={renewalPeriod}
							label="Renewal Period"
							onChange={setRenewalPeriod}
							options={renewalPeriodOptions}
							required={true}
							error={renewalPeriodError}
						/>
						<FormInput
							name="credits"
							value={credits}
							label="Current Credits"
							onChange={setCredits}
							required={true}
							error={creditsError}
						/>
						<FormInput
							name="quarterlyCredits"
                            value={bonusCredits}
							label="Quarterly/Bonus Credits"
							onChange={setBonusCredits}
							required={true}
							error={bonusCreditsError}
						/>
                        <FormInput
                            name="monthlyCredits"
                            value={monthlyCredits}
                            label="Monthly Credits"
                            onChange={setMonthlyCredits}
                            required={true}
                            error={bonusCreditsError}
                        />
                        <FormInput
                            name="annualCredits"
                            value={annualCredits}
                            label="Annual Credits"
                            onChange={setAnnualCredits}
                            required={true}
                            error={bonusCreditsError}
                        />
                        <FormInput
                            name="stripeCustomerId"
                            value={stripeCustomerId}
                            label="Stripe Customer ID"
                            onChange={setStripeCustomerId}
                            required={false}
                            error={bonusCreditsError}
                        />
                        <FormInput
                            name="stripeSubscriptionIds"
                            value={stripeSubscriptionId}
                            label="Stripe Subscription IDs"
                            onChange={setStripeSubscriptionId}
                            required={false}
                            error={bonusCreditsError}
                        />
                        <FormInput
                            name="createdAt"
                            value={createdAt}
                            label="Subscription Created At"
                            onChange={setCreatedAt}
                            required={true}
                            error={bonusCreditsError}
                        />
                        <FormInput
                            name="firstPaid"
                            value={firstPaidAt}
                            label="Date First Payment"
                            onChange={setFirstPaidAt}
                            required={false}
                            error={bonusCreditsError}
                        />
                        <FormInput
                            name="lastPaid"
                            value={lastPaidAt}
                            label="Date Last Payment"
                            onChange={setLastPaidAt}
                            required={false}
                            error={bonusCreditsError}
                        />
						<FormInput
							name="email"
							value={email}
							label="Account Owner Email"
							onChange={setEmail}
							required={true}
							error={emailError}
							disabled={userItem?.sub ? true : false}
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
						Save &amp; Update
					</FormButton>
				</Slot>
			</Card>
		</form>
	);
};

export default AccountForm;

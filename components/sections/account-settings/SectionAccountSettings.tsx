import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { CognitoUserData, UsageModel, UserAttributes } from '../../../types';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { getUsage, parseCognitoUser } from '../../../utils/user-utils';
import Modal from '../../modals/Modal';
import UsersLoader from '../../UsersLoader';
import Usage from '../../Usage';
import AccountInfo from '../../AccountInfo';
import UserItems from '../my-team/UserItems';
import UserForm from '../../UserForm';
import CustomizeForm from '../../CustomizeForm';
import { useSettingsContext } from '../../../providers/settings-provider';
import FormButton from '../../form/FormButton';
import AccountName from '../../AccountName';
import DatePicker from '../../DatePicker';
import { sumBy, uniqBy } from 'lodash';
import moment from 'moment';

const SectionAccountSettings = () => {
	// users
	const [isBusy, setIsBusy] = useState(false);
	const [accountItems, setAccountItems] = useState<UserAttributes[]>([]);
	const [activeUser, setActiveUser] = useState<UserAttributes>();
	const [nextToken, setNextToken] = useState<string>();
	const [isUserModalActive, setIsUserModalActive] = useState(false);
	const [isCustomizeModalActive, setIsCustomizeModalActive] = useState(false);

	// date and picker
	const [date, setDate] = useState<string>('');
	const [isDatePickerModalActive, setIsDatePickerModalActive] = useState(false);
	const [usageItems, setUsageItems] = useState<UsageModel[]>();
	const [isUsageLoading, setIsUsageLoading] = useState(false);

	// settings
	const [isSettingsBusy, setIsSettingsBusy] = useState(false);
	const [accountCredits, setAccountCredits] = useState<number>(0);
	const [accountUsage, setAccountUsage] = useState<number>(0);
	const [accountSearches, setAccountSearches] = useState<number>(0);
	const [accountAttributes, setAccountAttributes] = useState<UserAttributes>();

    // new sub vars
    const [renewalPeriod, setRenewalPeriod] = useState<string>();
    const [currentCredits, setCurrentCredits] = useState<string>();
    const [quarterlyCredits, setQuarterlyCredits] = useState<string>();
    const [annualCredits, setAnnualCredits] = useState<string>();
    const [monthlyCredits, setMonthlyCredits] = useState<string>();
    const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string>();
    const [stripeCustomerId, setStripeCustomerId] = useState<string>();
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>();
    const [createdAt, setCreatedAt] = useState<string>();
    const [firstPaidAt, setFirstPaidAt] = useState<string>();
    const [lastPaidAt, setLastPaidAt] = useState<string>();

	// context and hooks
	const { user } = useAuthContext();
	const { settings, getGroupUsage, initSettings } = useSettingsContext();

	const groupname = user?.attributes['custom:group_name'];

	useEffect(() => {
		if (!groupname) {
			return;
		}
		(async () => {
			setIsSettingsBusy(true);
			const response: any = await getGroupUsage(groupname);
			const account = response?.account;
            const attr = response?.attributes;
			setAccountAttributes(parseCognitoUser(account));
            setRenewalPeriod(attr?.renewal_period);
            setCurrentCredits(attr?.credits);
            setMonthlyCredits(attr?.monthly_credits);
            setQuarterlyCredits(attr?.quarterly_credits);
            setAnnualCredits(attr?.yearly_credits);
            setStripeSubscriptionId(attr?.stripeSubscriptionIds);
            setStripeCustomerId(attr?.stripeCustomerId);
            setFirstPaidAt(attr?.firstPaidAt);
            setLastPaidAt(attr?.lastPaidAt);
            setCreatedAt(attr?.sub_created_at);
            setSubscriptionStatus(attr?.account_type);
			setAccountCredits(response?.totalCredits || 0);
			setAccountUsage(response?.totalUsage || 0);
			setAccountSearches(response?.totalSearches || 0);
			setIsSettingsBusy(false);
		})();
	}, [groupname]);

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const onNew = () => {
		setActiveUser(undefined);
		setIsUserModalActive(true);
	};

	const onCancel = () => {
		setActiveUser(undefined);
		setIsUserModalActive(false);
	};

	const onEdit = (username: string) => {
		try {
			const index = accountItems.findIndex((user) => user.sub === username);
			if (index !== -1) {
				setActiveUser(accountItems[index]);
				setIsUserModalActive(true);
			}
		} catch (err) {
			//
		}
	};

	const onCreate = (user: UserAttributes) => {
		setAccountItems([user, ...accountItems]);
		setIsUserModalActive(false);
	};

	const onUpdate = (user: UserAttributes) => {
		const index = accountItems.findIndex((item) => item.sub === user.sub);
		if (index !== -1) {
			const newItems = [...accountItems];
			newItems[index] = user;
			setAccountItems(newItems);
		} else {
			setAccountItems([user, ...accountItems]);
		}
		setIsUserModalActive(false);
		setActiveUser(undefined);
	};

	const onDelete = async (username: string) => {
		try {
			const index = accountItems.findIndex((user) => user.sub === username);
			if (index !== -1) {
				const newUsers = [...accountItems];
				newUsers.splice(index, 1);
				setAccountItems(newUsers);
			}
			const options = await getInput({ username });
			await API.post('AdminQueries', '/disableUser', options);
			await API.post('AdminQueries', '/deleteUser', options);
		} catch (err) {
			console.log('Error loading users', err);
		}
	};

	const onLoad = (users: CognitoUserData[], token?: string) => {
		const newUsers: UserAttributes[] = users.map((data) => parseCognitoUser(data));
		setAccountItems([...newUsers, ...accountItems]);
		setNextToken(token);
	};

	const onCustomize = () => setIsCustomizeModalActive(true);

	const onCustomizeSubmit = async (newSttings: UserAttributes) => {
		if (groupname) {
			await initSettings(groupname);
		}
		setIsCustomizeModalActive(false);
	};

	const onCustomizeCancel = () => setIsCustomizeModalActive(false);

	const onDateSelect = () => setIsDatePickerModalActive(true);

	const onDateSubmit = async (date: string) => {
		setDate(date);
		setIsDatePickerModalActive(false);
		setIsUsageLoading(true);
		let items: UsageModel[] = [];
		if (groupname) {
			items = await getUsage(groupname, date);
		}
		setUsageItems(items);
		setIsUsageLoading(false);
	};

	const onDateCancel = () => setIsDatePickerModalActive(false);

	if (!groupname) {
		return null;
	}

	const users = accountItems.length;
	const searches = usageItems !== undefined ? uniqBy(usageItems, 'filterId').length : accountSearches;
	const seats = parseInt(accountAttributes?.['custom:seats'] || '0');
	const creditsUsed = usageItems !== undefined ? sumBy(usageItems, 'credits') : accountUsage;
	const creditsLeft = accountCredits - accountUsage;
	const plan = accountAttributes?.['custom:renewal_period'] || 'Trial';
	//const monthlyCredits = parseInt(accountAttributes?.['custom:credits'] || '0');
	const bonusCredits = parseInt(accountAttributes?.['custom:bonus_credits'] || '0');
	const canAddNewUsers = parseInt(settings?.['custom:seats'] || '0') > accountItems.length ? true : false;

    const createdAtMoment = moment(createdAt || '2000-01-01').format("YYYY-MM-DD");
    let lastPaidAtMoment = moment(lastPaidAt || '2000-01-01').format("YYYY-MM-DD");
    if (moment(lastPaidAt || '2000-01-01') <= moment('2000-01-01')){
        lastPaidAtMoment = 'Never';
    }
	return (
		<>
			<AccountName name={groupname} />
        <AccountInfo
            limit={seats}
            plan={plan}
            monthlyCredits={parseInt(monthlyCredits || '0')}
            currentCredits={parseInt(currentCredits || '0')}
            annualCredits={parseInt(annualCredits || '0')}
            bonusCredits={bonusCredits}
            subscriptionStatus={subscriptionStatus || ''}
            createdAt={createdAtMoment}
            lastPaidAt={lastPaidAtMoment}
            stripeCustomerId={stripeCustomerId || ''}
            onCustomize={isBusy ? onCustomize : undefined}
            isBusy={isBusy}
        />

        <Usage
            users={users}
            searches={searches}
            creditsUsed={creditsUsed}
            creditsLeft={parseInt(currentCredits || '0')}
            onDateSelect={onDateSelect}
            date={date}
            isBusy={isBusy || isUsageLoading}
        />
			<UserItems
				items={accountItems}
				isBusy={isBusy}
				onNew={onNew}
				onEdit={onEdit}
				onDelete={onDelete}
				isNewDisabled={canAddNewUsers !== true}
			/>
			<Modal isActive={isUserModalActive} onCancel={onCancel}>
				<UserForm
					userItem={activeUser}
					groupName={groupname}
					onCreate={onCreate}
					onUpdate={onUpdate}
					onCancel={onCancel}
				/>
			</Modal>
			{settings !== undefined ? (
				<Modal isActive={isCustomizeModalActive} onCancel={onCustomizeCancel}>
					<CustomizeForm
						groupName={groupname}
						settings={settings}
						onCancel={onCustomizeCancel}
						onSubmit={onCustomizeSubmit}
					/>
				</Modal>
			) : null}
			<DatePicker
				value={date}
				isActive={isDatePickerModalActive}
				onSubmit={onDateSubmit}
				onCancel={onDateCancel}
			/>
			{groupname && (
				<UsersLoader
					onLoad={onLoad}
					isBusy={isBusy}
					onBusy={setIsBusy}
					groupname={groupname}
					nextToken={nextToken}
				/>
			)}
		</>
	);
};

export default SectionAccountSettings;

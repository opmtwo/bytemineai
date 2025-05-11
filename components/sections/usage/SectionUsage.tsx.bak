import { useEffect, useState } from 'react';
import { CognitoUserData, UsageModel, UserAttributes } from '../../../types';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { getUsage, parseCognitoUser } from '../../../utils/user-utils';
import UsersLoader from '../../UsersLoader';
import Usage from '../../Usage';
import AccountInfo from '../../AccountInfo';
import { useSettingsContext } from '../../../providers/settings-provider';
import DatePicker from '../../DatePicker';
import { sumBy, uniqBy } from 'lodash';
import AccountMenu from '../../AccountMenu';
import ContactForm from '../../ContactForm';
import Modal from '../../modals/Modal';
import { getSubscriptionInfo } from '../../../utils/helper-utils';
import moment from 'moment';
import { useRouter } from 'next/router';

const SectionUsage = () => {
	// users
    const router = useRouter();

	const [isBusy, setIsBusy] = useState(false);
	const [accountItems, setAccountItems] = useState<UserAttributes[]>([]);
	const [nextToken, setNextToken] = useState<string>();

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

	// contact form
	const [isContactModalActive, setIsContactModalActive] = useState(false);

	// context and hooks
	const { user } = useAuthContext();
    const { getGroupUsage, canUpgrade, totalCredits, settings } = useSettingsContext();

    // new sub vars
    //const [renewalPeriod, setRenewalPeriod] = useState<string>();
    const [currentCredits, setCurrentCredits] = useState<string>();
    const [monthlyCredits, setMonthlyCredits] = useState<string>();
    //const [quarterlyCredits, setQuarterlyCredits] = useState<string>();
    const [annualCredits, setAnnualCredits] = useState<string>();
    //const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string>();
    const [stripeCustomerId, setStripeCustomerId] = useState<string>();
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>();
    const [createdAt, setCreatedAt] = useState<string>();
    //const [firstPaidAt, setFirstPaidAt] = useState<string>();
    const [lastPaidAt, setLastPaidAt] = useState<string>();


	const groupname = user?.attributes['custom:group_name'];

    console.log('s',settings);
    let credits = 0;
    if (settings) {
        credits = parseInt(settings['custom:credits'] || '0');
    }

	useEffect(() => {
		if (!groupname) {
			return;
		}
		(async () => {
			setIsSettingsBusy(true);
			const response: any = await getGroupUsage(groupname);
            const attr = response?.attributes;
            //const credits = attr['custom:credits'];
			const account = response?.account;
			setAccountAttributes(parseCognitoUser(account));
            //setRenewalPeriod(attr?.renewal_period);
            setCurrentCredits(attr?.credits);
            setMonthlyCredits(attr?.monthly_credits);
            //setQuarterlyCredits(attr?.quarterly_credits);
            setAnnualCredits(attr?.yearly_credits);
            //setStripeSubscriptionId(attr?.stripeSubscriptionIds);
            setStripeCustomerId(attr?.stripeCustomerId);
            //setFirstPaidAt(attr?.firstPaidAt);
            setLastPaidAt(attr?.lastPaidAt);
            setCreatedAt(attr?.sub_created_at);
            setSubscriptionStatus(attr?.account_type);
            setAccountCredits(credits);
			setAccountUsage(response?.totalUsage || 0);
			setAccountSearches(response?.totalSearches || 0);
			setIsSettingsBusy(false);
		})();
	}, [groupname]);

	const onLoad = (users: CognitoUserData[], token?: string) => {
		const newUsers: UserAttributes[] = users.map((data) => parseCognitoUser(data));
		setAccountItems([...newUsers, ...accountItems]);
		setNextToken(token);
	};

	const onCustomize = () => {
		//
	};

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

	//const onUpgrade = () => setIsContactModalActive(true);

    const onUpgrade = async () => {
        await router.push({ pathname: '/account-settings/subscription-billing/plan' });
    }

	const onUpgradeCancel = () => setIsContactModalActive(false);

	const onUpgradeSubmit = () => {};

	if (!groupname) {
		return null;
	}

	const users = accountItems.length;
	const searches = usageItems !== undefined ? uniqBy(usageItems, 'filterId').length : accountSearches;
	const seats = parseInt(accountAttributes?.['custom:seats'] || '0');
	const creditsUsed = usageItems !== undefined ? sumBy(usageItems, 'credits') : accountUsage;
	const creditsLeft = accountCredits - accountUsage;
    console.log('rp',settings?.['custom:renewal_period']);
    const plan = settings?.['custom:renewal_period'] || 'Trial';
	//const monthlyCredits = parseInt(settings?.['custom:monthly_credits'] || '0');
    const yearlyCredits = parseInt(settings?.['custom:yearly_credits'] || '0');
    const outputCreditsTotal = (plan === 'Yearly') ? yearlyCredits : monthlyCredits;
    const bonusCredits = parseInt(settings?.['custom:bonus_credits'] || '0');

	let subscriptionInfo;
	if (user.attributes['custom:created_at'] && user.attributes['custom:account_type'] !== 'Trial') {
		subscriptionInfo = getSubscriptionInfo(user.attributes['custom:created_at'], user.attributes['custom:renewal_period']);
	}
    const renewalDate = moment(Date.parse(settings?.['custom:renewal_date'] || Date.now().toString())).add(30, 'days');;
    const createdAtMoment = moment(createdAt || '2000-01-01').format("YYYY-MM-DD");
    let lastPaidAtMoment = moment(lastPaidAt || '2000-01-01').format("YYYY-MM-DD");
    if (moment(lastPaidAt || '2000-01-01') <= moment('2000-01-01')){
        lastPaidAtMoment = 'Never';
    }
    return (
		<>
			<div className="columns is-tablet">
				<div className="column is-3-tablet is-2-widescreen">
					<AccountMenu />
				</div>
				<div className="column is-9-tablet is-10-widescreen">
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
                        isBusy={isSettingsBusy}
                        onUpgrade={canUpgrade ? onUpgrade : undefined}
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
				</div>
			</div>
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
			<Modal isActive={isContactModalActive} onCancel={onUpgradeCancel}>
				<ContactForm onSubmit={onUpgradeSubmit} onCancel={onUpgradeCancel} />
			</Modal>
		</>
	);
};

export default SectionUsage;

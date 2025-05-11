import { useEffect, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { sumBy, uniqBy } from 'lodash';
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
import { useRouter } from 'next/router';
import UserLoader from '../../UserLoader';
import DatePicker from '../../DatePicker';
import AccountName from '../../AccountName';
import AccountForm from '../../AccountForm';
import moment from 'moment';

const SectionAdminPanel = () => {
    const [username, setUsername] = useState('');
    const [userAttributes, setUserAttributes] = useState<UserAttributes>();
    const [isUserLoading, setIsUserLoading] = useState(true);

    const [settings, setSettings] = useState<UserAttributes>();
    const [isSettingsLoading, setIsSettingsLoading] = useState(true);
    const [accountCredits, setAccountCredits] = useState<number>(0);
    const [accountUsage, setAccountUsage] = useState<number>(0);
    const [accountSearches, setAccountSearches] = useState<number>(0);
    const [accountAttributes, setAccountAttributes] = useState<UserAttributes>();

    // new sub vars
    const [renewalPeriod, setRenewalPeriod] = useState<string>();
    const [currentCredits, setCurrentCredits] = useState<string>();
    const [monthlyCredits, setMonthlyCredits] = useState<string>();
    const [quarterlyCredits, setQuarterlyCredits] = useState<string>();
    const [annualCredits, setAnnualCredits] = useState<string>();
    const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string>();
    const [stripeCustomerId, setStripeCustomerId] = useState<string>();
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>();
    const [createdAt, setCreatedAt] = useState<string>();
    const [firstPaidAt, setFirstPaidAt] = useState<string>();
    const [lastPaidAt, setLastPaidAt] = useState<string>();

    const [isBusy, setIsBusy] = useState(true);
    const [accountUsers, setAccountUsers] = useState<UserAttributes[]>([]);
    const [activeUser, setActiveUser] = useState<UserAttributes>();
    const [nextToken, setNextToken] = useState<string>();
    const [isUserModalActive, setIsUserModalActive] = useState(false);
    const [isCustomizeModalActive, setIsCustomizeModalActive] = useState(false);

    const [date, setDate] = useState<string>('');
    const [isDatePickerModalActive, setIsDatePickerModalActive] = useState(false);
    const [usageItems, setUsageItems] = useState<UsageModel[]>();
    const [isUsageLoading, setIsUsageLoading] = useState(false);

    const [isAccountModalActive, setIsAccountModalActive] = useState(false);

    const router = useRouter();
    const { getGroupSettings, getGroupUsage, totalCredits, totalUsage } = useSettingsContext();

    useEffect(() => {
        if (typeof router.query.id === 'string') {
            setUsername(router.query.id);
        }
    }, [router.query.id]);

    useEffect(() => {
        if (!userAttributes || !userAttributes['custom:group_name']) {
            return;
        }
        (async () => {
            setIsSettingsLoading(true);
            const response: any = await getGroupUsage(userAttributes['custom:group_name']);
            const account = response?.account;
            if (!account){
                return;
            }
            const attr = response?.attributes;
            console.log('attr',attr);
            /*

            */
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
            setAccountAttributes(parseCognitoUser(account));
            setAccountCredits(response?.totalCredits || 0);
            setAccountUsage(response?.totalUsage || 0);
            setAccountSearches(response?.totalSearches || 0);
            setIsSettingsLoading(false);
        })();
    }, [userAttributes]);

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
            const index = accountUsers.findIndex((user) => user.sub === username);
            if (index !== -1) {
                setActiveUser(accountUsers[index]);
                setIsUserModalActive(true);
            }
        } catch (err) {
            //
        }
    };

    const onCreate = (user: UserAttributes) => {
        setAccountUsers([user, ...accountUsers]);
        setIsUserModalActive(false);
    };

    const onUpdate = async (user: UserAttributes) => {
        const index = accountUsers.findIndex((item) => item.sub === user.sub);
        if (index !== -1) {
            const newItems = [...accountUsers];
            newItems[index] = user;
            setAccountUsers(newItems);
        } else {
            setAccountUsers([user, ...accountUsers]);
        }

        const response2: any = await getGroupUsage(username);
        const account = response2?.account;
        if (!account){
            return;
        }
        const attr = response2?.attributes;
        console.log('attrUpdate',attr);
        /*

            */
        setRenewalPeriod(attr?.renewal_period);
        setCurrentCredits(attr?.credits);
        setMonthlyCredits(attr?.monthly_credits);
        setQuarterlyCredits(attr?.quarterly_credits);
        setAnnualCredits(attr?.yearly_credits);
        setStripeSubscriptionId(attr?.stripeSubscriptionIds);
        setStripeCustomerId(attr?.stripeCustomerId);
        setFirstPaidAt(attr?.firstPaidAt);
        setLastPaidAt(attr?.lastPaidAt);
        setSubscriptionStatus(attr?.account_type);
        setAccountAttributes(parseCognitoUser(account));
        setAccountCredits(response2?.totalCredits || 0);
        setAccountUsage(response2?.totalUsage || 0);
        setAccountSearches(response2?.totalSearches || 0);
        setIsUserModalActive(false);
        setActiveUser(undefined);

    };

    const onDelete = async (username: string) => {

        try {

            if (confirm('Are you sure?')) {
                const index = accountUsers.findIndex((user) => user.sub === username);
                if (index !== -1) {
                    const newUsers = [...accountUsers];
                    newUsers.splice(index, 1);
                    setAccountUsers(newUsers);
                }
                const options = await getInput({username});
                await API.post('AdminQueries', '/disableUser', options);
                await API.post('AdminQueries', '/deleteUser', options);
            }
        } catch (err) {
            console.log('Error loading users', err);
        }
    };

    const onLoad = (users: CognitoUserData[], token?: string) => {
        const newUsers: UserAttributes[] = users.map((data) => parseCognitoUser(data));
        setAccountUsers([...newUsers, ...accountUsers]);
        setNextToken(token);
    };

    const onCustomize = () => setIsCustomizeModalActive(true);

    const onCustomizeSubmit = () => {
        setIsCustomizeModalActive(false);
    };

    const onCustomizeCancel = () => setIsCustomizeModalActive(false);

    const isSettingsLoaded = userAttributes?.['custom:group_name'] && settings;

    const onDateSelect = () => setIsDatePickerModalActive(true);

    const onDateSubmit = async (date: string) => {
        if (!date || !userAttributes?.['custom:group_name']) {
            return;
        }
        setDate(date);
        setIsDatePickerModalActive(false);
        setIsUsageLoading(true);
        let items: UsageModel[] = [];
        items = await getUsage(userAttributes?.['custom:group_name'], date);
        setUsageItems(items);
        setIsUsageLoading(false);
    };

    const onDateCancel = () => setIsDatePickerModalActive(false);

    const onAccountEdit = () => setIsAccountModalActive(true);

    const onAccountEditSubmit = (attributes: UserAttributes) => {
        setUserAttributes(attributes);
        setIsAccountModalActive(false);
    };

    const onAccountEditCancel = () => setIsAccountModalActive(false);

    const groupname = userAttributes?.['custom:group_name'];
    const users = accountUsers.length;
    const searches = usageItems !== undefined ? uniqBy(usageItems, 'filterId').length : accountSearches;
    const seats = parseInt(accountAttributes?.['custom:seats'] || '0');
    const creditsUsed = usageItems !== undefined ? sumBy(usageItems, 'credits') : accountUsage;
    //const creditsUsed = usageItems !== undefined ? sumBy(usageItems, 'credits') : 0;
    const creditsLeft = accountCredits - accountUsage;
    const plan = accountAttributes?.['custom:renewal_period'] || 'Trial';
    //const monthlyCredits = parseInt(accountAttributes?.['custom:credits'] || '0');
    const bonusCredits = parseInt(accountAttributes?.['custom:bonus_credits'] || '0');
    const canAddNewUsers = parseInt(userAttributes?.['custom:seats'] || '0') > accountUsers.length ? true : false;

    const createdAtMoment = moment(createdAt || '2000-01-01').format("YYYY-MM-DD");
    let lastPaidAtMoment = moment(lastPaidAt || '2000-01-01').format("YYYY-MM-DD");
    if (moment(lastPaidAt || '2000-01-01') <= moment('2000-01-01')){
        lastPaidAtMoment = 'Never';
    }
    return (
        <>
            <AccountName name={userAttributes?.name} />
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
                onEditAccount={onAccountEdit}
                onCustomize={isSettingsLoaded ? onCustomize : undefined}
                isBusy={isSettingsLoading}
            />

            <Usage
                users={users}
                searches={searches}
                creditsUsed={creditsUsed}
                creditsLeft={parseInt(currentCredits || '0')}
                onDateSelect={onDateSelect}
                date={date}
                isBusy={isSettingsLoading || isUsageLoading}
            />
            <UserItems
                items={accountUsers}
                isBusy={isSettingsLoading || isUserLoading || isBusy}
                onNew={onNew}
                onEdit={onEdit}
                onDelete={onDelete}
                isNewDisabled={canAddNewUsers !== true}
            />
            {userAttributes?.sub ? (
                <Modal isActive={isUserModalActive} onCancel={onCancel}>
                    <UserForm
                        userItem={activeUser}
                        onCreate={onCreate}
                        onUpdate={onUpdate}
                        onCancel={onCancel}
                        groupName={userAttributes?.['custom:group_name']}
                    />
                </Modal>
            ) : null}
            {isSettingsLoaded ? (
                <Modal isActive={isCustomizeModalActive} onCancel={onCustomizeCancel}>
                    <CustomizeForm
                        settings={settings}
                        groupName={userAttributes['custom:group_name']}
                        onCancel={onCustomizeCancel}
                        onSubmit={onCustomizeSubmit}
                    />
                </Modal>
            ) : null}
            <Modal isActive={isAccountModalActive} onCancel={onAccountEditCancel}>
                <AccountForm
                    userItem={userAttributes}
                    renewalPeriodIn={renewalPeriod || ''}
                    creditsIn={currentCredits || ''}
                    monthlyCreditsIn={monthlyCredits || ''}
                    quarterlyCredits={quarterlyCredits || ''}
                    annualCreditsIn={annualCredits || ''}
                    stripeSubscriptionIdIn={stripeSubscriptionId || ''}
                    stripeCustomerIdIn={stripeCustomerId || ''}
                    subscriptionStatusIn={subscriptionStatus || ''}
                    createdAtIn={createdAt || ''}
                    firstPaidAtIn={firstPaidAt || ''}
                    lastPaidAtIn={lastPaidAt || ''}
                    onCreate={() => {}}
                    onUpdate={onAccountEditSubmit}
                    onCancel={onAccountEditCancel}
                />
            </Modal>
            {groupname && (
                <UsersLoader
                    onLoad={onLoad}
                    isBusy={isBusy}
                    onBusy={setIsBusy}
                    groupname={groupname}
                    nextToken={nextToken}
                />
            )}
            {username ? (
                <UserLoader
                    username={username}
                    onLoad={setUserAttributes}
                    isBusy={isUserLoading}
                    onBusy={setIsUserLoading}
                />
            ) : null}
            <DatePicker
                value={date}
                isActive={isDatePickerModalActive}
                onSubmit={onDateSubmit}
                onCancel={onDateCancel}
            />
        </>
    );
};

export default SectionAdminPanel;

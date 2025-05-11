import { useState } from 'react';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { AccountInfo, CognitoUserData, UsageModel, UserAttributes } from '../../../types';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { getUsage, parseCognitoUser } from '../../../utils/user-utils';
import Modal from '../../modals/Modal';
import UsersLoaderSumo from '../../UsersLoaderSumo';
import Usage from '../../Usage';
import AccountItems from './AccountItems';
import DatePicker from '../../DatePicker';
import AccountForm from '../../AccountForm';
import { useSettingsContext } from '../../../providers/settings-provider';
import { sumBy, uniqBy } from 'lodash';
import TotalAccounts from "./TotalAccounts"
import Upgrades from "./Upgrades"

const SectionAdminPanelSumo = () => {
	const [isBusy, setIsBusy] = useState(false);
	const [accountItems, setAccountItems] = useState<UserAttributes[]>([]);
	const [activeUser, setActiveUser] = useState<UserAttributes>();
	const [nextToken, setNextToken] = useState<string>();
	const [isModalActive, setIsModalActive] = useState(false);

	const [date, setDate] = useState<string>('');
	const [isDatePickerModalActive, setIsDatePickerModalActive] = useState(false);
	const [usageItems, setUsageItems] = useState<UsageModel[]>();
	const [isUsageLoading, setIsUsageLoading] = useState(false);

	// credits and usage
	const [totalCredits, setTotalCredits] = useState<number>(0);
	const [totalUsage, setTotalUsage] = useState<number>(0);
	const [totalSearches, setTotalSearches] = useState<number>(0);

	const { user } = useAuthContext();
	const { getGroupSettings, getGroupUsage } = useSettingsContext();

	const groupname = user?.attributes['custom:group_name'];

	const getCombinedUsage = async (items: UserAttributes[]) => {
		let credits = 0;
		let usage = 0;
		let searches = 0;

		let promises: any = [];
		items.forEach((item) => {
			promises.push(getGroupUsage(item.name));
		});

		const results = await Promise.all(promises);
		results.forEach((result: AccountInfo) => {
			credits += result?.totalCredits || 0;
			usage += result?.totalUsage || 0;
			searches += result?.totalSearches || 0;
		});

		setTotalCredits(credits);
		setTotalUsage(usage);
		setTotalSearches(searches);
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

	const onNew = () => {
		setActiveUser(undefined);
		setIsModalActive(true);
	};

	const onCancel = () => {
		setActiveUser(undefined);
		setIsModalActive(false);
	};

	const onEdit = (username: string) => {
		try {
			const index = accountItems.findIndex((user) => user.sub === username);
			if (index !== -1) {
				setActiveUser(accountItems[index]);
				setIsModalActive(true);
			}
		} catch (err) {
			//
		}
	};

	const onCreate = (user: UserAttributes) => {
		setAccountItems([user, ...accountItems]);
		setIsModalActive(false);
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
		setIsModalActive(false);
		setActiveUser(undefined);
	};

	const onDelete = async (username: string) => {

		try {
			if (confirm('Are you sure?')) {
				const index = accountItems.findIndex((user) => user.sub === username);
				if (index !== -1) {
					const newUsers = [...accountItems];
					newUsers.splice(index, 1);
					setAccountItems(newUsers);
				}
				const options = await getInput({ username });
				await API.post('AdminQueries', '/disableUser', options);
				await API.post('AdminQueries', '/deleteUser', options);
			}
		} catch (err) {
			console.log('Error loading users', err);
		}
	};

	const onOwnersLoad = (users: CognitoUserData[], token?: string) => {

		const newUsers: UserAttributes[] = users.map((data) => parseCognitoUser(data));
		console.log('newUsers - ', newUsers);
		let newUsersFiltered = newUsers.filter((userA,i,arrUser)=>{return userA['custom:temp_code']?.includes('sumo') || false;})
		const newItems = [...newUsersFiltered, ...accountItems];
		setAccountItems(newItems);
		setNextToken(token);
		if (!token) {
			//getCombinedUsage(newItems);
		}
	};

	const onDateSelect = () => setIsDatePickerModalActive(true);

	const onDateSubmit = async (date: string) => {
		if (!date) {
			return;
		}
		setDate(date);
		setIsDatePickerModalActive(false);
		setIsUsageLoading(true);

		let items: UsageModel[] = [];
		let promises: any = [];

		accountItems.forEach((item) => {
			promises.push(getUsage(item.name, date));
		});
		const results = await Promise.all(promises);
		results.forEach((resultItems: UsageModel[]) => {
			items = items.concat(resultItems);
		});

		setUsageItems(items);
		setIsUsageLoading(false);
	};

	const onDateCancel = () => setIsDatePickerModalActive(false);
	/*
	const totalUsers = accountItems.length;
	const searches = usageItems !== undefined ? uniqBy(usageItems, 'filterId').length : totalSearches;
	const creditsUsed = usageItems !== undefined ? sumBy(usageItems, 'credits') : totalUsage;
	const creditsLeft = totalCredits - totalUsage;
	*/
	return (

		<>
			<UsersLoaderSumo
				onLoad={onOwnersLoad}
				isBusy={isBusy}
				onBusy={setIsBusy}
				groupname="Owners"
				nextToken={nextToken}
			/>


			<AccountItems items={accountItems} isBusy={isBusy} onNew={onNew} onEdit={onEdit} onDelete={onDelete} />
			<Modal isActive={isModalActive} onCancel={onCancel}>
				<AccountForm onCreate={onCreate} onUpdate={onUpdate} onCancel={onCancel} isOwner={true} />
			</Modal>
			<DatePicker
				value={date}
				isActive={isDatePickerModalActive}
				onSubmit={onDateSubmit}
				onCancel={onDateCancel}
			/>
		</>
	);
};

export default SectionAdminPanelSumo;

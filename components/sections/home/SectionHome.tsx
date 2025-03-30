import { useEffect, useState } from 'react';
import {
	ActionAddToList,
	ActionExport,
	ActionSelect,
	ActionUnlock,
	Contact,
	EmailAccountModel,
	FilterModel,
	List,
	RampedUpFilter,
	SelectOption,
	SortData,
	UserAttributes,
} from '../../../types';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useSettingsContext } from '../../../providers/settings-provider';
import Modal from '../../modals/Modal';
import DomainSearch from '../../DomainSearch';
import ContactItems from '../../ContactItems';
import TrialNotice from '../../TrialNotice';
import CustomizeForm from '../../CustomizeForm';
import ExportContacts from '../../ExportContacts';
import AddToList from '../../AddToList';
import QueryLoader from '../../QueryLoader';
import { listContactsByGroupId, listEmailAccountsByUserId, listLists } from '../../../src/graphql/queries';
import { genericErrorMessage, ITEMS_PER_PAGE } from '../../../consts';
import { paginate } from '../../Pagination';
import { downloadContacts, getExportLabels, getExportData } from '../../../utils/contact-utilsx';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import { createFilter } from '../../../src/graphql/mutations';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import API from '@aws-amplify/api';
import UnlockContacts from '../../UnlockContacts';
import Auth from '@aws-amplify/auth';
import Loader from '../../Loader';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import Message from '../../Message';
import { v4 } from 'uuid';
import { getSortedData } from '../../../utils/helper-utils';

const SectionHome = () => {
	const [contactItems, setContactItems] = useState<Contact[]>();
	const [isContactsLoading, setIsContactsLoading] = useState(false);
	const [activeContacts, setActiveContacts] = useState<Contact[]>([]);
	const [activeContactsPage, setActiveContactsPage] = useState(0);
	const [contactsPerPage, setContactsPerPage] = useState(ITEMS_PER_PAGE);

	const [isCustomizeModalActive, setIsCustomizeModalActive] = useState(false);

	const [listItems, setListItems] = useState<List[]>([]);
	const [isListLoading, setIsListLoading] = useState(false);
	const [isAddToListModalActive, setIsAddToListModalActive] = useState(false);
	const [isExportModalActive, setIsExportModalActive] = useState(false);

	// active filter being used
	const [activeFilterModel, setActiveFilterModel] = useState<FilterModel>();
	const [activeFilter, setActiveFilter] = useState<RampedUpFilter>();

	// busy & error
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	// current api page and whether api has more pages available
	const [totalResults, setTotalResults] = useState<number>();
	const [page, setPage] = useState(1);
	const [hasNext, setHasNext] = useState(false);

	// unlock contacts modal
	const [isUnlockModalActive, setIsUnlockModalActive] = useState(false);
	const [contactsToUnlock, setContactsToUnlock] = useState<Contact[]>([]);

	// user context
	const { user, groups } = useAuthContext();

	// settings context
	const { settings, canUpgrade, initSettings } = useSettingsContext();

	// current user groupname - username of group admin
	const groupname = user?.attributes['custom:group_name'];

	// current contacts form search query
	const [searchQuery, setSearchQuery] = useState('');

	// contacts ruids being unlocked
	const [ruidsBeingUnlocked, setRuidsBeingUnlocked] = useState<string[]>([]);

	// email accounts
	const [emailAccounts, setEmailAccounts] = useState<EmailAccountModel[]>([]);
	const [isEmailAccountsLoading, setIsEmailAccountsLoading] = useState(true);

	useEffect(() => {
		if (!error) {
			return;
		}
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [error]);

	const onCustomize = () => setIsCustomizeModalActive(true);

	const onCustomizeCancel = () => setIsCustomizeModalActive(false);

	const onCustomizeSubmit = async () => {
		if (groupname) {
			await initSettings(groupname);
		}
		setIsCustomizeModalActive(false);
	};

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

	const saveFilter = async (newFilter: RampedUpFilter) => {
		const input = {
			userId: user?.attributes.sub,
			tenants: [groupname],
			rampedUpFilter: JSON.stringify(newFilter),
		};
		let response: any;
		try {
			response = await API.graphql(graphqlOperation(createFilter, { input }));
			console.log('save response', response);
			return response.data['createFilter'];
		} catch (err) {
			console.log(`Error in ${'createFilter'} - ${JSON.stringify(err, null, 2)}`);
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
		}
	};

	const onUnlock = (type: ActionUnlock, targetIds: string[] = []) => {
		let items: Contact[] = [];
		if (type === ActionUnlock.All) {
			items = [...(contactItems || [])];
		}
		if (type === ActionUnlock.CurrentPage) {
			items = (contactItems || []).filter((item) => targetIds.includes(item.id));
		}
		if (type === ActionUnlock.Selected) {
			items = (contactItems || []).filter((item) => item.isSelected);
		}
		setContactsToUnlock(items);
		setIsUnlockModalActive(true);
	};

	const onUnlockOne = (contact: Contact) => {
		setContactsToUnlock([contact]);
		setIsUnlockModalActive(true);
	};

	const onUnlockCancel = () => setIsUnlockModalActive(false);

	const onSelect = (ruid: string, isChecked: boolean) => {
		let items = [...(contactItems || [])];
		const index = items.findIndex((item) => item.ruid === ruid);
		if (index === -1) {
			return;
		}
		items[index].isSelected = isChecked;
		setContactItems(items);
	};

	const onDownload = (contact: Contact) => downloadContacts([getExportLabels(), getExportData(contact)]);

	const searchContacts = async (filter: RampedUpFilter, model?: FilterModel, itemsPerPage?: number) => {
		let response;
		const randomId = 'random-' + v4();
		const options = await getInput({
			...filter,
			groupId: groupname,
			userId: user?.attributes.sub,
			filterId: model?.id || randomId,
			pageSize: itemsPerPage || contactsPerPage,
		});

		// fetch results server
		try {
			response = await API.post('nymblrRestApi', '/api/contacts', options);
		} catch (err) {
			setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
			return;
		}

		// something went wrong searching contacts
		if (!response) {
			setError(new Error(genericErrorMessage));
			return;
		}

		// next page
		if (response?.page !== undefined) {
			setPage(response.page);
		}

		// has next
		setHasNext(response?.totalCount >= response?.page);

		// update total number of available results
		setTotalResults(response?.totalCount);

		// update current page
		if (response?.totalCount >= response?.page) {
			setPage(page + 1);
		}

		// update results
		let newContacts: Contact[] = [];
		if (response?.page > 1) {
			newContacts = [...(contactItems || []), ...(response?.contacts || [])];
		} else {
			newContacts = response?.contacts || [];
		}

		// set contact items
		setContactItems(newContacts);

		// return fetched results
		return newContacts;
	};

	const onFilterSubmit = async (domain?: string) => {
		setIsBusy(true);

		// first we clone the previous filter
		let newFilter = { ...activeFilter };
		// then we add the domain if provided
		if (domain) {
			newFilter = { ...newFilter, ...{ urls: [{ value: domain, label: domain }] } };
		}
		// then we use the current search query from store
		if (searchQuery) {
			newFilter = { ...newFilter, ...{ keywords: [{ value: searchQuery, label: searchQuery }] } };
		}

		// create a new model and store search history
		// const model = await saveFilter(newFilter);
		// if (!model?.id) {
		// 	setIsBusy(false);
		// 	return;
		// }

		// reset all related state variables
		setIsBusy(true);
		setIsContactsLoading(true);
		setError(undefined);
		setPage(1);
		setContactItems(undefined);
		setActiveContacts([]);
		setActiveContactsPage(0);

		// update active filter
		setActiveFilter(newFilter);
		// setActiveFilterModel(model);

		// search contacts - this will also set the new contacts
		await searchContacts(newFilter);

		// clear busy states
		setIsContactsLoading(false);
		setIsBusy(false);
	};

	const onLoadMore = async () => {
		// next page is not available or filter is not set
		if (!hasNext || !activeFilter) {
			return [];
		}

		// fetch contacts from server
		// setIsBusy(true);
		setIsContactsLoading(true);
		setError(undefined);
		const newContacts = await searchContacts({ ...activeFilter, page: page + 1 }, activeFilterModel);
		// setIsBusy(false);
		setIsContactsLoading(false);
		return newContacts || [];
	};

	const onExport = (type: ActionExport, targetIds: string[] = [], sortMap?: SortData[]) => {
		let items = [...(contactItems || [])];
		if (sortMap) {
			items = getSortedData(items, sortMap);
		}
		if (type === ActionExport.All) {
			setActiveContacts(items);
		}
		if (type === ActionExport.Selected) {
			setActiveContacts(items.filter((item) => item.isSelected));
		}
		if (type === ActionExport.CurrentPage) {
			setActiveContacts(items.filter((item) => targetIds.includes(item.id)));
		}
		setIsExportModalActive(true);
	};

	const onSelectMany = (type: ActionSelect, targetIds: string[] = []) => {
		let items = [...(contactItems || [])];
		if (type === ActionSelect.SelectAll) {
			items = items.map((item) => {
				item.isSelected = true;
				return item;
			});
		}
		if (type === ActionSelect.SelectCurrentPage) {
			items = items.map((item) => {
				if (targetIds.includes(item.id)) {
					item.isSelected = true;
				}
				return item;
			});
		}
		if (type === ActionSelect.ToggleCurrentPage) {
			const targetItems = items.filter((item) => targetIds.includes(item.id));
			const selectedItems = targetItems.filter((item) => item.isSelected === true);
			const isSelected = targetItems.length === selectedItems.length;
			items = items.map((item) => {
				if (targetIds.includes(item.id)) {
					item.isSelected = isSelected ? false : true;
				}
				return item;
			});
		}
		setContactItems(items);
	};

	const onExportSubmit = () => setIsExportModalActive(false);

	const onExportCancel = () => setIsExportModalActive(false);

	const onAdd = (contact: Contact) => {
		setActiveContacts([contact]);
		setIsAddToListModalActive(true);
	};

	const onAddToList = (type: ActionAddToList, targetIds: string[] = []) => {
		const items = [...(contactItems || [])];
		if (type === ActionAddToList.All) {
			setActiveContacts([...items]);
		}
		if (type === ActionAddToList.Selected) {
			setActiveContacts(items.filter((item) => item.isSelected));
		}
		if (type === ActionAddToList.CurrentPage) {
			setActiveContacts(items.filter((item) => targetIds.includes(item.id)));
		}
		setIsAddToListModalActive(true);
	};

	const onAddToListCancel = () => setIsAddToListModalActive(false);

	const onAddToListSubmit = () => setIsAddToListModalActive(false);

	const onContactPageChange = async (activePage: number, itemsPerPage: number) => {
		setActiveContactsPage(activePage);
		if (itemsPerPage && itemsPerPage !== contactsPerPage) {
			setContactsPerPage(itemsPerPage);
			if (activeFilter) {
				setIsBusy(true);
				try {
					await searchContacts(activeFilter, activeFilterModel, itemsPerPage);
				} catch (err) {
					//
				}
				setIsBusy(false);
			}
		}
	};

	const onUnlockSuccess = (fullContacts: Contact[]) => {
		let contacts = [...(contactItems || [])];
		for (let i = 0; i < fullContacts.length; i++) {
			const index = contacts.findIndex((item) => item.ruid && item.ruid === fullContacts[i].ruid);
			if (index === -1) {
				continue;
			}
			contacts[index] = { ...fullContacts[i], isSelected: contacts[index].isSelected };
		}
		setContactItems(contacts);
		setRuidsBeingUnlocked([]);
	};

	const onSearchQuerySubmit = (newQuery: string) => {
		onFilterSubmit(undefined);
	};

	const onUnlockStart = (ruids: string[]) => {
		setRuidsBeingUnlocked(ruids);
		setIsUnlockModalActive(false);
	};

	const onUnlockError = (ruids: string[]) => {
		setRuidsBeingUnlocked([]);
		setIsUnlockModalActive(false);
	};

	return (
		<>
			{/* trial notice */}
			<TrialNotice onCustomize={onCustomize} />

			{/* white space */}
			<div className="my-5"></div>

			{/* domain search form */}
			<DomainSearch onSubmit={onFilterSubmit} />

			{/* error notification */}
			<CardAnimatePresence isActive={error !== undefined}>
				<div className="pb-5">
					<Message className="has-text-centered" color="is-danger">
						{error?.message}
					</Message>
				</div>
			</CardAnimatePresence>

			{/* contact items list */}
			<div className="is-relative is-contacts-area">
				<ContactItems
					items={contactItems || []}
					emailAccounts={emailAccounts || []}
					ruidsBeingUnlocked={ruidsBeingUnlocked}
					isTrialAccount={false}
					setIsUpgradeModalActive={() => {}}
					itemsPerPage={contactsPerPage}
					isLocked={true}
					isBusy={isContactsLoading}
					onUnlock={onUnlock}
					onUnlockOne={onUnlockOne}
					onAdd={onAdd}
					onSelect={onSelect}
					onSelectMany={onSelectMany}
					onDownload={onDownload}
					onExport={onExport}
					onAddToList={onAddToList}
					onPageChange={onContactPageChange}
					onLoadMore={onLoadMore}
					hasNext={hasNext}
					totalResults={totalResults}
					onSearchQueryChange={setSearchQuery}
					onSearchQuerySubmit={onSearchQuerySubmit}
					onSuccess={onUnlockSuccess}
				/>
				{/* <CardAnimatePresence isActive={isContactsLoading && !isBusy}>
					<div className="is-overlay is-flex is-align-items-center is-justify-content-center has-background-white" style={{ opacity: 0.75 }}>
						<Loader />
					</div>
				</CardAnimatePresence> */}
			</div>

			{/* add contacts to list */}
			<AddToList
				isBusy={isListLoading}
				listItems={listItems}
				contactItems={activeContacts}
				isActive={isAddToListModalActive}
				onCancel={onAddToListCancel}
				onSubmit={onAddToListSubmit}
			/>

			{/* customize form */}
			{groupname && settings ? (
				<Modal isActive={isCustomizeModalActive} onCancel={onCustomizeCancel}>
					<CustomizeForm groupName={groupname} settings={settings} onSubmit={onCustomizeSubmit} onCancel={onCustomizeCancel} />
				</Modal>
			) : null}

			{/* export contacts */}
			<ExportContacts contacts={activeContacts} isActive={isExportModalActive} onSubmit={onExportSubmit} onCancel={onExportCancel} />

			{/* load lists of current group */}
			<QueryLoader
				onLoad={setListItems}
				query={listLists}
				rootKey="listLists"
				dataKey="items"
				isBusy={isListLoading}
				onBusyToggle={setIsListLoading}
				options={{ sortDirection: 'DESC' }}
				limit={999}
				isLoadAll
			/>

			{/* load contacts of current group */}
			{groupname ? (
				<QueryLoader
					onLoad={setContactItems}
					query={listContactsByGroupId}
					rootKey="listContactsByGroupId"
					dataKey="items"
					isLoadAll={true}
					isBusy={isContactsLoading}
					onBusyToggle={setIsContactsLoading}
					options={{ groupId: groupname, limit: 100 }}
				/>
			) : null}

			{/* load connected email accounts */}
			<QueryLoader
				onLoad={setEmailAccounts}
				query={listEmailAccountsByUserId}
				rootKey="listEmailAccountsByUserId"
				dataKey="items"
				onBusyToggle={setIsEmailAccountsLoading}
				options={{ userId: user?.attributes.sub }}
			/>

			{/* unlock contacts modal */}
			<UnlockContacts
				contacts={contactsToUnlock}
				isActive={isUnlockModalActive}
				onCancel={onUnlockCancel}
				onSuccess={onUnlockSuccess}
				onStart={onUnlockStart}
				onError={onUnlockError}
			/>
		</>
	);
};

export default SectionHome;

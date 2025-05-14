import { isEmpty, values } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import { genericErrorMessage, ITEMS_PER_PAGE } from '../../../consts';
import {
	ActionAddToList,
	ActionExport,
	ActionSelect,
	ActionUnlock,
	FilterModel,
	IBytemineCollection,
	IBytemineContact,
	IBytemineFilter,
	IExportContactState,
	SelectOption,
	SortData,
} from '../../../types';
import { applyContactFilters, downloadContacts, getExportData, getExportLabels } from '../../../utils/contact-utilsx';
import { callApi, formatNumberShort, getFilterLabel, getSortedData } from '../../../utils/helper-utils';
import Breadcrumb from '../../Breadcrumb';
import Filter from '../../filter/Filter';
import ErrorNotificaition from '../../notifications/ErrorNotification';
import TableSkeleton from '../../table-skeleton';
import ProspectAddToCollection from './ProspectAddToCollection';
import ProspectContactItems from './ProspectContactItems';
import ProspectExportContacts from './ProspectExportContacts';
import ProspectSearches from './ProspectSearches';
import ProspectSearchHistory from './ProspectSearchHistory';
import ProspectUnlockContacts from './ProspectUnlockContacts';
import ExportContacts from '../../ExportContacts';
import FormButtonNew from '../../form/FormButtonNew';
import IconNewExport from '../../icons/IconNewExport';
import IconNewCheck from '../../icons/IconNewCheck';

const exportContactInitState = {
	type: ActionExport.Selected,
	targetIds: [],
	startExporting: false,
};

const SectionProspects = ({
	isContactsOnly = false,
	isCollectionMode = false,
	collectionId,
}: {
	isContactsOnly?: boolean;
	isCollectionMode?: boolean;
	collectionId?: string;
}) => {
	// -------------------------------------------------------------------------
	// mounted status - used to prevent double api calls during mount
	// -------------------------------------------------------------------------

	const isMounted = useRef(false);

	// -------------------------------------------------------------------------
	// busy and error status
	// -------------------------------------------------------------------------
	const [isBusy, setIsBusy] = useState(false);
	const [isNotFound, setIsNotFound] = useState<boolean>();
	const [error, setError] = useState<Error>();

	// -------------------------------------------------------------------------
	// current api page and whether api has more pages available
	// -------------------------------------------------------------------------
	const [totalResults, setTotalResults] = useState<number>();
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(0);
	const [hasNext, setHasNext] = useState(false);
	const [hasPrev, setHasPrev] = useState(false);

	// -------------------------------------------------------------------------
	// contacts
	// -------------------------------------------------------------------------
	const [isContactsLoading, setIsContactsLoading] = useState(false);
	const [contactItems, setContactItems] = useState<IBytemineContact[]>();
	const [activeContacts, setActiveContacts] = useState<IBytemineContact[]>([]);
	const [activeContactsPage, setActiveContactsPage] = useState(0);
	const [contactsPerPage, setContactsPerPage] = useState(ITEMS_PER_PAGE);
	const [filteredContacts, setFilteredContacts] = useState<IBytemineContact[]>([]);

	// -------------------------------------------------------------------------
	// history
	// -------------------------------------------------------------------------
	const [isHistoryBusy, setIsHistoryBusy] = useState(false);
	const [historyItems, setHistoryItems] = useState<FilterModel[]>([]);
	const [savedHistoryItems, setSavedHistoryItems] = useState<FilterModel[]>([]);
	const [isHistoryModalActive, setIsHistoryModalActive] = useState(false);
	const [historyNextToken, setHistoryNextToken] = useState('');
	const [historyFetchMore, setHistoryFetchMore] = useState<Date>();

	// -------------------------------------------------------------------------
	// filter model
	// -------------------------------------------------------------------------
	const [activeFilterModel, setActiveFilterModel] = useState<FilterModel>();
	const [activeFilter, setActiveFilter] = useState<IBytemineFilter>();
	const [isActiveFilterLoading, setIsActiveFilterLoading] = useState(false);

	// -------------------------------------------------------------------------
	// collection items
	// -------------------------------------------------------------------------
	const [collectionItems, setCollectionItems] = useState<IBytemineCollection[]>([]);
	const [isCollectionBusy, setIsCollectionBusy] = useState(false);
	const [isAddToCollectionModalActive, setIsAddToCollectionModalActive] = useState(false);
	const [isExportModalActive, setIsExportModalActive] = useState(false);

	// -------------------------------------------------------------------------
	//upgrade modal nd-85 brf 2022-12-16
	// -------------------------------------------------------------------------
	const [isUpgradeModalActive, setIsUpgradeModalActive] = useState(false);

	// -------------------------------------------------------------------------
	// Keywords - used in search form
	// -------------------------------------------------------------------------
	const [keywords, setKeywords] = useState<SelectOption[]>([]);

	// -------------------------------------------------------------------------
	// Keywords - used in search form
	// -------------------------------------------------------------------------
	const [pidsBeingUnlocked, setPidsBeingUnlocked] = useState<string[]>([]);
	const [exportContactsNow, setExportContactsNow] = useState<IExportContactState>(exportContactInitState);

	// -------------------------------------------------------------------------
	// Unlock contacts modal
	// -------------------------------------------------------------------------

	const [isUnlockModalActive, setIsUnlockModalActive] = useState(false);
	const [contactsToUnlock, setContactsToUnlock] = useState<IBytemineContact[]>([]);

	// -------------------------------------------------------------------------
	// Router - query params
	// -------------------------------------------------------------------------
	const searchParams = useSearchParams();
	const filterId = searchParams.get('filterId');

	// -------------------------------------------------------------------------
	// Force state update
	// -------------------------------------------------------------------------
	const [lastUpdatedAt, setLastUpdatedAt] = useState(new Date());

	// -------------------------------------------------------------------------
	// Load data
	// -------------------------------------------------------------------------

	useEffect(() => {
		if (isMounted.current) {
			return;
		}
		isMounted.current = true;
		getCollections();
		getFilters();
	}, []);

	useEffect(() => {
		if (!filterId) {
			return;
		}
		getSelectedFilter(filterId);
	}, [filterId]);

	useEffect(() => {
		if (!collectionId) {
			return;
		}
		getCollectionContacts(collectionId);
	}, [collectionId]);

	// Load collections / lists
	const getCollections = async () => {
		try {
			const res = (await callApi(null, 'api/v1/collections', {})) as IBytemineCollection[];
			setCollectionItems(res);
		} catch (err) {
			console.log('getCollections - error', err);
		}
	};

	// Load collection contacts
	const getCollectionContacts = async (id: string) => {
		try {
			const res = (await callApi(null, `api/v1/collections/${id}/contacts`, {})) as IBytemineContact[];
			setContactItems(res);
			setFilteredContacts(res);
		} catch (err) {
			console.log('getCollectionContacts - error', err);
		}
	};

	// Load filters
	const getFilters = async () => {
		setIsHistoryBusy(true);
		try {
			const res = (await callApi(null, '/api/v1/filters', {})) as FilterModel[];
			// console.log('getFilters - success', res);
			setHistoryItems(res.filter((f) => f.isSaved === false));
			setSavedHistoryItems(res.filter((f) => f.isSaved === true));
		} catch (err) {
			console.log('getFilters - error', err);
		}
		setIsHistoryBusy(false);
	};

	// Load selected filter from query search param
	const getSelectedFilter = async (id: string) => {
		setIsActiveFilterLoading(true);
		try {
			const res = (await callApi(null, `api/v1/filters/${id}`, {})) as FilterModel;
			setActiveFilterModel(res);
		} catch (err) {
			console.log('getCollections - error', err);
		}
		setIsActiveFilterLoading(false);
	};

	// -------------------------------------------------------------------------
	// Search contacts - this looks up contacts via API
	// -------------------------------------------------------------------------

	const searchContacts = async (filter: IBytemineFilter, model?: FilterModel, itemsPerPage?: number) => {
		// console.log('searchContacts', { filter, model, itemsPerPage });
		// return;

		let response;
		const randomId = 'random-' + v4();

		// const options = await getInput({
		// 	...filter,
		// 	groupId: user?.attributes['custom:group_name'],
		// 	userId: user?.attributes.sub,
		// 	filterId: model?.id || randomId,
		// 	pageSize: itemsPerPage || contactsPerPage,
		// });

		// fetch results server
		try {
			// response = await API.post('nymblrRestApi', '/api/contacts/v2', options);
			response = (await callApi(null, '/api/v1/contacts/search', {
				method: 'POST',
				body: JSON.stringify({
					...filter,
					filterId: model?.id || randomId,
					pageSize: itemsPerPage || contactsPerPage,
				}),
			})) as { page: number; totalCount: number; pageSize: number; contacts: IBytemineContact[] };
		} catch (err) {
			if (err?.response.status === 402) {
				setIsUpgradeModalActive(true);
			} else {
				setError(new Error(err?.response?.data?.message || err?.message || genericErrorMessage));
			}
			return;
		}

		// something went wrong searching contacts
		if (!response) {
			setError(new Error(genericErrorMessage));
			return;
		}

		//console.log('Response page - ',response.page);
		// next page
		if (response?.page !== undefined) {
			setPage(response.page);
			// console.log('Response page - ', response.page);
		}

		// has next
		setHasNext(response?.page + 1 < Math.ceil(response?.totalCount / contactsPerPage));
		setHasPrev(response?.page - 1 >= 0);

		// update total number of available results
		setTotalResults(response?.totalCount);

		// update page size
		setPageSize(response?.pageSize);

		// update results
		let newContacts: IBytemineContact[] = [];
		if (response?.page > 0) {
			newContacts = [...(contactItems || []), ...(response?.contacts || [])];
		} else {
			newContacts = response?.contacts || [];
		}

		// set contact items
		// console.log('search before', contactItems);
		setContactItems(newContacts);
		// console.log('search after', newContacts);

		// return fetched results
		return newContacts;
	};

	const onSearchHistorySelect = (value: FilterModel) => {
		setActiveFilterModel(value);
		setIsHistoryModalActive(false);
	};

	const onSearchByKeyword = (kwd: string) => {
		const newFilter = { ...activeFilter };
		if (!newFilter.keywords) {
			newFilter.keywords = [];
		}

		const index = newFilter.keywords.findIndex((val) => val.value.toLowerCase().trim() === kwd);
		if (index === -1) {
			newFilter.keywords.push({ value: kwd, label: kwd });
		}

		if (activeFilterModel) {
			const newFilterModel = { ...activeFilterModel };
			newFilterModel.filter = JSON.stringify(newFilter) as any;
			setActiveFilterModel(newFilterModel);
		}

		setKeywords(newFilter.keywords);
		setActiveFilter(newFilter);
		onFilterSubmit(newFilter);
	};

	const onSearchHistoryCancel = () => setIsHistoryModalActive(false);

	const onClear = () => setActiveFilter(undefined);

	const onExport = (type: ActionExport, targetIds: string[] = [], sortMap?: SortData[]) => {
		let sourceContacts: IBytemineContact[] = [...(contactItems || [])];
		if (isContactsOnly) {
			sourceContacts = filteredContacts;
		}
		if (sortMap) {
			sourceContacts = getSortedData(sourceContacts, sortMap);
		}
		if (type === ActionExport.All) {
			setActiveContacts(sourceContacts);
		}
		if (type === ActionExport.Selected) {
			setActiveContacts(sourceContacts.filter((item) => item.isSelected));
		}
		if (type === ActionExport.CurrentPage) {
			setActiveContacts(sourceContacts.filter((item) => targetIds.includes(item.id)));
		}
		setIsExportModalActive(true);
	};

	const onSelectMany = (type: ActionSelect, targetIds: string[] = []): void => {
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

	const onUpgradeCancel = () => setIsUpgradeModalActive(false);

	const onAdd = (contact: IBytemineContact) => {
		setActiveContacts([contact]);
		setIsAddToCollectionModalActive(true);
	};

	const onAddToList = (type: ActionAddToList, targetIds: string[] = []) => {
		let sourceContacts: IBytemineContact[] = [...(contactItems || [])];
		if (isContactsOnly) {
			sourceContacts = filteredContacts;
		}
		if (type === ActionAddToList.All) {
			setActiveContacts([...sourceContacts]);
		}
		if (type === ActionAddToList.Selected) {
			setActiveContacts(sourceContacts.filter((item) => item.isSelected));
		}
		if (type === ActionAddToList.CurrentPage) {
			setActiveContacts(sourceContacts.filter((item) => targetIds.includes(item.id)));
		}
		setIsAddToCollectionModalActive(true);
	};

	const onAddToCollectionSubmit = () => {
		setIsAddToCollectionModalActive(false);
	};

	const onAddToCollectionCancel = () => {
		setIsAddToCollectionModalActive(false);
	};

	const onHistoryFetchMore = () => {
		setHistoryFetchMore(new Date());
	};

	const onViewHistory = () => {
		setIsHistoryModalActive(true);
	};

	const onFilterUpdate = (newFilter: IBytemineFilter) => {
		setFilteredContacts(applyContactFilters(contactItems || [], newFilter));
	};

	/**
	 * @summary
	 * This was commented
	 *
	 * @description
	 * This was meant for contacts screen - but now we have separate search
	 * button embedded in filter component itself
	 *
	 * @param value The ramped up filter raw object
	 * @param model Saved ramped up filter model object
	 */
	const onFilterSave = (value: IBytemineFilter, model?: FilterModel) => {
		if (model?.id) {
			setHistoryItems([model, ...historyItems]);
			setActiveFilterModel(model);
		}
		setActiveFilter(value);
	};

	const saveFilter = async (value: Partial<FilterModel>): Promise<FilterModel | undefined> => {
		let response: any;
		try {
			response = (await callApi(null, '/api/v1/filters', {
				method: 'POST',
				body: JSON.stringify(value),
			})) as IBytemineFilter;
			// console.log('saveFilter - success', response);
			return response;
		} catch (err) {
			console.log('saveFilter - error', err);
		}
	};

	const onFilterSubmit = async (value: IBytemineFilter, model?: FilterModel) => {
		const isFilterEmpty = values(value).every((val) => isEmpty(val) && val !== true);

		if (isFilterEmpty) {
			// console.log('Filter is empty', value);
			setContactItems(undefined);
			return;
		}

		// save search temporarily
		const payload: Partial<FilterModel> = {
			name: getFilterLabel(value),
			filter: JSON.stringify(value) as any,
			isSaved: false,
		};

		saveFilter(payload).then((newFilter) => {
			if (newFilter) {
				historyItems.push(newFilter);
			}
		});

		setIsHistoryModalActive(false);

		setIsBusy(true);
		setError(undefined);

		let items: IBytemineContact[] = [];
		setContactItems(undefined);

		// console.log('on filter submit after clear', contactItems);
		setPage(0);
		setActiveContactsPage(0);

		// update search history - add newly created filter to top of list
		if (model?.id) {
			setHistoryItems([model, ...historyItems]);
		}

		setActiveFilter(value);
		setActiveFilterModel(model);
		setContactItems(undefined);
		setContactItems([]);
		// console.log('on filter submit after clear 2', contactItems);

		const newContacts = await searchContacts(value, model);

		setIsBusy(false);
		return newContacts;
	};

	const onUnlock = (type: ActionUnlock, targetIds: string[] = []) => {
		// Final list of contacts to be unlocked
		let items: IBytemineContact[] = [];

		// Start with all contacts from state or props
		let sourceContacts: IBytemineContact[] = [...(contactItems || [])];

		// If only showing contacts from a filtered view (e.g., from a collection), override sourceContacts
		if (isContactsOnly) {
			sourceContacts = filteredContacts;
		}

		// Ensure sourceContacts is always defined
		sourceContacts = sourceContacts || [];

		// Unlock all contacts in the current source list
		if (type === ActionUnlock.All) {
			items = sourceContacts;
		}

		// Unlock only the contacts whose IDs are in the current page's targetIds
		if (type === ActionUnlock.CurrentPage) {
			items = sourceContacts.filter((item) => targetIds.includes(item.id));
		}

		// Unlock only the contacts that are currently marked as selected
		if (type === ActionUnlock.Selected) {
			items = sourceContacts.filter((item) => item.isSelected);
		}

		// Update state to pass the contacts to the unlock modal
		setContactsToUnlock(items);
		setIsUnlockModalActive(true);
	};

	const onUnlockOne = (contact: IBytemineContact) => {
		setContactsToUnlock((prevContacts) => [contact]);
		//setContactsToUnlock(prevContacts => prevContacts.concat(contact));
		setIsUnlockModalActive(true);
	};

	const onUnlockCancel = () => setIsUnlockModalActive(false);

	const onSelect = (pid: string, isChecked: boolean) => {
		let items = [...(contactItems || [])];
		const index = items.findIndex((item) => item.pid === pid);
		if (index === -1) {
			return;
		}
		items[index].isSelected = isChecked;
		setContactItems(items);
	};

	const onDownload = (contact: IBytemineContact) => downloadContacts([getExportLabels(), getExportData(contact)]);

	/**
	 * @summary
	 * This is called when active page is changed or number of items is changed
	 *
	 * @description
	 * Reset search only when items per page is changed
	 *
	 * @note
	 * Make sure to do this in home screen as well
	 *
	 * @param activePage {number} The active page
	 * @param itemsPerPage {number} The number of items per page
	 */
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

	const onUnlockSuccess = (fullContacts: IBytemineContact[], exportContacts?: boolean, selectedAction: ActionExport = ActionExport.Selected) => {
		setContactItems((prevContacts) => {
			let copiedContacts = [...(prevContacts || [])];
			for (let i = 0; i < fullContacts.length; i++) {
				const index = copiedContacts.findIndex((item) => item.pid && item.pid === fullContacts[i].pid);
				if (index === -1) {
					continue;
				}
				copiedContacts[index] = {
					...fullContacts[i],
					isSelected: copiedContacts[index].isSelected,
				};
			}
			return copiedContacts;
		});

		setFilteredContacts((prevFilteredContacts) => {
			const newFilteredContacts = [...(prevFilteredContacts || [])];
			for (let i = 0; i < fullContacts.length; i++) {
				const index = newFilteredContacts.findIndex((item) => item.pid && item.pid === fullContacts[i].pid);
				if (index === -1) {
					continue;
				}
				newFilteredContacts[index] = {
					...fullContacts[i],
					isSelected: newFilteredContacts[index].isSelected,
				};
			}
			return newFilteredContacts;
		});

		setPidsBeingUnlocked([]);

		if (exportContacts) {
			setExportContactsNow({
				startExporting: true,
				targetIds: fullContacts.map((contact) => contact.id),
				type: selectedAction,
			});
		}

		onStateUpdate();
	};

	const onLoadMore = async (activePage: number) => {
		// next page is not available or filter is not set
		if (!hasNext || !activeFilter) {
			return [];
		}

		setError(undefined);
		// console.log('onLoadMore - page exppage', page, page + 1);

		// fetch contacts from server
		setIsBusy(true);
		const newContacts = await searchContacts({ ...activeFilter, page: page + 1 }, activeFilterModel);
		setIsBusy(false);

		return newContacts || [];
	};

	const onLoadPrev = async () => {
		if (!hasPrev || !activeFilter) {
			return [];
		}

		// fetch contacts from server
		setError(undefined);
		// console.log('onLoadPrev - page exppage', page, page - 1);

		setIsBusy(true);
		/*
		let newContacts = await searchContacts(
		  { ...activeFilter, page: page - 1 },
		  activeFilterModel
		);
	
		newContacts = newContacts?.splice(
		  page * pageSize - pageSize,
		  newContacts?.length
		);*/
		setIsBusy(false);
		//return newContacts || [];

		return contactItems || [];
	};

	const onUnlockStart = (pids: string[]) => {
		setPidsBeingUnlocked(pids);
		setIsUnlockModalActive(false);
	};

	const onUnlockError = (pids: string[]) => {
		setPidsBeingUnlocked([]);
		setIsUnlockModalActive(false);
	};

	const onStateUpdate = () => setLastUpdatedAt(new Date());

	const isTrailAccount = true;

	if (isCollectionMode) {
		return (
			<>
				<div className="is-absolute is-flex is-align-items-center" style={{ top: '2.5rem', right: 0 }}>
					<FormButtonNew type="button" className="mr-5" onClick={() => onSelectMany(ActionSelect.SelectAll)}>
						<IconNewCheck width={16} />
						Select All
					</FormButtonNew>
					<FormButtonNew type="button" variant="active" onClick={() => setIsExportModalActive(true)}>
						<IconNewExport width={16} />
						<span>Export</span>
					</FormButtonNew>
				</div>

				<ProspectContactItems
					items={contactItems || []}
					emailAccounts={[]}
					pidsBeingUnlocked={pidsBeingUnlocked}
					itemsPerPage={contactsPerPage}
					isLocked={true}
					isBusy={isContactsLoading}
					lastUpdatedAt={lastUpdatedAt.toISOString()}
					onUnlock={onUnlock}
					onUnlockOne={onUnlockOne}
					onAdd={onAdd}
					onSelect={onSelect}
					onSelectMany={onSelectMany}
					onDownload={onDownload}
					onExport={onExport}
					onAddToList={onAddToList}
					onPageChange={onContactPageChange}
					isTrialAccount={isTrailAccount}
					setIsUpgradeModalActive={setIsUpgradeModalActive}
					onSuccess={onUnlockSuccess}
					isContactsOnly
					isCollectionMode
				/>

				{/* The add to list modal */}
				<ProspectAddToCollection
					isBusy={isCollectionBusy}
					listItems={collectionItems}
					contactItems={activeContacts}
					isActive={isAddToCollectionModalActive}
					onSubmit={onAddToCollectionSubmit}
					onCancel={onAddToCollectionCancel}
				/>

				{/* Export contacts */}
				<ExportContacts
					contacts={contactItems?.filter((c) => c.pid && c.isSelected) || []}
					isActive={isExportModalActive}
					onSubmit={onExportSubmit}
					onCancel={onExportCancel}
				/>
			</>
		);
	}

	return (
		<>
			<Breadcrumb title={`Result-${formatNumberShort(totalResults || 0)}`} items={[{ label: 'Prospect Finder', href: '/prospect-finder', isCurrent: true }]} />

			<div className="is-flex is-fullwidth">
				<Filter
					isContactsOnly={isContactsOnly}
					hasHistory={!isContactsOnly}
					onSubmit={isContactsOnly ? onFilterSave : onFilterSubmit}
					onViewHistory={onViewHistory}
					activeFilter={activeFilterModel}
					onClear={onClear}
					// saveLabel={isContactsOnly ? 'Save Search' : 'Save'}
					contacts={contactItems}
					kwds={keywords}
					onFilterUpdate={isContactsOnly ? onFilterUpdate : undefined}
				/>

				<div className="ml-5" style={{ flex: 1 }}>
					{/* error message */}
					<ErrorNotificaition error={error} className="pb-6 has-text-centered" />

					{isContactsOnly ? <></> : null}

					{isContactsOnly ? (
						<>
							<div className={isTrailAccount ? 'is-relative is-contacts-area trialsize' : 'is-relative is-contacts-area'}>
								<ProspectContactItems
									items={filteredContacts || []}
									emailAccounts={[]}
									pidsBeingUnlocked={pidsBeingUnlocked}
									itemsPerPage={contactsPerPage}
									isLocked={true}
									isBusy={isContactsLoading}
									lastUpdatedAt={lastUpdatedAt.toISOString()}
									onUnlock={onUnlock}
									onUnlockOne={onUnlockOne}
									onAdd={onAdd}
									onSelect={onSelect}
									onSelectMany={onSelectMany}
									onDownload={onDownload}
									onExport={onExport}
									onAddToList={onAddToList}
									onPageChange={onContactPageChange}
									isTrialAccount={isTrailAccount}
									setIsUpgradeModalActive={setIsUpgradeModalActive}
									onSuccess={onUnlockSuccess}
									isContactsOnly
								/>
							</div>
						</>
					) : (
						<>
							{isBusy && contactItems === undefined && <TableSkeleton rows={22} />}

							{/* {contactItems === undefined && !isBusy ? (
								<ProspectSearch
									searches={historyItems}
									savedSearches={savedHistoryItems}
									onClick={onSearchHistorySelect}
									isBusy={isHistoryBusy}
									limit={10}
								/>
							) : null} */}

							{contactItems !== undefined ? (
								<div className={isTrailAccount ? 'is-relative is-contacts-area trialsize' : 'is-relative is-contacts-area'}>
									<ProspectContactItems
										items={contactItems || []}
										emailAccounts={[]}
										pidsBeingUnlocked={pidsBeingUnlocked}
										itemsPerPage={contactsPerPage}
										isLocked={true}
										lastUpdatedAt={lastUpdatedAt.toISOString()}
										isBusy={isBusy}
										onUnlock={onUnlock}
										onUnlockOne={onUnlockOne}
										onAdd={onAdd}
										onSelect={onSelect}
										onSelectMany={onSelectMany}
										onDownload={onDownload}
										onExport={onExport}
										onLoadPrev={onLoadPrev}
										onAddToList={onAddToList}
										onPageChange={onContactPageChange}
										isTrialAccount={isTrailAccount}
										setIsUpgradeModalActive={setIsUpgradeModalActive}
										hasNext={hasNext}
										onLoadMore={onLoadMore}
										totalResults={totalResults}
										onSuccess={onUnlockSuccess}
										isContactsOnly={false}
									/>
									{/* {isBusy && <TableSkeleton />} */}
									{/* <CardAnimatePresence isActive={isBusy}>
											<LoaderFullscreen opacity={0} />
										</CardAnimatePresence> */}
								</div>
							) : null}
						</>
					)}

					{contactItems === undefined && !isBusy && !collectionId ? (
						<ProspectSearches
							searches={historyItems}
							savedSearches={savedHistoryItems}
							onClick={onSearchHistorySelect}
							onSearchByKeyword={onSearchByKeyword}
							isBusy={isHistoryBusy}
							limit={10}
						/>
					) : null}
				</div>
			</div>

			<ProspectUnlockContacts
				contacts={contactsToUnlock}
				isActive={isUnlockModalActive}
				onCancel={onUnlockCancel}
				onSuccess={onUnlockSuccess}
				onStart={onUnlockStart}
				onError={onUnlockError}
			/>

			{/* export contacts */}
			<ProspectExportContacts contacts={activeContacts} isActive={isExportModalActive} onSubmit={onExportSubmit} onCancel={onExportCancel} />

			{/* filter / search history modal */}
			<ProspectSearchHistory
				isBusy={isHistoryBusy}
				searchItems={savedHistoryItems}
				isActive={isHistoryModalActive}
				onCancel={onSearchHistoryCancel}
				onClick={onSearchHistorySelect}
				nextToken={historyNextToken}
				onFetchMore={onHistoryFetchMore}
			/>

			{/* The add to list modal */}
			<ProspectAddToCollection
				isBusy={isCollectionBusy}
				listItems={collectionItems}
				contactItems={activeContacts}
				isActive={isAddToCollectionModalActive}
				onSubmit={onAddToCollectionSubmit}
				onCancel={onAddToCollectionCancel}
			/>
		</>
	);
};

export default SectionProspects;

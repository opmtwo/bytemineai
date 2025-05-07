import { isEmpty, values } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import { genericErrorMessage, ITEMS_PER_PAGE } from '../../../consts';
import { ActionAddToList, ActionExport, ActionSelect, FilterModel, IBytemineCollection, IBytemineContact, IBytemineFilter, SortData } from '../../../types';
import { applyContactFilters } from '../../../utils/contact-utilsx';
import { callApi, getFilterLabel, getSortedData } from '../../../utils/helper-utils';
import Filter from '../../filter/Filter';
import ProspectAddToCollection from './ProspectAddToCollection';
import ProspectExportContacts from './ProspectExportContacts';
import ProspectSearches from './ProspectSearches';
import ProspectSearchHistory from './ProspectSearchHistory';

const SectionProspects = ({ isContactsOnly = false, listId }: { isContactsOnly?: boolean; listId?: string }) => {
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
	// Router - query params
	// -------------------------------------------------------------------------
	const searchParams = useSearchParams();
	const filterId = searchParams.get('filterId');

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

	// Load collections / lists
	const getCollections = async () => {
		try {
			const res = (await callApi(null, '/api/v1/collections', {})) as IBytemineCollection[];
			setCollectionItems(res);
		} catch (err) {
			console.log('getCollections - error', err);
		}
	};

	// Load filters
	const getFilters = async () => {
		setIsHistoryBusy(true);
		try {
			const res = (await callApi(null, '/api/v1/filters', {})) as FilterModel[];
			console.log('getFilters - success', res);
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
			const res = (await callApi(null, `/api/v1/filters/${id}`, {})) as FilterModel;
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
		console.log('searchContacts', { filter, model, itemsPerPage });
		return;

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
			console.log('Response page - ', response.page);
		}

		// has next
		setHasNext(response?.page + 1 <= Math.ceil(response?.totalCount / contactsPerPage));
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
		console.log('search before', contactItems);
		setContactItems(newContacts);
		console.log('search after', newContacts);

		// return fetched results
		return newContacts;
	};

	const onSearchHistorySelect = (value: FilterModel) => {
		setActiveFilterModel(value);
		setIsHistoryModalActive(false);
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

	const saveFilter = async (value: FilterModel) => {
		let response: any;
		// try {
		// 	response = await API.graphql(graphqlOperation(createFilter, { input: value }));
		// } catch (err) {
		// 	console.log('Error in saveFilter - ', err);
		// }
	};

	const onFilterSubmit = async (value: IBytemineFilter, model?: FilterModel) => {
		const isFilterEmpty = values(value).every((val) => isEmpty(val) && val !== true);

		if (isFilterEmpty) {
			console.log('Filter is empty', value);
			setContactItems(undefined);
			return;
		}

		// // save search temporarily
		// const newFilterModel: FilterModel = {
		// 	id: v4(),
		// 	tenants: [user?.attributes['custom:group_name'] || ''],
		// 	userId: user?.attributes.sub || '',
		// 	groupId: user?.attributes['custom:group_name'] || '',
		// 	name: getFilterLabel(value),
		// 	rampedUpFilter: JSON.stringify(value) as any,
		// 	savedFilter: false,
		// 	createdAt: new Date().toISOString(),
		// 	updatedAt: new Date().toISOString(),
		// };

		// saveFilter(newFilterModel);
		// historyItems.push(newFilterModel);

		setIsHistoryModalActive(false);

		setIsBusy(true);
		setError(undefined);

		let items: IBytemineContact[] = [];
		setContactItems(undefined);

		console.log('on filter submit after clear', contactItems);
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
		console.log('on filter submit after clear 2', contactItems);
		const newContacts = await searchContacts(value, model);

		setIsBusy(false);
		return newContacts;
	};

	return (
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
				onFilterUpdate={isContactsOnly ? onFilterUpdate : undefined}
			/>

			<div className="" style={{ flex: 1 }}>
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

				<ProspectSearches searches={historyItems} savedSearches={savedHistoryItems} onClick={onSearchHistorySelect} isBusy={isHistoryBusy} limit={10} />
			</div>
		</div>
	);
};

export default SectionProspects;

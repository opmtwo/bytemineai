import { useState } from 'react';

import { ActionAddToList, ActionExport, ActionSelect, FilterModel, IBytemineCollection, IBytemineContact, SortData } from '../../../types';
import ProspectAddToCollection from './ProspectAddToCollection';
import ProspectSearches from './ProspectSearches';
import { getSortedData } from '../../../utils/helper-utils';
import { ITEMS_PER_PAGE } from '../../../consts';
import ProspectSearchHistory from './ProspectSearchHistory';
import ProspectExportContacts from './ProspectExportContacts';

const SectionProspects = ({ isContactsOnly = false, listId }: { isContactsOnly?: boolean; listId?: string }) => {
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
	const [activeFilter, setActiveFilter] = useState<FilterModel>();
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

	return (
		<>
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
		</>
	);
};

export default SectionProspects;

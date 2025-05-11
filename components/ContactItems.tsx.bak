import { FormEvent, useEffect, useState } from 'react';
import { ITEMS_PER_PAGE, keysToExport, keysToExportMap } from '../consts';
import { ActionAddToList, ActionExport, ActionList, ActionSelect, ActionUnlock, Contact, EmailAccountModel, SortData, SortOrder } from '../types';
import { searchContactItems } from '../utils/contact-utilsx';
import Card from './cards/Card';
import CardAnimatePresence from './cards/CardAnimatePresence';
import ContactActions from './ContactActions';
import ContactEntry from './ContactEntry';
import ContactUnlock from './ContactUnlock';
import EmptyMsg from './EmptyMsg';
import FormInput from './form/FormInput';
import FormCheckbox from './form/FormCheckbox';
import IconSearch from './icons/IconSearch';
import IconRocket from './icons/IconRocket';
import IconDownload from "./icons/IconDownload";
import Loader from './Loader';
import Pagination, { paginate } from './Pagination';
import Slot from './Slot';
import ViewToggle from './ViewToggle';
import ListView from './ListView';
import { useAuthContext } from '../providers/auth-data-provider';
import { decodeJson, getSortedData } from '../utils/helper-utils';
import ContactDropdown from './ContactDropdown';
import ListActionButton from './ui/contacts/ListActionButton';
import ExportActionButton from './ui/contacts/ExportActionButton';
import TableSkeleton from './table-skeleton';
import FormButton from "./form/FormButton";
import styles from "./sections/audience-builder/audience-builder-helper.module.css"

const ContactItems = ({
	items = [],
	emailAccounts = [],
	ruidsBeingUnlocked = [],
	itemsPerPage = ITEMS_PER_PAGE,
	isLocked,
	isBusy,
	hasNext,
	onUnlock,
	onUnlockOne,
	onAdd,
	onSelect,
	onDownload,
	onAddToList,
	onExport,
	onSelectMany,
	onPageChange,
	isTrialAccount,
	setIsUpgradeModalActive,
	onLoadMore,
	onLoadPrev,
	onSearchQueryChange,
	onSearchQuerySubmit,
	totalResults,
	onSuccess,
	isAudienceBuilder = false,
	isContactsOnly = false,
	showSampleExportModal,
	showExportModal
}: {
	items: Contact[];
	emailAccounts: EmailAccountModel[];
	ruidsBeingUnlocked: string[];
	itemsPerPage: number;
	isLocked: boolean;
	isBusy: boolean;
	hasNext?: boolean;
	totalResults?: number;
	onAdd: (contact: Contact) => void;
	onSelect: (id: string, isChecked: boolean) => void;
	onDownload: (contact: Contact) => void;
	onAddToList: (type: ActionAddToList, targetIds: string[]) => void;
	onExport: (type: ActionExport, targetIds: string[], sortMap?: SortData[]) => void;
	onSelectMany: (type: ActionSelect, targetIds: string[]) => void;
	onUnlock: (type: ActionUnlock, targetIds: string[]) => void;
	onUnlockOne: (contact: Contact) => void;
	onPageChange?: (activePage: number, itemsPerPage: number) => void;
	isTrialAccount?: boolean;
	setIsUpgradeModalActive: (value: boolean) => void;
	onSearchQueryChange?: (query: string) => void;
	onSearchQuerySubmit?: (query: string) => void;
	onLoadMore?: (activePage:number) => any;
	onSuccess: (items: Contact[]) => void;
	onLoadPrev?:()=> any;
	isAudienceBuilder?: boolean;
	isContactsOnly?: boolean;
	showSampleExportModal?: () => void;
	showExportModal?: () => void;
}) => {
	const [query, setQuery] = useState('');
	const [activePage, setActivePage] = useState(0);
	const [filteredItems, setFilteredItems] = useState<Contact[]>([]);
	const [isListMode, setIsListMode] = useState(false);
	const [sortMap, setSortMap] = useState<SortData[]>(keysToExportMap);
	const [displayItems, setDisplayItems] = useState<Contact[]>([]);
	const [dropdownSelectedAction, setDropdownSelectedAction] = useState<string>("");
	const { user } = useAuthContext();
	useEffect(() => {
		onQueryChange(query);

	}, [items]);

	useEffect(() => {
		onQueryChange(query);
	}, [sortMap, activePage, itemsPerPage]);

	useEffect(() => {
		const profile = decodeJson(user?.attributes.profile);
		if (profile?.listModes?.contactItems) {
			//setIsListMode(true);
			setIsListMode(false);
		}
	}, []);

	useEffect(() => {
		if (filteredItems.length === 0) {
			return;
		}
		const newItems = filteredItems.map((item) => {
			if (ruidsBeingUnlocked.includes(item.ruid)) {
				item.isUnlocking = true;
			} else {
				item.isUnlocking = false;
			}
			return item;
		});
		setFilteredItems(newItems);
		setDisplayItems(paginate(newItems, itemsPerPage, activePage));
	}, [ruidsBeingUnlocked]);

	const handlePageChange = (newPage: number, newPerPage: number) => {
		console.log('handlePageChange - newPage ',newPage);
		setActivePage(newPage);
		console.log('handlePageChange - onPageChange ',onPageChange);
		if (onPageChange) {
			onPageChange(newPage, newPerPage);
		}
	};

	/**
	 * @summary
	 * Handle search query change events
	 *
	 * @description
	 * On home screen - the search is handled by home screen itself
	 * So we should not filter the results here
	 * The results will get filtered via API
	 *
	 * @description
	 * Before filtering results here - we make sure that we don't have a manual
	 * query handler
	 *
	 * @param newQuery The new search query
	 */
	const onQueryChange = (newQuery: string) => {
		setQuery(newQuery);
		const queryNormalized = newQuery.toLowerCase().trim();
		const sortedItems = getSortedData(items, sortMap);

		if (onSearchQueryChange) {
			onSearchQueryChange(queryNormalized);
		}
		let newItems;
		if (queryNormalized && !onSearchQueryChange) {
			newItems = searchContactItems(sortedItems, queryNormalized);
			newItems = getSortedData(newItems, sortMap);
		} else {
			newItems = sortedItems;
		}
		setFilteredItems(newItems);
		setDisplayItems(paginate(newItems, itemsPerPage, activePage));
	};

	const onSelectAll = () =>
		onSelectMany(
			ActionSelect.ToggleCurrentPage,
			displayItems.map((item) => item.id)
		);

	/**
	 * @summary
	 * Change sort order of contacts
	 *
	 * @description
	 * This has a side effect that the current page items must be manually passed
	 * to the parent component - else there will be order mismatch
	 *
	 * @param key {string} The column key
	 * @param order {Enum} The order enum value
	 */
	const onSort = (key: string, order: SortOrder) => {
		let newMap = [...sortMap].map((value) => {
			if (value.id === key) {
				value.sortOrder = order;
			}
			return value;
		});
		setSortMap(newMap);
	};

	const onReorder = (newMap: SortData[]) => setSortMap(newMap);

	// const displayItems = paginate(filteredItems, itemsPerPage, activePage);
	const itemsList = displayItems.map((item) => (
		<ContactEntry
			key={item.ruid}
			item={item}
			emailAccounts={emailAccounts}
			isListMode={isListMode}
			isLocked={isLocked}
			onSelect={onSelect}
			onUnlock={onUnlockOne}
			onAdd={onAdd}
			onDownload={onDownload}
			sortMap={sortMap}
			isAudienceMember={isAudienceBuilder}
		/>
	));

	const queryNormalized = query.toLowerCase().trim();

	const handleQueryFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (onSearchQuerySubmit) {
			onSearchQuerySubmit(queryNormalized);
		}
	};

	let enableHasNext = hasNext;
	if (queryNormalized && !onSearchQueryChange) {
		enableHasNext = false;
	}

	// we don't want to call server when using local search
	let pagination = (<div></div>);
	let checkAllCheckbox = (<div></div>);





	const isAllSelected = displayItems.filter((item) => item.isSelected !== true).length === 0;
	const totalSelected =
    dropdownSelectedAction === ActionList.All
      ? items.filter((item) => item.isSelected === true).length
      : displayItems.filter((item) => item.isSelected === true).length;

	const onSelectDropdown = (type: ActionSelect, targetIds: string[] = [], actionType: string) => {
		setDropdownSelectedAction(actionType);
		onSelectMany(type, targetIds);
	}
	if (!isAudienceBuilder){
		pagination = (
			<Pagination
				totalItems={filteredItems.length}
				itemsPerPage={itemsPerPage}
				activePage={activePage}
				onPageChange={handlePageChange}
				isTrialAccount={isTrialAccount}
				setIsUpgradeModalActive={setIsUpgradeModalActive}
				onLoadPrev={onLoadPrev}
				hasNext={enableHasNext}
				onLoadMore={onLoadMore}
			/>
		);

	}
	if (isBusy) {
		return <TableSkeleton />
	}
	return (
		<Card className="is-scroll-view">
			<Slot slot="header">
				<form className="is-flex is-align-items-center is-fullwidth" onSubmit={handleQueryFormSubmit}>
					{!isAudienceBuilder ? (
						<FormCheckbox
							value={isAllSelected}
							isChecked={isAllSelected}
							onChange={(isChecked: boolean) => {
								if(isChecked) {
									setDropdownSelectedAction(ActionList.CurrentPage);
								} else {
									setDropdownSelectedAction("");
								}
								onSelectAll && onSelectAll();
							}}
						/>) : (<div></div>)}
					{!isAudienceBuilder ? (<ListActionButton
							contacts={items}
							displayItems={displayItems}
							selectedAction={dropdownSelectedAction}
							onSuccess={onSuccess}
							isContactsOnly={isContactsOnly}
						/>) : (<div></div>)}
					{!isAudienceBuilder ? (<ExportActionButton
							contacts={items}
							displayItems={displayItems}
							selectedAction={dropdownSelectedAction}
							onSuccess={onSuccess}
							onExport={onExport}
							sortMap={sortMap}
							isContactsOnly={isContactsOnly}
						/>) : (<div></div>)}

					{isAudienceBuilder ? (<FormButton className="is-outlined mr-5" onClick={showSampleExportModal}><IconDownload />&nbsp;&nbsp;Get Sample</FormButton>) :(<div></div>)}
					{isAudienceBuilder ? (<FormButton className={styles.whiteIcon} onClick={showExportModal}><IconRocket className={styles.rocketIconSVGWhite} /> Export</FormButton>) :(<div></div>)}
					{/* {isLocked && <ContactUnlock onUnlock={onUnlock} contacts={items} displayItems={displayItems} />}
					<ContactActions
						onAddToList={onAddToList}
						onExport={onExport}
						contacts={items}
						onSelect={onSelectMany}
						displayItems={displayItems}
						sortMap={sortMap}
					/> */}
					{totalSelected > 0 && (
						<div className="has-text-primary">
							{totalSelected} Selected
						</div>
					)}

					{/* <FormInput
						value={query}
						onChange={onQueryChange}
						isLast={true}
						iconLeft={<IconSearch />}
						fieldClassName="is-flex-grow-1"
						placeholder="Enter job title to filter"
					/> */}

					{/*<ViewToggle name="contactItems" isChecked={isListMode} onChange={setIsListMode}  />*/}

					<div className="ml-5">{pagination}</div>
					<span className="has-text-grey ml-5" style={{fontWeight: "bold"}}>{(totalResults || filteredItems.length).toLocaleString('en-US')} results</span>
				</form>
			</Slot>
			<Slot slot="body">
				{/* <CardAnimatePresence isActive={isBusy && !items.length}>
					<Loader />
				</CardAnimatePresence> */}
				<CardAnimatePresence isActive={displayItems.length === 0 && !isBusy}>
					<EmptyMsg msg="No contacts found" />
				</CardAnimatePresence>
				{isListMode ? (
					<ListView
						headings={sortMap}
						isSticky={true}
						className="is-comfortable is-resizable"
						isBusy={isBusy}
						items={displayItems}
						onSelectAll={onSelectAll}
						onSort={onSort}
						onReorder={onReorder}
					>
						{itemsList}
					</ListView>
				) : (
					itemsList
				)}
			</Slot>
			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default ContactItems;

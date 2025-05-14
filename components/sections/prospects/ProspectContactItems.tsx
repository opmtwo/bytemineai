import classNames from 'classnames';
import { FormEvent, useEffect, useState } from 'react';

import { ITEMS_PER_PAGE, keysToExportMap } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import {
	ActionAddToList,
	ActionExport,
	ActionList,
	ActionSelect,
	ActionUnlock,
	EmailAccountModel,
	IBytemineContact,
	SortData,
	SortOrder,
} from '../../../types';
import { searchContactItems } from '../../../utils/contact-utilsx';
import { getSortedData, paginate } from '../../../utils/helper-utils';
import Card from '../../Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButtonNew from '../../form/FormButtonNew';
import FormCheckbox from '../../form/FormCheckbox';
import IconDownload from '../../icons/IconDownload';
import IconNewCheck from '../../icons/IconNewCheck';
import IconRocket from '../../icons/IconRocket';
import ListView from '../../ListView';
import Pagination from '../../Pagination';
import PaginationNew from '../../PaginationNew';
import Slot from '../../Slot';
import TableSkeleton from '../../table-skeleton';
import ProspectContactEntry from './ProspectContactEntry';
import ProspectExportActionButton from './ProspectExportActionButton';
import ProspectListActionButton from './ProspectListActionButton';

const ProspectContactItems = ({
	items = [],
	emailAccounts = [],
	pidsBeingUnlocked = [],
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
	lastUpdatedAt,
	setIsUpgradeModalActive,
	onLoadMore,
	onLoadPrev,
	onSearchQueryChange,
	onSearchQuerySubmit,
	totalResults,
	onSuccess,
	isAudienceBuilder = false,
	isContactsOnly = false,
	isCollectionMode = false,
	showSampleExportModal,
	showExportModal,
}: {
	items: IBytemineContact[];
	emailAccounts: EmailAccountModel[];
	pidsBeingUnlocked: string[];
	itemsPerPage: number;
	isLocked: boolean;
	isBusy: boolean;
	hasNext?: boolean;
	totalResults?: number;
	lastUpdatedAt?: string;
	onAdd: (contact: IBytemineContact) => void;
	onSelect: (id: string, isChecked: boolean) => void;
	onDownload: (contact: IBytemineContact) => void;
	onAddToList: (type: ActionAddToList, targetIds: string[]) => void;
	onExport: (type: ActionExport, targetIds: string[], sortMap?: SortData[]) => void;
	onSelectMany: (type: ActionSelect, targetIds: string[]) => void;
	onUnlock: (type: ActionUnlock, targetIds: string[]) => void;
	onUnlockOne: (contact: IBytemineContact) => void;
	onPageChange?: (activePage: number, itemsPerPage: number) => void;
	isTrialAccount?: boolean;
	setIsUpgradeModalActive: (value: boolean) => void;
	onSearchQueryChange?: (query: string) => void;
	onSearchQuerySubmit?: (query: string) => void;
	onLoadMore?: (activePage: number) => any;
	onSuccess: (items: IBytemineContact[]) => void;
	onLoadPrev?: () => any;
	isAudienceBuilder?: boolean;
	isContactsOnly?: boolean;
	isCollectionMode?: boolean;
	showSampleExportModal?: () => void;
	showExportModal?: () => void;
}) => {
	const [query, setQuery] = useState('');
	const [activePage, setActivePage] = useState(0);
	const [filteredItems, setFilteredItems] = useState<IBytemineContact[]>([]);
	const [isListMode, setIsListMode] = useState(false);
	const [sortMap, setSortMap] = useState<SortData[]>(keysToExportMap);
	// const [displayItems, setDisplayItems] = useState<IBytemineContact[]>([]);
	const [dropdownSelectedAction, setDropdownSelectedAction] = useState<string>('');
	const { attributes } = useAuthContext();

	useEffect(() => {
		onQueryChange(query);
	}, [items, lastUpdatedAt, itemsPerPage, pidsBeingUnlocked, sortMap, activePage]);

	useEffect(() => {
		// const profile = decodeJson(user?.attributes.profile);
		// if (profile?.listModes?.contactItems) {
		// 	//setIsListMode(true);
		// 	setIsListMode(false);
		// }
	}, []);

	useEffect(() => {
		if (filteredItems.length === 0) {
			return;
		}
		const newItems = filteredItems.map((item) => {
			const index = items.findIndex((_item) => _item.pid === item.pid);
			if (index !== -1) {
				item = { ...item, ...items[index] };
			}
			if (pidsBeingUnlocked.includes(item.pid)) {
				item.isUnlocking = true;
			} else {
				item.isUnlocking = false;
			}
			return item;
		});
		setFilteredItems(newItems);
		// setDisplayItems(paginate(newItems, itemsPerPage, activePage));
	}, [pidsBeingUnlocked]);

	const displayItems = paginate(filteredItems, itemsPerPage, activePage);

	const handlePageChange = (newPage: number, newPerPage: number) => {
		// console.log('handlePageChange - newPage ', newPage);
		setActivePage(newPage);
		// console.log('handlePageChange - onPageChange ', onPageChange);
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
		// setDisplayItems(paginate(newItems, itemsPerPage, activePage));
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
		<ProspectContactEntry
			key={item.pid}
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
	let pagination = <div></div>;
	let checkAllCheckbox = <div></div>;

	const isAllSelected = displayItems.filter((item) => item.isSelected !== true).length === 0;
	const totalSelected =
		dropdownSelectedAction === ActionList.All
			? items.filter((item) => item.isSelected === true).length
			: displayItems.filter((item) => item.isSelected === true).length;

	const onSelectDropdown = (type: ActionSelect, targetIds: string[] = [], actionType: string) => {
		setDropdownSelectedAction(actionType);
		onSelectMany(type, targetIds);
	};

	const handleSelectAll = () => {
		// if (isChecked) {
		// 	setDropdownSelectedAction(ActionList.CurrentPage);
		// } else {
		// 	setDropdownSelectedAction('');
		// }
		onSelectAll && onSelectAll();
	};

	if (!isAudienceBuilder) {
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

	if (isContactsOnly) {
		pagination = <PaginationNew totalCount={filteredItems.length} currentPage={activePage} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />;
	}

	if (isBusy) {
		return <TableSkeleton />;
	}

	return (
		<>
			<form
				className="prospect-pagination is-align-items-center is-fullwidth"
				onSubmit={handleQueryFormSubmit}
				style={{ display: isCollectionMode ? 'none' : 'flex' }}
			>
				<div className="is-flex is-align-items-center mr-auto">
					{/* <FormCheckbox
						value={isAllSelected}
						isChecked={isAllSelected}
						onChange={(isChecked: boolean) => {
							if (isChecked) {
								setDropdownSelectedAction(ActionList.CurrentPage);
							} else {
								setDropdownSelectedAction('');
							}
							onSelectAll && onSelectAll();
						}}
					/> */}

					{/* <FormButtonNew className="is-outlined mr-5" onClick={showSampleExportModal}>
						<IconDownload />
						&nbsp;&nbsp;Get Sample
					</FormButtonNew> */}

					{/* <FormButtonNew onClick={showExportModal}>
						<IconRocket className="" />
						<span>Export</span>
					</FormButtonNew> */}

					{/* {isLocked && <ContactUnlock onUnlock={onUnlock} contacts={items} displayItems={displayItems} />}
							<ContactActions
								onAddToList={onAddToList}
								onExport={onExport}
								contacts={items}
								onSelect={onSelectMany}
								displayItems={displayItems}
								sortMap={sortMap}
							/> */}

					{/* <FormInput
								value={query}
								onChange={onQueryChange}
								isLast={true}
								iconLeft={<IconSearch />}
								fieldClassName="is-flex-grow-1"
								placeholder="Enter job title to filter"
							/> */}

					{/*<ViewToggle name="contactItems" isChecked={isListMode} onChange={setIsListMode}  />*/}

					{pagination}

					{totalSelected ? (
						<div className="is-flex is-flex-direction-column is-justify-content-center has-text-grey" style={{ minWidth: 120 }}>
							{/* <strong>{(totalResults || filteredItems.length).toLocaleString('en-US')} results</strong> */}
							{totalSelected > 0 && <span className="has-text-primary">{totalSelected} Selected</span>}
						</div>
					) : null}
				</div>

				<div className="is-flex is-align-items-center ml-auto">
					<FormButtonNew onClick={handleSelectAll}>
						<IconNewCheck width={16} />
						<span>Select All</span>
					</FormButtonNew>

					<ProspectListActionButton
						contacts={items}
						displayItems={displayItems}
						selectedAction={dropdownSelectedAction}
						onSuccess={onSuccess}
						isContactsOnly={isContactsOnly}
					/>

					<ProspectExportActionButton
						contacts={items}
						displayItems={displayItems}
						selectedAction={dropdownSelectedAction}
						onSuccess={onSuccess}
						onExport={onExport}
						sortMap={sortMap}
						isContactsOnly={isContactsOnly}
					/>
				</div>
			</form>

			<div className={classNames('is-scroll-view', { 'is-collection-mode': isCollectionMode })}>{itemsList}</div>

			{isCollectionMode && filteredItems.length ? <div className="mt-5">{pagination}</div> : null}
		</>
	);

	return (
		<div className="is-scroll-view">
			<Card>
				<Slot slot="header">
					<form className="is-flex is-align-items-center is-fullwidth" onSubmit={handleQueryFormSubmit}>
						{!isAudienceBuilder ? (
							<FormCheckbox
								value={isAllSelected}
								isChecked={isAllSelected}
								onChange={(isChecked: boolean) => {
									if (isChecked) {
										setDropdownSelectedAction(ActionList.CurrentPage);
									} else {
										setDropdownSelectedAction('');
									}
									onSelectAll && onSelectAll();
								}}
							/>
						) : (
							<div></div>
						)}

						{!isAudienceBuilder ? (
							<ProspectListActionButton
								contacts={items}
								displayItems={displayItems}
								selectedAction={dropdownSelectedAction}
								onSuccess={onSuccess}
								isContactsOnly={isContactsOnly}
							/>
						) : (
							<div></div>
						)}

						{!isAudienceBuilder ? (
							<ProspectExportActionButton
								contacts={items}
								displayItems={displayItems}
								selectedAction={dropdownSelectedAction}
								onSuccess={onSuccess}
								onExport={onExport}
								sortMap={sortMap}
								isContactsOnly={isContactsOnly}
							/>
						) : (
							<div></div>
						)}

						{isAudienceBuilder ? (
							<FormButtonNew className="is-outlined mr-5" onClick={showSampleExportModal}>
								<IconDownload />
								&nbsp;&nbsp;Get Sample
							</FormButtonNew>
						) : (
							<div></div>
						)}

						{isAudienceBuilder ? (
							<FormButtonNew onClick={showExportModal}>
								<IconRocket className="" />
								<span>Export</span>
							</FormButtonNew>
						) : (
							<div></div>
						)}

						{/* {isLocked && <ContactUnlock onUnlock={onUnlock} contacts={items} displayItems={displayItems} />}
						<ContactActions
							onAddToList={onAddToList}
							onExport={onExport}
							contacts={items}
							onSelect={onSelectMany}
							displayItems={displayItems}
							sortMap={sortMap}
						/> */}

						{totalSelected > 0 && <div className="has-text-primary">{totalSelected} Selected</div>}

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

						<span className="has-text-grey ml-5" style={{ fontWeight: 'bold' }}>
							{(totalResults || filteredItems.length).toLocaleString('en-US')} results
						</span>
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
		</div>
	);
};

export default ProspectContactItems;

import { useEffect, useState } from 'react';

import { ITEMS_PER_PAGE } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { Contact, IBytemineCollection, List, ListContactModel, UserAttributes } from '../../../types';
import { decodeJson } from '../../../utils/helper-utils';
import { searchListItems } from '../../../utils/list-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import IconSearch from '../../icons/IconSearch';
import ListView from '../../ListView';
import Loader from '../../Loader';
import Pagination, { paginate } from '../../Pagination';
import Slot from '../../Slot';
import TableSkeleton from '../../table-skeleton';
import ViewToggle from '../../ViewToggle';
import MyListEntry from './MyListEntry';
import PaginationNew from '../../PaginationNew';

const MyListItems = ({ onExport }: { onExport: (listContacts: ListContactModel[]) => void }) => {
	// const [query, setQuery] = useState('');
	// const [activePage, setActivePage] = useState(0);
	// const [activePerPage, setActivePerPage] = useState(ITEMS_PER_PAGE);
	// const [filteredItems, setFilteredItems] = useState<List[]>([]);

	const [isListMode, setIsListMode] = useState(false);

	const { attributes } = useAuthContext();

	const {
		isBusy: collectionIsBusy,
		items: collectionItems,
		itemsInUse: collectionItemsInUse,
		page: collectionPage,
		perPage: collectionPerPage,
		onPageChange: collectionOnPageChange,
		query: collectionQuery,
		onQueryChange: collectionOnQueryChange,
		onConfirmOpen: collectionOnConfirmOpen,
		onConfirmCancel: collectionOnConfirmCancel,
		onAdd: collectionOnAdd,
		onDelete: collectionOnDelete,
		onDeleteMany: collectionOnDeleteMany,
	} = useCrudContext<IBytemineCollection>();

	// useEffect(() => {
	// 	onQueryChange(query);
	// }, [items]);

	useEffect(() => {
		const profile = decodeJson(attributes?.profile);
		if (profile?.listModes?.myListItems) {
			setIsListMode(true);
		}
	}, []);

	// const onQueryChange = (newQuery: string) => {
	// 	setQuery(newQuery);
	// 	setActivePage(0);
	// 	const queryNormalized = newQuery.toLowerCase().trim();
	// 	if (queryNormalized) {
	// 		setFilteredItems(searchListItems(items, queryNormalized));
	// 	} else {
	// 		setFilteredItems(items);
	// 	}
	// };

	// const displayItems = paginate(filteredItems, activePerPage, activePage);
	// const itemsList = displayItems.map((item) => (
	// 	<MyListEntry key={item.id} item={item} isListMode={isListMode} onAdd={onAdd} onExport={onExport} users={users} onDelete={onDelete}/>
	// ));

	// const onPageChange = async (newPage: number, newPerPage: number) => {
	// 	setActivePage(newPage);
	// 	if (newPerPage) {
	// 		setActivePerPage(newPerPage);
	// 	}
	// };

	// const pagination = (
	// 	<Pagination
	// 		totalItems={filteredItems.length}
	// 		activePage={activePage}
	// 		isTrialAccount={false}
	// 		setIsUpgradeModalActive={() => {}}
	// 		itemsPerPage={activePerPage}
	// 		onPageChange={onPageChange}
	// 	/>
	// );

	// if(isBusy && !items.length) {
	// 	return <TableSkeleton />
	// }

	const itemsList = paginate(collectionItemsInUse, collectionPerPage, collectionPage).map((item) => (
		<>
			<MyListEntry key={item.id} item={item} isListMode={isListMode} onExport={onExport} />
		</>
	));

	const selectedItems = collectionItems.filter((_item) => _item.isSelected);

	const handleDeleteMany = async () => {
		const ids = selectedItems.map((_item) => _item.id);
		const onSubmit = () => async () => {
			await collectionOnDeleteMany(ids, {}, {}, {});
			window.dispatchEvent(new Event('logs.refresh'));
		};
		const onCancel = () => async () => await collectionOnConfirmCancel();
		collectionOnConfirmOpen(
			'Delete seeding mailbox?',
			'Are you sure you want to the selected seeding mailbox? This can not be undone!',
			onSubmit,
			onCancel
		);
	};

	const pagination = (
		<PaginationNew
			totalCount={collectionItemsInUse.length}
			currentPage={collectionPage}
			itemsPerPage={collectionPerPage}
			onPageChange={collectionOnPageChange}
			pageSizeOptions={[10, 25, 50]}
		/>
	);

	return (
		<Card className="is-scroll-view">
			<Slot slot="header">
				<div className="is-flex is-align-items-center is-flex-grow-1 mr-a">
					<FormInput
						fieldClassName="is-flex-grow-1"
						value={collectionQuery}
						onChange={collectionOnQueryChange}
						isLast={true}
						iconLeft={<IconSearch />}
					/>
					<span className="has-text-grey ml-5">{collectionItemsInUse.length} results</span>
				</div>
				<div className="ml-6 mr-5">{pagination}</div>
				<FormButton onClick={collectionOnAdd} variant={['is-outlined', 'is-ui-button']} className="ml-5">
					New List
				</FormButton>
			</Slot>

			<Slot slot="body">
				<CardAnimatePresence isActive={collectionIsBusy && !collectionItems.length}>
					<Loader />
				</CardAnimatePresence>
				<CardAnimatePresence isActive={!collectionIsBusy && !collectionItemsInUse.length}>
					<EmptyMsg msg="No list found" />
				</CardAnimatePresence>
				{isListMode ? <ListView>{itemsList}</ListView> : itemsList}
			</Slot>

			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default MyListItems;

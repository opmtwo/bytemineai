import { useEffect, useState } from 'react';

import { ITEMS_PER_PAGE } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { Contact, IBytemineCollection, IBytemineContact, List, ListContactModel, UserAttributes } from '../../../types';
import { decodeJson } from '../../../utils/helper-utils';
import { searchListItems } from '../../../utils/list-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButton from '../../form/FormButton';
import FormButtonNew from '../../form/FormButtonNew';
import FormInput from '../../form/FormInput';
import IconNewPlus from '../../icons/IconNewPlus';
import IconSearch from '../../icons/IconSearch';
import ListView from '../../ListView';
import Loader from '../../Loader';
import Pagination, { paginate } from '../../Pagination';
import PaginationNew from '../../PaginationNew';
import Slot from '../../Slot';
import TableSkeleton from '../../table-skeleton';
import ViewToggle from '../../ViewToggle';
import MyListEntry from './MyListEntry';

const MyListItems = ({ onExport }: { onExport: (listContacts: IBytemineContact[]) => void }) => {
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

	useEffect(() => {
		const profile = decodeJson(attributes?.profile);
		if (profile?.listModes?.myListItems) {
			setIsListMode(true);
		}
	}, []);

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

	if (collectionIsBusy && !collectionItems.length) {
		return <TableSkeleton />;
	}

	return (
		<main className="is-relative">
			<form className="is-search-form">
				<div className="is-flex is-align-items-center mr-auto">
					<FormInput
						fieldClassName="is-flex-grow-1"
						value={collectionQuery}
						onChange={collectionOnQueryChange}
						isLast={true}
						iconLeft={<IconSearch />}
						placeholder="Search"
					/>
					{/* <span className="has-text-grey ml-5">{collectionItemsInUse.length} results</span> */}
				</div>
				{/* <div className="ml-6 mr-5">{pagination}</div> */}
				<FormButtonNew type="button" onClick={collectionOnAdd} variant="active" className="ml-5">
					<IconNewPlus width={12} fill="#fff" />
					<span className="ml-1">Add New List</span>
				</FormButtonNew>
			</form>

			<Card className="is-scroll-view">
				<Slot slot="body">
					<CardAnimatePresence isActive={collectionIsBusy && !collectionItems.length}>
						<Loader />
					</CardAnimatePresence>
					<CardAnimatePresence isActive={!collectionIsBusy && !collectionItemsInUse.length}>
						<EmptyMsg msg="No list found" />
					</CardAnimatePresence>
					{isListMode ? <ListView>{itemsList}</ListView> : itemsList}
				</Slot>

				{collectionItemsInUse.length ? <Slot slot="footer">{pagination}</Slot> : null}
			</Card>
		</main>
	);
};

export default MyListItems;

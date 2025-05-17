import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { EActionSelect, IBytemineCollection, IBytemineContact } from '../../../types';
import { decodeJson } from '../../../utils/helper-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButtonNew from '../../form/FormButtonNew';
import FormDoubleCheckbox from '../../form/FormDoubleCheckbox';
import FormInput from '../../form/FormInput';
import IconNewPlus from '../../icons/IconNewPlus';
import IconSearch from '../../icons/IconSearch';
import ListView from '../../ListView';
import Loader from '../../Loader';
import { paginate } from '../../Pagination';
import PaginationNew from '../../PaginationNew';
import Slot from '../../Slot';
import TableSkeleton from '../../table-skeleton';
import MyListEntry from './MyListEntry';

const MyListItems = ({ onExport }: { onExport: (listContacts: IBytemineContact[]) => void }) => {
	const [isListMode, setIsListMode] = useState(false);

	const { attributes } = useAuthContext();

	const {
		isBusy: collectionIsBusy,
		isLoading: collectionIsLoading,
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
		onSelectMany: collectionOnSelectMany,
	} = useCrudContext<IBytemineCollection>();

	useEffect(() => {
		const profile = decodeJson(attributes?.profile);
		if (profile?.listModes?.myListItems) {
			setIsListMode(true);
		}
	}, []);

	const itemsHeader = (
		<motion.div layout className="panel-block is-block has-background-white-bis">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-10">
					<div className="columns is-mobile is-align-items-center has-text-dark">
						<div className="column is-4">
							<span className="is-flex is-align-items-center">
								{/* <FormCheckbox
									className="relative"
									value="accept"
									isChecked={paginate(collectionItemsInUse, collectionPerPage, collectionPage).every((item) => item.isSelected)}
									onChange={() => {
										collectionOnSelectMany(EActionSelect.ToggleCurrentPage, []);
									}}
								/> */}
								<span
									className="is-relative field"
									style={{ zIndex: 1 }}
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									<FormDoubleCheckbox
										className="is-filter-checkbox has-border-alt m-0"
										isChecked={paginate(collectionItemsInUse, collectionPerPage, collectionPage).every((item) => item.isSelected)}
										onChange={() => {
											collectionOnSelectMany(EActionSelect.ToggleCurrentPage, []);
										}}
									/>
								</span>
								<span className="ml-5">List Name</span>
							</span>
						</div>
						<div className="column is-4">Contacts</div>
						<div className="column is-4">Member Name</div>
					</div>
				</div>
				<div className="column is-2 is-flex is-justify-content-flex-end action-buttons">Action</div>
			</div>
		</motion.div>
	);

	const itemsList = paginate(collectionItemsInUse, collectionPerPage, collectionPage).map((item) => (
		<MyListEntry key={item.id} item={item} isListMode={isListMode} onExport={onExport} />
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

	if (collectionIsLoading && !collectionItems.length) {
		return <TableSkeleton />;
	}

	return (
		<main className="is-relative">
			<form className="is-search-form">
				<div className="is-flex is-align-items-center mr-auto is-flex-grow-1">
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
				<div className="is-flex is-align-items-center">
					<FormButtonNew type="button" onClick={collectionOnAdd} variant="active" className="ml-3">
						<IconNewPlus width={12} fill="#fff" />
						<span className="ml-1">New List</span>
					</FormButtonNew>
				</div>
			</form>

			<Card className="is-scroll-view">
				<Slot slot="body">
					<CardAnimatePresence isActive={collectionIsBusy && !collectionItems.length}>
						<Loader />
					</CardAnimatePresence>
					<CardAnimatePresence isActive={!collectionIsBusy && !collectionItemsInUse.length}>
						<EmptyMsg msg="No list found" />
					</CardAnimatePresence>
					{isListMode ? (
						<ListView>{itemsList}</ListView>
					) : (
						<>
							{!collectionIsLoading && !collectionItems.length ? null : (
								<>
									{itemsHeader}
									{itemsList}
								</>
							)}
						</>
					)}
				</Slot>
			</Card>
			{collectionItemsInUse.length ? <>{pagination}</> : null}
		</main>
	);
};

export default MyListItems;

import { motion } from 'framer-motion';
import classNames from 'classnames';
import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';

import { ITEMS_PER_PAGE } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { EActionSelect, IBytemineUser, UserAttributes } from '../../../types';
import { decodeJson } from '../../../utils/helper-utils';
import { searchUserItems } from '../../../utils/user-utils';
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
import UserEntry from '../../UserEntry';
import ViewToggle from '../../ViewToggle';
import PaginationNew from '../../PaginationNew';
import FormButtonNew from '../../form/FormButtonNew';
import FormDoubleCheckbox from '../../form/FormDoubleCheckbox';
import TableSkeleton from '../../table-skeleton';
import IconNewPlus from '../../icons/IconNewPlus';

const UserItems = () => {
	const [isListMode, setIsListMode] = useState(false);

	const { attributes } = useAuthContext();

	const {
		isBusy: userIsBusy,
		isLoading: userIsLoading,
		items: userItems,
		itemsInUse: userItemsInUse,
		page: userPage,
		perPage: userPerPage,
		onPageChange: userOnPageChange,
		query: userQuery,
		onQueryChange: userOnQueryChange,
		onConfirmOpen: userOnConfirmOpen,
		onConfirmCancel: userOnConfirmCancel,
		onAdd: userOnAdd,
		onDelete: userOnDelete,
		onDeleteMany: userOnDeleteMany,
		onSelectMany: userOnSelectMany,
	} = useCrudContext<IBytemineUser>();

	useEffect(() => {
		const profile = decodeJson(attributes?.profile);
		if (profile?.listModes?.userItems) {
			setIsListMode(true);
		}
	}, []);

	const itemsHeader = (
		<motion.div layout className="panel-block is-block has-background-white-bis">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-10">
					<div className="columns is-mobile is-align-items-center has-text-dark">
						<div className="column is-3">
							<span className="is-inline-flex" style={{ width: 50 }}>SL</span>
							<span>
								Name
							</span>
						</div>
						<div className="column is-3">Role</div>
						<div className="column is-3">Create Date</div>
						<div className="column is-3">Logged Time</div>
					</div>
				</div>
				<div className="column is-2 is-flex is-justify-content-flex-end action-buttons">Action</div>
			</div>
		</motion.div>
	);

	const itemsList = paginate(userItemsInUse, userPerPage, userPage).map((item: IBytemineUser, index: number) => (
		<>
			<UserEntry key={item.id} index={index} user={item} isListMode={isListMode} />
		</>
	));

	const selectedItems = userItems.filter((_item) => _item.isSelected);

	const handleDeleteMany = async () => {
		const ids = selectedItems.map((_item) => _item.id);
		const onSubmit = () => async () => {
			await userOnDeleteMany(ids, {}, {}, {});
			window.dispatchEvent(new Event('logs.refresh'));
		};
		const onCancel = () => async () => await userOnConfirmCancel();
		userOnConfirmOpen('Delete seeding mailbox?', 'Are you sure you want to the selected seeding mailbox? This can not be undone!', onSubmit, onCancel);
	};

	const pagination = (
		<PaginationNew
			totalCount={userItemsInUse.length}
			currentPage={userPage}
			itemsPerPage={userPerPage}
			onPageChange={userOnPageChange}
			pageSizeOptions={[10, 25, 50]}
		/>
	);

	const isNewDisabled = false;

	if (userIsLoading && !userItems.length) {
		return <TableSkeleton />;
	}

	return (
		<main className="is-relative">
			<form className="is-search-form">
				<div className="is-flex is-align-items-center mr-auto is-flex-grow-1">
					<FormInput
						fieldClassName="is-flex-grow-1"
						value={userQuery}
						onChange={userOnQueryChange}
						isLast={true}
						iconLeft={<IconSearch />}
						placeholder="Search"
					/>
					{/* <span className="has-text-grey ml-5">{userItemsInUse.length} results</span> */}
				</div>
				{/* <div className="ml-6 mr-5">{pagination}</div> */}
				<div className="is-flex is-align-items-center">
					<FormButtonNew type="button" onClick={userOnAdd} variant="active" className="ml-3">
						<IconNewPlus width={12} fill="#fff" />
						<span className="ml-1">Add Team</span>
					</FormButtonNew>
				</div>
			</form>


			<Card className="is-scroll-view">
				<Slot slot="body">
					<CardAnimatePresence isActive={userIsBusy && !userItems.length}>
						<Loader />
					</CardAnimatePresence>
					<CardAnimatePresence isActive={!userIsBusy && !userItemsInUse.length}>
						<EmptyMsg msg="No users found" />
					</CardAnimatePresence>
					{isListMode ? (
						<ListView>{itemsList}</ListView>
					) : (
						<>
							{userIsLoading && !userItems.length ? null : (
								<>
									{itemsHeader}
									{itemsList}
								</>
							)}
						</>
					)}
				</Slot>
			</Card>
			{userItemsInUse.length ? <>{pagination}</> : null}
		</main>
	);
};

export default UserItems;

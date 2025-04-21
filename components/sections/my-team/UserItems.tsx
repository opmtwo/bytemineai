import classNames from 'classnames';
import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';

import { ITEMS_PER_PAGE } from '../../../consts';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { useCrudContext } from '../../../providers/crud-provider';
import { IBytemineUser, UserAttributes } from '../../../types';
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

const UserItems = () => {
	const [isListMode, setIsListMode] = useState(false);

	const { attributes } = useAuthContext();

	const {
		isBusy: userIsBusy,
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
	} = useCrudContext<IBytemineUser>();

	useEffect(() => {
		const profile = decodeJson(attributes?.profile);
		if (profile?.listModes?.userItems) {
			setIsListMode(true);
		}
	}, []);

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
		userOnConfirmOpen(
			'Delete seeding mailbox?',
			'Are you sure you want to the selected seeding mailbox? This can not be undone!',
			onSubmit,
			onCancel
		);
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

	return (
		<Card className="is-scroll-view">
			<Slot slot="header">
				<div className="is-flex is-align-items-center mr-a is-flex-grow-1">
					<FormInput fieldClassName="is-flex-grow-1" value={userQuery} onChange={userOnQueryChange} isLast={true} iconLeft={<IconSearch />} />
				</div>
				<span className="has-text-grey ml-5">{userItemsInUse.length} results</span>
				<div className="ml-6 mr-5">{pagination}</div>
				{/* <span
						className={classNames('is-clickable', isSorted ? 'has-text-primary' : 'has-text-grey')}
						onClick={onSortToggle}
					>
						Sort by name
					</span> */}
				<CardAnimatePresence isActive={isNewDisabled ? false : true}>
					<FormButton onClick={isNewDisabled ? undefined : userOnAdd} variant={['is-outlined']} disabled={isNewDisabled}>
						New User
					</FormButton>
				</CardAnimatePresence>
			</Slot>
			<Slot slot="body">
				<CardAnimatePresence isActive={userIsBusy && !userItems.length}>
					<Loader />
				</CardAnimatePresence>
				<CardAnimatePresence isActive={!userIsBusy && !userItemsInUse.length}>
					<EmptyMsg msg="No users found" />
				</CardAnimatePresence>
				{isListMode ? <ListView>{itemsList}</ListView> : itemsList}
			</Slot>
			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default UserItems;

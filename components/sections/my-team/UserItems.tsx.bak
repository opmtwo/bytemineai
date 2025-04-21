import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { sortBy } from 'lodash';
import { ITEMS_PER_PAGE } from '../../../consts';
import { UserAttributes } from '../../../types';
import { searchUserItems } from '../../../utils/user-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import IconSearch from '../../icons/IconSearch';
import Loader from '../../Loader';
import Pagination, { paginate } from '../../Pagination';
import Slot from '../../Slot';
import UserEntry from '../../UserEntry';
import ViewToggle from '../../ViewToggle';
import ListView from '../../ListView';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { decodeJson } from '../../../utils/helper-utils';

const UserItems = ({
	items = [],
	isBusy,
	isNewDisabled,
	onNew,
	onEdit,
	onDelete,
}: {
	items: UserAttributes[];
	isBusy: boolean;
	isNewDisabled?: boolean;
	onNew: Function;
	onEdit: Function;
	onDelete: Function;
}) => {
	const [query, setQuery] = useState('');
	const [activePage, setActivePage] = useState(0);
	const [activePerPage, setActivePerPage] = useState(ITEMS_PER_PAGE);
	const [isSorted, setIsSorted] = useState(false);
	const [filteredItems, setFilteredItems] = useState<UserAttributes[]>([]);
	const [isListMode, setIsListMode] = useState(false);

	const { user } = useAuthContext();

	useEffect(() => {
		onQueryChange(query);
	}, [items]);

	useEffect(() => {
		const profile = decodeJson(user?.attributes.profile);
		if (profile?.listModes?.userItems) {
			setIsListMode(true);
		}
	}, []);

	const searchAndSort = (term: string, shouldSort = false) => {
		const queryNormalized = term.toLowerCase().trim();
		let newItems = items;
		if (queryNormalized) {
			newItems = searchUserItems(items, queryNormalized);
		}
		if (shouldSort) {
			newItems = sortBy(newItems, 'given_name');
		}
		return newItems;
	};

	const onQueryChange = (newQuery: string) => {
		setQuery(newQuery);
		setActivePage(0);
		setFilteredItems(searchAndSort(newQuery, isSorted));
	};

	const onSortToggle = () => {
		setIsSorted(!isSorted);
		setFilteredItems(searchAndSort(query, !isSorted));
	};

	const displayItems = paginate(filteredItems, activePerPage, activePage);
	const itemsList = displayItems.map((user, index) => (
		<UserEntry
			key={user.sub}
			index={index}
			user={user}
			isListMode={isListMode}
			onEdit={onEdit}
			onDelete={onDelete}
		/>
	));

	const onPageChange = async (newPage: number, newPerPage: number) => {
		setActivePage(newPage);
		if (newPerPage) {
			setActivePerPage(newPerPage);
		}
	};

	const pagination = (
		<Pagination
			totalItems={filteredItems.length}
			activePage={activePage}
			isTrialAccount={false}
			setIsUpgradeModalActive={() => {}}
			itemsPerPage={activePerPage}
			onPageChange={onPageChange}
		/>
	);

	return (
		<Card className="is-scroll-view">
			<Slot slot="header">
				<div className="is-flex is-align-items-center mr-a is-flex-grow-1">
					<FormInput
						fieldClassName="is-flex-grow-1"
						value={query}
						onChange={onQueryChange}
						isLast={true}
						iconLeft={<IconSearch />}
					/>
				</div>
				<span className="has-text-grey ml-5">{filteredItems.length} results</span>
				<div className="ml-6 mr-5">{pagination}</div>
				{/* <span
						className={classNames('is-clickable', isSorted ? 'has-text-primary' : 'has-text-grey')}
						onClick={onSortToggle}
					>
						Sort by name
					</span> */}
				<CardAnimatePresence isActive={isNewDisabled ? false : true}>
					<FormButton
						onClick={isNewDisabled ? undefined : onNew}
						variant={['is-outlined']}
						disabled={isNewDisabled}
					>
						New User
					</FormButton>
				</CardAnimatePresence>
			</Slot>
			<Slot slot="body">
				<CardAnimatePresence isActive={isBusy && !items.length}>
					<Loader />
				</CardAnimatePresence>
				<CardAnimatePresence isActive={displayItems.length === 0 && !isBusy}>
					<EmptyMsg msg="No users found" />
				</CardAnimatePresence>
				{isListMode ? <ListView>{itemsList}</ListView> : itemsList}
			</Slot>
			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default UserItems;

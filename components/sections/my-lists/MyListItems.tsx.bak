import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../../consts';
import { Contact, List, ListContactModel, UserAttributes } from '../../../types';
import { searchListItems } from '../../../utils/list-utils';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import EmptyMsg from '../../EmptyMsg';
import FormButton from '../../form/FormButton';
import FormInput from '../../form/FormInput';
import IconSearch from '../../icons/IconSearch';
import Loader from '../../Loader';
import Pagination, { paginate } from '../../Pagination';
import Slot from '../../Slot';
import MyListEntry from './MyListEntry';
import ViewToggle from '../../ViewToggle';
import ListView from '../../ListView';
import { useAuthContext } from '../../../providers/auth-data-provider';
import { decodeJson } from '../../../utils/helper-utils';
import TableSkeleton from '../../table-skeleton';

const MyListItems = ({
	items = [],
	users = [],
	isBusy,
	onNew,
	onAdd,
	onExport,
	onDelete
}: {
	items: List[];
	users: UserAttributes[];
	isBusy: boolean;
	onNew: Function;
	onAdd: Function;
	onExport: (listContacts: ListContactModel[]) => void;
	onDelete:(listContacts: any) => void;
}) => {
	const [query, setQuery] = useState('');
	const [activePage, setActivePage] = useState(0);
	const [activePerPage, setActivePerPage] = useState(ITEMS_PER_PAGE);
	const [filteredItems, setFilteredItems] = useState<List[]>([]);
	const [isListMode, setIsListMode] = useState(false);

	const { user } = useAuthContext();

	useEffect(() => {
		onQueryChange(query);
	}, [items]);

	useEffect(() => {
		const profile = decodeJson(user?.attributes.profile);
		if (profile?.listModes?.myListItems) {
			setIsListMode(true);
		}
	}, []);

	const onQueryChange = (newQuery: string) => {
		setQuery(newQuery);
		setActivePage(0);
		const queryNormalized = newQuery.toLowerCase().trim();
		if (queryNormalized) {
			setFilteredItems(searchListItems(items, queryNormalized));
		} else {
			setFilteredItems(items);
		}
	};

	const displayItems = paginate(filteredItems, activePerPage, activePage);
	const itemsList = displayItems.map((item) => (
		<MyListEntry key={item.id} item={item} isListMode={isListMode} onAdd={onAdd} onExport={onExport} users={users} onDelete={onDelete}/>
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

	if(isBusy && !items.length) {
		return <TableSkeleton />
	}

	return (
		<Card className="is-scroll-view">
			<Slot slot="header">
				<div className="is-flex is-align-items-center is-flex-grow-1 mr-a">
					<FormInput fieldClassName="is-flex-grow-1" value={query} onChange={onQueryChange} isLast={true} iconLeft={<IconSearch />} />
					<span className="has-text-grey ml-5">{filteredItems.length} results</span>
				</div>
				<div className="ml-6 mr-5">{pagination}</div>

				<FormButton onClick={onNew} variant={['is-outlined', 'is-ui-button']} className="ml-5">
					New List
				</FormButton>
			</Slot>
			<Slot slot="body">
				<CardAnimatePresence isActive={isBusy && !items.length}>
					<Loader />
				</CardAnimatePresence>
				<CardAnimatePresence isActive={displayItems.length === 0 && !isBusy}>
					<EmptyMsg msg="No list found" />
				</CardAnimatePresence>
				{isListMode ? <ListView>{itemsList}</ListView> : itemsList}
			</Slot>
			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default MyListItems;
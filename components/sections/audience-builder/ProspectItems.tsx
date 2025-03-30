import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../../consts';
import { List } from '../../../types';
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
import ProspectEntry from './ProspectEntry';

const MyListItems = ({ items = [], isBusy, onNew, onAdd }: { items: List[]; isBusy: boolean; onNew: Function; onAdd: Function }) => {
	const [query, setQuery] = useState('');
	const [activePage, setActivePage] = useState(0);
	const [filteredItems, setFilteredItems] = useState<List[]>([]);

	useEffect(() => {
		onQueryChange(query);
	}, [items]);

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

	const displayItems = paginate(filteredItems, ITEMS_PER_PAGE, activePage);
	const itemsList = displayItems.map((item) => <ProspectEntry key={item.id} item={item} onAdd={onAdd} />);

	return (
		<Card>
			<Slot slot="header">
				<div className="is-flex is-align-items-center mr-a">
					<FormInput value={query} onChange={onQueryChange} isLast={true} iconLeft={<IconSearch />} />
					<span className="has-text-grey ml-5">{filteredItems.length} results</span>
				</div>
				<FormButton onClick={onNew} variant={['is-outlined', 'is-ui-button']}>
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
				{itemsList}
			</Slot>
			<Slot slot="footer">
				<Pagination totalItems={filteredItems.length} activePage={activePage}
							isTrialAccount={false}
							setIsUpgradeModalActive={() => {}} onPageChange={setActivePage} />
			</Slot>
		</Card>
	);
};

export default MyListItems;

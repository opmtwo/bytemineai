import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../consts';
import { useAuthContext } from '../../providers/auth-data-provider';
import { Enrichment } from '../../types';
import { searchEnrichmentItems } from '../../utils/enrichment-utils';
import Card from '../cards/Card';
import CardAnimatePresence from '../cards/CardAnimatePresence';
import EmptyMsg from '../EmptyMsg';
import FormInput from '../form/FormInput';
import IconSearch from '../icons/IconSearch';
import Loader from '../Loader';
import Pagination, { paginate } from '../Pagination';
import Slot from '../Slot';
import TableSkeleton from '../table-skeleton';
import EnrichBulkEntry from './EnrichBulkEntry';

const EnrichBulkItems = ({ items = [], isBusy, onDownload }: { items: Enrichment[]; isBusy: boolean; onDownload: (id: string) => void }) => {
	const [query, setQuery] = useState('');
	const [activePage, setActivePage] = useState(0);
	const [activePerPage, setActivePerPage] = useState(ITEMS_PER_PAGE);
	const [filteredItems, setFilteredItems] = useState<Enrichment[]>([]);

	const { user } = useAuthContext();

	useEffect(() => {
		onQueryChange(query);
	}, [items]);

	const onQueryChange = (newQuery: string) => {
		setQuery(newQuery);
		setActivePage(0);
		const queryNormalized = newQuery.toLowerCase().trim();
		if (queryNormalized) {
			setFilteredItems(searchEnrichmentItems(items, queryNormalized));
		} else {
			setFilteredItems(items);
		}
	};

	const displayItems = paginate(filteredItems, activePerPage, activePage);
	const itemsList = displayItems.map((item) => <EnrichBulkEntry key={item.id} item={item} onDownload={onDownload} />);

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

	if (isBusy && !items.length) {
		return <TableSkeleton />;
	}

	return (
		<Card className="is-scroll-view">
			<Slot slot="header">
				<div className="is-flex is-align-items-center is-flex-grow-1 mr-a">
					<FormInput value={query} onChange={onQueryChange} iconLeft={<IconSearch />} isLast />
					<span className="has-text-grey ml-5">{filteredItems.length} results</span>
				</div>
				<div className="ml-a">{pagination}</div>
			</Slot>
			<Slot slot="body">
				<CardAnimatePresence isActive={isBusy && !items.length}>
					<Loader />
				</CardAnimatePresence>
				<CardAnimatePresence isActive={displayItems.length === 0 && !isBusy}>
					<EmptyMsg msg="No enrichments found" />
				</CardAnimatePresence>
				{itemsList}
			</Slot>
			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default EnrichBulkItems;

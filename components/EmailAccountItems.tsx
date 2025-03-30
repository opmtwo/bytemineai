import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from './../consts';
import { EmailAccountModel, UserAttributes } from './../types';
import { searchEmailAccountItems } from './../utils/email-account-utils';
import Card from './cards/Card';
import CardAnimatePresence from './cards/CardAnimatePresence';
import EmptyMsg from './EmptyMsg';
import FormButton from './form/FormButton';
import FormInput from './form/FormInput';
import IconSearch from './icons/IconSearch';
import Loader from './Loader';
import Pagination, { paginate } from './Pagination';
import Slot from './Slot';
import EmailAccountEntry from './EmailAccountEntry';
import ViewToggle from './ViewToggle';
import ListView from './ListView';
import { useAuthContext } from '../providers/auth-data-provider';
import { decodeJson } from '../utils/helper-utils';

const EmailAccountItems = ({
	items = [],
	isBusy,
	onNew,
	onActivate,
	onDelete,
}: {
	items: EmailAccountModel[];
	isBusy: boolean;
	onNew: Function;
	onActivate: Function;
	onDelete: Function;
}) => {
	const [query, setQuery] = useState('');
	const [activePage, setActivePage] = useState(0);
	const [activePerPage, setActivePerPage] = useState(ITEMS_PER_PAGE);
	const [filteredItems, setFilteredItems] = useState<EmailAccountModel[]>([]);
	const [isListMode, setIsListMode] = useState(false);

	const { user } = useAuthContext();

	useEffect(() => {
		onQueryChange(query);
	}, [items]);

	useEffect(() => {
		const profile = decodeJson(user?.attributes.profile);
		if (profile?.listModes?.emailAccountItems) {
			setIsListMode(true);
		}
	}, []);

	const onQueryChange = (newQuery: string) => {
		setQuery(newQuery);
		setActivePage(0);
		const queryNormalized = newQuery.toLowerCase().trim();
		if (queryNormalized) {
			setFilteredItems(searchEmailAccountItems(items, queryNormalized));
		} else {
			setFilteredItems(items);
		}
	};

	const displayItems = paginate(filteredItems, activePerPage, activePage);
	const itemsList = displayItems.map((item) => (
		<EmailAccountEntry key={item.id} item={item} isListMode={isListMode} onActivate={onActivate} onDelete={onDelete} isBusy={isBusy} />
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
				<div className="is-flex is-align-items-center is-flex-grow-1 mr-a">
					<FormInput fieldClassName="is-flex-grow-1" value={query} onChange={onQueryChange} isLast={true} iconLeft={<IconSearch />} />
				</div>
				<span className="has-text-grey ml-6">{filteredItems.length} results</span>
				<div className="ml-6 mr-5">{pagination}</div>
				<ViewToggle name="emailAccountItems" isChecked={isListMode} onChange={setIsListMode} />
				<FormButton onClick={onNew} variant={['is-outlined']}>
					New Account
				</FormButton>
			</Slot>
			<Slot slot="body">
				<CardAnimatePresence isActive={isBusy && !items.length}>
					<Loader />
				</CardAnimatePresence>
				<CardAnimatePresence isActive={displayItems.length === 0 && !isBusy}>
					<EmptyMsg msg="No email accounts found" />
				</CardAnimatePresence>
				{isListMode ? <ListView>{itemsList}</ListView> : itemsList}
			</Slot>
			<Slot slot="footer">{pagination}</Slot>
		</Card>
	);
};

export default EmailAccountItems;

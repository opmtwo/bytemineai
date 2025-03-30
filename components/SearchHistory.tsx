import { Dispatch, SetStateAction } from 'react';
import { sortBy } from 'lodash';
import { FilterModel } from '../types';
import Modal from './modals/Modal';
import Card from './cards/Card';
import Slot from './Slot';
import CardTitle from './CardTitle';
import Loader from './Loader';
import EmptyMsg from './EmptyMsg';
import IconClose from './icons/IconClose';
import SearchEntry from './SearchEntry';
import FormButton from './form/FormButton';

const SearchHistory = ({
	isActive,
	searchItems,
	isBusy,
	nextToken,
	onCancel,
	onClick,
	onFetchMore,
}: {
	isActive: boolean;
	searchItems: FilterModel[];
	isBusy: boolean;
	nextToken?: string;
	onCancel: () => void;
	onClick: Dispatch<SetStateAction<FilterModel | undefined>>;
	onFetchMore: () => void;
}) => {
	const itemsList = sortBy(searchItems, 'createdAt')
		.reverse()
		.map((search) => <SearchEntry key={search.id} item={search} onClick={onClick} />);

	return (
		console.log(itemsList,searchItems),
		<Modal isActive={isActive} onCancel={onCancel}>
			<Card>
				<Slot slot="header">
					<CardTitle>My Searches</CardTitle>
					<span className="is-clickable" onClick={onCancel}>
						<IconClose />
					</span>
				</Slot>
				<Slot slot="body">
					{isBusy && !searchItems.length ? <Loader /> : null}
					{searchItems.length === 0 && !isBusy ? <EmptyMsg msg="No search history found" /> : null}
					{itemsList}
				</Slot>
			</Card>
		</Modal>
	);
};

export default SearchHistory;

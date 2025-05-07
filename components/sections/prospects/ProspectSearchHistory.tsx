import { sortBy } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { FilterModel } from '../../../types';
import Card from '../../cards/Card';
import CardTitle from '../../CardTitle';
import EmptyMsg from '../../EmptyMsg';
import IconClose from '../../icons/IconClose';
import Loader from '../../Loader';
import Modal from '../../Modal';
import Slot from '../../Slot';
import ProspectSearchEntry from './ProspectSearchEntry';

const ProspectSearchHistory = ({
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
		.map((search) => <ProspectSearchEntry key={search.id} item={search} onClick={onClick} />);

	return (
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

export default ProspectSearchHistory;

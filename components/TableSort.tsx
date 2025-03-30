import classNames from 'classnames';
import { SortOrder } from '../types';
import IconSortAsc from './icons/IconSortAsc';
import IconSortDesc from './icons/IconSortDesc';
import IconSortNone from './icons/IconSortNone';

const TableSort = ({
	sortKey,
	sortOrder = SortOrder.none,
	onSort,
}: {
	sortKey: string;
	sortOrder?: SortOrder;
	onSort: (key: string, order: SortOrder) => void;
}) => {
	const onClick = () => {
		if (sortOrder === SortOrder.none) {
			return onSort(sortKey, SortOrder.asc);
		}
		if (sortOrder === SortOrder.asc) {
			return onSort(sortKey, SortOrder.desc);
		}
		return onSort(sortKey, SortOrder.none);
	};

	let icon = <IconSortNone />;
	if (sortOrder === SortOrder.asc) {
		icon = <IconSortAsc />;
	}
	if (sortOrder === SortOrder.desc) {
		icon = <IconSortDesc />;
	}

	return (
		<span
			className={classNames('icon has-svg is-clickable', { 'is-ui-svg': sortOrder !== SortOrder.none })}
			onClick={onClick}
			style={{ width: 16, height: 16 }}
		>
			{icon}
		</span>
	);
};

export default TableSort;

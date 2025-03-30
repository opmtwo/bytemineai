import { MouseEvent } from 'react';
import { List } from '../types';
import { getDisplayTime } from '../utils/helper-utils';
import Anchor from './Anchor';

const AddToListItems = ({ listItems, onClick }: { listItems: List[]; onClick: (list: List) => void }) => {
	const items = listItems.map((item) => {
		const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
			e.preventDefault();
			onClick(item);
		};
		const displayTime = getDisplayTime(item.createdAt);
		return (
			<div className="panel-block is-block" key={item.id}>
				<Anchor className="is-block has-text-primary" href="" onClick={handleClick}>
					{item.name}
				</Anchor>
				<time dateTime={item.createdAt}>{displayTime}</time>
			</div>
		);
	});
	return <>{items}</>;
};

export default AddToListItems;

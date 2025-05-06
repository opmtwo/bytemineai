import { MouseEvent } from 'react';

import { IBytemineCollection } from '../../../types';
import { getDisplayTime } from '../../../utils/helper-utils';
import Anchor from '../../Anchor';

const ProspectAddToCollectionItems = ({ listItems, onClick }: { listItems: IBytemineCollection[]; onClick: (list: IBytemineCollection) => void }) => {
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

export default ProspectAddToCollectionItems;

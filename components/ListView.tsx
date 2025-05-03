/**
 * @summary
 * A sortable list of items
 *
 * @description
 * This relies on dnd kit
 *
 * @see
 * https://docs.dndkit.com/
 * https://docs.dndkit.com/presets/sortable
 */

import { ReactNode, useState } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragStartEvent,
	DragEndEvent,
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import classNames from 'classnames';
import FormCheckbox from './form/FormCheckbox';
import TableSort from './TableSort';
import { SortData, SortOrder } from '../types';
import SortableItem from './SortableItem';
import { reorder } from '../utils/helper-utils';

const ListView = ({
	headings = [],
	isSticky = false,
	isBusy = false,
	className = '',
	children,
	items = [],
	onSelectAll = () => {},
	onSort = () => {},
	onReorder = () => {},
}: {
	headings?: SortData[];
	isSticky?: boolean;
	isBusy?: boolean;
	className?: string;
	children?: ReactNode;
	items?: any[];
	onSelectAll?: (value: boolean) => void;
	onSort?: (key: string, order: SortOrder) => void;
	onReorder?: (values: SortData[]) => void;
}) => {
	const [activeId, setActiveId] = useState<string>();
	const isAllSelected = items.filter((item) => item.isSelected !== true).length === 0;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveId(active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over?.id && active.id !== over?.id) {
			const startIndex = headings.findIndex((item) => item.id === active.id);
			const endIndex = headings.findIndex((item) => item.id === over.id);
			onReorder(reorder(headings, startIndex, endIndex));
		}
		setActiveId(undefined);
	};

	if (!items?.length && isBusy) {
		return null;
	}

	return (
		<div className="table-container m-0">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				modifiers={[restrictToHorizontalAxis]}
			>
				<table className={classNames('table is-bordered is-hoverable is-fullwidth mb-0', className)}>
					<thead>
						<tr>
							{isSticky ? (
								<th className="action-select is-sticky">
									{/* <FormCheckbox
										value={isAllSelected}
										isChecked={isAllSelected}
										onChange={(isChecked: boolean) => {
											onSelectAll && onSelectAll(isChecked);
										}}
									/> */}
								</th>
							) : null}
							<SortableContext items={headings} strategy={horizontalListSortingStrategy}>
								{headings.map((value) => (
									<SortableItem key={value.id} id={value.id}>
										<div className="is-resizeable is-unselectable">
											{value?.content || activeId}
											{onSort ? <TableSort sortKey={value.id} sortOrder={value.sortOrder} onSort={onSort} /> : null}
										</div>
									</SortableItem>
								))}
							</SortableContext>
							{isSticky ? <th className="action-buttons is-sticky">Action</th> : <th></th>}
						</tr>
					</thead>
					<tbody>{children}</tbody>
				</table>
			</DndContext>
		</div>
	);
};

export default ListView;

import { useState } from 'react';
import classNames from 'classnames';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	DragStartEvent,
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import SortableItem from '../SortableItem';
import { reorder } from '../../utils/helper-utils';
import { exportContactPersonLabels, keysToExportContactCompany, keysToExportContactPerson } from '../../consts';
import { sentenceCase } from 'change-case';
import { ContactCompany } from '../../types';
import { getCompanyExportList } from '../../utils/contact-utilsx';

const defaultHeadings = [...keysToExportContactCompany.map((value, index) => ({ content: value, id: (index + 1).toString() }))];

const EnrichCompanyInfoTable = ({ items, className }: { items: ContactCompany[]; className?: string }) => {
	const [activeId, setActiveId] = useState<string>();
	const [headings, setHeadings] = useState(defaultHeadings);

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
			setHeadings(reorder(headings, startIndex, endIndex));
		}
		setActiveId(undefined);
	};

	// get rows using helper - this is also userd during csv export
	const rows = getCompanyExportList(items);

	// remove labels
	rows.splice(0, 1);

	return (
		<div className="table-container has-radius m-0">
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
							<SortableContext items={headings} strategy={horizontalListSortingStrategy}>
								{headings.map((value) => (
									<SortableItem key={value.id} id={value.id}>
										<div className="is-resizeable is-unselectable">
											{(exportContactPersonLabels as any)[value.id] || sentenceCase(value?.content) || activeId}
										</div>
									</SortableItem>
								))}
							</SortableContext>
						</tr>
					</thead>
					<tbody>
						{rows.map((contact) => (
							<tr key={contact.contactId}>
								{headings.map((value) => {
									return <td key={value.id}>{contact[value.content]}</td>;
								})}
							</tr>
						))}
					</tbody>
				</table>
			</DndContext>
		</div>
	);
};

export default EnrichCompanyInfoTable;

/**
 * @summary
 * A sortable item
 *
 * @description
 * This relies on dnd kit
 *
 * @see
 * https://docs.dndkit.com/
 * https://docs.dndkit.com/presets/sortable
 */

import { ReactNode } from 'react';
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconDrag from './icons/IconDrag';

const SortableItem = ({ id, children }: { id: string; children: ReactNode }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: id,
		transition: {
			duration: 150,
			easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
		},
	});

	const animateLayoutChanges: AnimateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<th ref={setNodeRef} style={style} {...attributes} {...animateLayoutChanges} className="is-relative">
			{children}
			<span className="icon has-svg is-drag-handle" style={{ width: 16, height: 16 }} {...listeners} {...attributes}>
				<IconDrag />
			</span>
		</th>
	);
};

export default SortableItem;

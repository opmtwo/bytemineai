import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import CardAnimatePresence from './cards/CardAnimatePresence';

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
	paperProps?: HTMLAttributes<HTMLDivElement>;
	error?: Error;
	color?: string; // Bulma color class, e.g., 'is-danger', 'is-warning'
	size?: string; // e.g., 'is-small', 'is-medium'
	px?: string; // Bulma uses spacing helpers like 'px-5'
	py?: string;
}

const Notification = ({
	paperProps = { className: 'mb-5' },
	className = 'has-text-centered box',
	error,
	color = 'is-danger has-text-light',
	size = 'is-small',
	px = '',
	py = '',
	...rest
}: NotificationProps) => {
	const { className: paperClassName, ...paperPropsRest } = paperProps;

	return (
		<CardAnimatePresence isActive={error?.message !== undefined}>
			<div className={classNames(paperClassName)} {...paperPropsRest}>
				<div className={classNames('notification', color, size, px, py, className)} {...rest}>
					{error?.message}
				</div>
			</div>
		</CardAnimatePresence>
	);
};

export default Notification;

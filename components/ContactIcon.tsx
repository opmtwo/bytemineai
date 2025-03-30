import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';

const ContactIcon = ({
	color,
	initial,
	children,
	className,
	width = 20,
	height = 20,
}: {
	color: 'info' | 'success' | 'warning' | 'dark' | 'danger';
	initial: string;
	children: ReactNode;
	className?: string;
	width?: number;
	height?: number;
}) => {
	let style: CSSProperties = { width, height };
	if (color === 'info') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (color === 'success') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (color === 'warning') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (color === 'danger') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (color === 'dark') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}

	return (
		<span className={classNames('is-flex-inline is-align-items-center', className)}>
			<span className="icon has-radius mr-3 is-unselectable" style={style}>
				{initial}
			</span>
			<span className="has-text-normal" style={{ wordBreak: 'break-all' }}>{children}</span>
		</span>
	);
};

export default ContactIcon;

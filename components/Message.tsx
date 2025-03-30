import { ReactNode } from 'react';
import classNames from 'classnames';

const Message = ({
	children,
	className,
	color,
	size,
}: {
	children: ReactNode;
	className?: string;
	color?: 'is-primary' | 'is-secondary' | 'is-danger' | 'is-info' | 'is-success' | 'is-warning' | undefined;
	size?: 'is-small' | 'is-normal' | 'is-medium' | 'is-large' | undefined;
}) => {
	const cssClassNames = classNames('message', color, size, className);

	return (
		<article className={cssClassNames}>
			<div className="message-body" style={{ borderWidth: 1 }}>
				{children}
			</div>
		</article>
	);
};

export default Message;

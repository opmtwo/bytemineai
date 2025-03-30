import { CSSProperties, HTMLAttributeAnchorTarget, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

const Anchor = ({
	href,
	children,
	className,
	style,
	target,
	onClick,
}: {
	href: string;
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	target?: HTMLAttributeAnchorTarget;
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) => (
	<Link href={href}>
		<a className={className} onClick={onClick} style={style} target={target}>
			{children}
		</a>
	</Link>
);

export default Anchor;

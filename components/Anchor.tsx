import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

const Anchor = ({ children, href, ...rest }: AnchorProps) => (
	<Link href={href} {...rest}>
		{children}
	</Link>
);

export default Anchor;

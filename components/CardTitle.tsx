import { ReactNode } from 'react';

const CardTitle = ({ children, className }: { children: ReactNode, className?: string }) => (
	<big>
		<strong className={className}>{children}</strong>
	</big>
);

export default CardTitle;

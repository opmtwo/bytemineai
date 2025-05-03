import { SVGProps } from 'react';

const IconNewBreadcrumbArrow = ({ stroke = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 6 10" fill="none" {...props}>
		<path d="M1 9L5 5L1 1" stroke="#98A2B3" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default IconNewBreadcrumbArrow;

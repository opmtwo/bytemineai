import { SVGProps } from 'react';

const IconNewArrowDown = ({ stroke = '#344054', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 12 8" fill="none" {...props}>
		<path d="M1 1.5L6 6.5L11 1.5" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default IconNewArrowDown;

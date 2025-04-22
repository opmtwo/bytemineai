import { SVGProps } from 'react';

const IconNewArrowRight = ({ stroke = '#344054', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 8 14" fill="none" {...props}>
		<path d="M1 13L7 7L1 1" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default IconNewArrowRight;

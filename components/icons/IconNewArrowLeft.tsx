import { SVGProps } from 'react';

const IconNewArrowLeft = ({ stroke = '#344054', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 8 14" fill="none" {...props}>
		<path d="M7 1L1 7L7 13" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default IconNewArrowLeft;

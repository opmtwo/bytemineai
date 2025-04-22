import { SVGProps } from 'react';

const IconNewCheck = ({ stroke = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 16 11" fill="none" {...props}>
		<path d="M14.6666 1L5.49992 10.1667L1.33325 6" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default IconNewCheck;

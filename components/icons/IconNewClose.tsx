import { SVGProps } from 'react';

const IconNewClose = ({ stroke = '#98A2B3', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 12 12" fill="none" {...props}>
		<path d="M11 1L1 11M1 1L11 11" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default IconNewClose;

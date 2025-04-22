import { SVGProps } from 'react';

const IconNewPlusCircle = ({ stroke = '#344054', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 18 18" fill="none" {...props}>
		<path
			d="M8.99994 6.03703V11.963M6.03697 9H11.9629M16.4073 9C16.4073 13.091 13.0909 16.4074 8.99994 16.4074C4.90894 16.4074 1.59253 13.091 1.59253 9C1.59253 4.909 4.90894 1.59259 8.99994 1.59259C13.0909 1.59259 16.4073 4.909 16.4073 9Z"
			stroke={stroke}
			strokeWidth="1.66667"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default IconNewPlusCircle;

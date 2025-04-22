import { SVGProps } from 'react';

const IconNewSupport = ({ stroke = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 20 20" fill="none" {...props}>
		<path
			d="M19 16V10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10V16M3.5 19C2.11929 19 1 17.8807 1 16.5V14.5C1 13.1193 2.11929 12 3.5 12C4.88071 12 6 13.1193 6 14.5V16.5C6 17.8807 4.88071 19 3.5 19ZM16.5 19C15.1193 19 14 17.8807 14 16.5V14.5C14 13.1193 15.1193 12 16.5 12C17.8807 12 19 13.1193 19 14.5V16.5C19 17.8807 17.8807 19 16.5 19Z"
			stroke={stroke}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default IconNewSupport;

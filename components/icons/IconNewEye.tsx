import { SVGProps } from 'react';

const IconNewEye = ({ stroke = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);

export default IconNewEye;

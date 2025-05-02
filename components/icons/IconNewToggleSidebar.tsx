import { SVGProps } from 'react';

const IconNewToggleSidebar = ({ stroke = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 21 21" {...props}>
		<g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 2)">
			<path strokeWidth={2} d="m.5.5v16.021" />
			<path strokeWidth={2} d="m18.5.5v16.021" />
			<path strokeWidth={2} d="m12.507 12.515 4-4-4-4.015" />
			<path strokeWidth={2} d="m6.507 12.515-4-4 4-4.015" />
			<path strokeWidth={2} d="m16.5 8.5h-14" />
		</g>
	</svg>
);

export default IconNewToggleSidebar;

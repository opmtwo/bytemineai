import { SVGProps } from 'react';

const IconNewProcessing = ({ stroke = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 13 16" fill="none" {...props}>
		<path
			d="M6.49994 13.3125C9.43395 13.3125 11.8124 10.934 11.8124 8C11.8124 6.23404 10.9508 4.66933 9.62494 3.70337M7.12494 14.5L5.87494 13.25L7.12494 12M6.49994 2.6875C3.56593 2.6875 1.18744 5.06599 1.18744 8C1.18744 9.76596 2.0491 11.3307 3.37494 12.2966M5.87494 4L7.12494 2.75L5.87494 1.5"
			stroke="#344054"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default IconNewProcessing;

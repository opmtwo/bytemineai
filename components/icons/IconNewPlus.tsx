import { SVGProps } from 'react';

const IconNewPlus = ({ fill = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 16 16" fill="none" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.00004 0.291992C8.57534 0.291992 9.04171 0.758362 9.04171 1.33366V14.667C9.04171 15.2423 8.57534 15.7087 8.00004 15.7087C7.42474 15.7087 6.95837 15.2423 6.95837 14.667V1.33366C6.95837 0.758362 7.42474 0.291992 8.00004 0.291992Z"
			fill={fill}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0.291687 8.00065C0.291687 7.42535 0.758057 6.95898 1.33335 6.95898H14.6667C15.242 6.95898 15.7084 7.42535 15.7084 8.00065C15.7084 8.57595 15.242 9.04232 14.6667 9.04232H1.33335C0.758057 9.04232 0.291687 8.57595 0.291687 8.00065Z"
			fill={fill}
		/>
	</svg>
);

export default IconNewPlus;

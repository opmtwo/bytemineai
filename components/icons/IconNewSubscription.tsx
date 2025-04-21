import { SVGProps } from 'react';

const IconNewSubscription = ({ stroke = '#475467', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 20 22" fill="none" {...props}>
		<path
			d="M11 1L2.09347 11.6879C1.74466 12.1064 1.57026 12.3157 1.56759 12.4925C1.56528 12.6461 1.63375 12.7923 1.75327 12.8889C1.89076 13 2.16319 13 2.70805 13H10L9.00001 21L17.9066 10.3121C18.2554 9.89358 18.4298 9.68429 18.4324 9.50754C18.4348 9.35388 18.3663 9.2077 18.2468 9.11111C18.1093 9 17.8368 9 17.292 9H10L11 1Z"
			stroke={stroke}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default IconNewSubscription;

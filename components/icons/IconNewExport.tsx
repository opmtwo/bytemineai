import { SVGProps } from 'react';

const IconNewExport = ({ stroke = 'white', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 18 18" fill="none" {...props}>
		<path
			d="M16.5 9V12.5C16.5 13.9001 16.5 14.6002 16.2275 15.135C15.9878 15.6054 15.6054 15.9878 15.135 16.2275C14.6002 16.5 13.9001 16.5 12.5 16.5H5.5C4.09987 16.5 3.3998 16.5 2.86502 16.2275C2.39462 15.9878 2.01217 15.6054 1.77248 15.135C1.5 14.6002 1.5 13.9001 1.5 12.5V9M12.3333 4.83333L9 1.5M9 1.5L5.66667 4.83333M9 1.5V11.5"
			stroke={stroke}
			strokeWidth="1.66667"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default IconNewExport;

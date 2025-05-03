import { SVGProps } from 'react';

const IconNewCsv = ({ fill = '#079455', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 32 40" fill="none" {...props}>
		<path d="M0 4C0 1.79086 1.79086 0 4 0H20L32 12V36C32 38.2091 30.2091 40 28 40H4C1.79086 40 0 38.2091 0 36V4Z" fill={fill} />
		<path opacity="0.3" d="M20 0L32 12H24C21.7909 12 20 10.2091 20 8V0Z" fill="white" />
	</svg>
);

export default IconNewCsv;

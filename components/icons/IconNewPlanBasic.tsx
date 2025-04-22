import { SVGProps } from 'react';

const IconNewPlanBasic = ({ stroke = '#1570EF', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 20 22" fill="none" {...props}>
		<path
			d="M10.7499 1L1.84332 11.6879C1.49451 12.1064 1.32011 12.3157 1.31744 12.4925C1.31512 12.6461 1.38359 12.7923 1.50312 12.8889C1.64061 13 1.91304 13 2.4579 13H9.74986L8.74986 21L17.6564 10.3121C18.0052 9.89358 18.1796 9.68429 18.1823 9.50754C18.1846 9.35388 18.1161 9.2077 17.9966 9.11111C17.8591 9 17.5867 9 17.0418 9H9.74986L10.7499 1Z"
			stroke={stroke}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default IconNewPlanBasic;

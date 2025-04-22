import { SVGProps } from 'react';

const IconNewDownload = ({ stroke = '#344054', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 16 16" fill="none" {...props}>
		<path
			d="M14.6666 14.6667H1.33325M12.4444 7.25927L7.99992 11.7037M7.99992 11.7037L3.55547 7.25927M7.99992 11.7037V1.33334"
			stroke={stroke}
			strokeWidth="1.66667"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default IconNewDownload;

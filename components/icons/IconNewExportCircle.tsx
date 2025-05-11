import { SVGProps } from 'react';

const IconNewExportCircle = ({ stroke = 'white', ...props }: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 56 56" fill="none" {...props}>
		<rect width="56" height="56" rx="28" fill="url(#paint0_linear_8102_23453)" fill-opacity="0.2" />
		<path
			d="M37.3333 30.3335V26.4332C37.3333 25.4794 37.3333 25.0025 37.1557 24.5737C36.978 24.1449 36.6409 23.8077 35.9664 23.1333L30.4405 17.6074C29.8585 17.0253 29.5675 16.7343 29.2069 16.5619C29.1319 16.526 29.0551 16.4942 28.9767 16.4665C28.5997 16.3335 28.1883 16.3335 27.3651 16.3335C23.5792 16.3335 21.6863 16.3335 20.4042 17.3672C20.1452 17.5761 19.9092 17.812 19.7004 18.071C18.6666 19.3532 18.6666 21.2461 18.6666 25.032V30.3335C18.6666 34.7332 18.6666 36.9332 20.0335 38.3C21.4003 39.6668 23.6002 39.6668 28 39.6668M29.1666 16.9168V17.5002C29.1666 20.8 29.1666 22.4499 30.1918 23.475C31.2169 24.5002 32.8668 24.5002 36.1666 24.5002H36.75"
			stroke="#1570EF"
			strokeWidth="2.33"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M33.8333 39.6665C34.5413 38.9784 37.3333 37.1469 37.3333 36.1665C37.3333 35.1862 34.5413 33.3546 33.8333 32.6665M36.1667 36.1665H28"
			stroke="#1570EF"
			strokeWidth="2.33"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<defs>
			<linearGradient id="paint0_linear_8102_23453" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
				<stop stop-color="#2E90FA" />
				<stop offset="1" stop-color="white" stop-opacity="0" />
			</linearGradient>
		</defs>
	</svg>
);

export default IconNewExportCircle;

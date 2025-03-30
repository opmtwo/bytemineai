export enum RampedUpCompanyStatuses {
	'Acquired',
	'Operating',
	'Operating Subsidiary',
	'Out of Business',
	'Reorganizing',
}

export const RampedUpCompanyStatusOptions = Object.entries(RampedUpCompanyStatuses)
	.filter((type: [string, string]) => typeof type[1] === 'string')
	.map((type: [string, string]) => ({
		value: type[1],
		label: type[1],
	}));

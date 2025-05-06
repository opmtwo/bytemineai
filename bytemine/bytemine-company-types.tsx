export enum BytemineCompanyTypes {
	'Educational',
	'Government Agency',
	'Non Profit',
	'Partnership',
	'Privately Held',
	'Public Company',
	'Self Employed',
}

export const BytemineCompanyTypeOptions = Object.entries(BytemineCompanyTypes)
	.filter((type: [string, string]) => typeof type[1] === 'string')
	.map((type: [string, string]) => ({
		value: type[1],
		label: type[1],
	}));

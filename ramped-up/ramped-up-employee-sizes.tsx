export enum RampedUpEmployeeSizes {
	'1 to 19' = '1 to 19',

	'20 to 99' = '20 to 99',
	'100 to 499' = '100 to 499',
	'500 to 999' = '500 to 999',
	'1000 to 4999' = '1000 to 4999',
	'5000+' = '5000+',
	'10000+' = '10000+',
}

export const RampedUpEmployeeSizeOptions = Object.entries(RampedUpEmployeeSizes)
	.filter((type: [string, string]) => typeof type[1] === 'string')
	.map((type: [string, string]) => ({
		value: type[1],
		label: type[0],
	}));

export enum BytemineTitleLevels {
	'Owner' = 1,
	'Partner' = 2,
	'Cxo' = 3,
	'Vp' = 4,
	'Director' = 5,
	'Manager' = 6,
	'Senior' = 7,
	'Junior' = 8,
	'Training' = 9,
	'Unpaid' = 10,
}

export const BytemineTitleLevelOptions = Object.entries(BytemineTitleLevels)
	.filter((type: [string, string]) => typeof type[1] === 'string')
	.map((type: [string, string]) => ({
		value: type[1],
		label: type[1],
	}));

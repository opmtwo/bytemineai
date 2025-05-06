export enum BytemineEmails {
	'Valid' = 6,
	'Deterministic' = 5,
	'Catch All' = 4,
	'Unknown' = 3,
	'Invalid' = 2,
	'Spam Trap' = 1,
}

export const BytemineEmailOptions = Object.entries(BytemineEmails)
	.filter((type: [string, string]) => typeof type[1] === 'string')
	.map((type: [string, string]) => ({
		value: type[1],
		label: type[1],
	}));

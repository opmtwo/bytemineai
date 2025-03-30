export enum RampedUpRevenueRanges {
	'<$1M' = '<$1M',
	'$1M to <$10M' = '$1M to <$10M',
	'$10M to <$50M' = '$10M to <$50M',
	'$50M to <$100M' = '$50M to <$100M',
	'$100M to <$1B' = '$100M to <$1B',
	'$1B+' = '$1B+',
}

export const RampedUpRevenueRangeOptions = Object.entries(RampedUpRevenueRanges)
	.filter((type: [string, string]) => typeof type[1] === 'string')
	.map((type: [string, string]) => ({
		value: type[1],
		label: type[0],
	}));


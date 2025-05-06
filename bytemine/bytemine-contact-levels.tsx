export enum BytemineContactLevels {
    'owner' = 'Owner',
    'partner' = 'Partner',
    'C-Team' = 'C-Team',
    'vp' = 'VP',
    'director' = 'Director',
    'manager' = 'Manager',
    'senior' = 'Senior',
    'junior' = 'Junior',
    'training' = 'Training',
    'unpaid' = 'Unpaid',
    'Consultant' = 'Consultant',
    'Staff' = 'Staff',
    'Entry' = 'Entry',
}

export const BytemineContactLevelOptions = Object.entries(BytemineContactLevels)
	.filter((type: [string, string]) => typeof type[0] === 'string')
	.map((type: [string, string]) => ({
		value: type[0],
		label: type[1],
	}));

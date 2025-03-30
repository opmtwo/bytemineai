export enum RampedUpJobFunctions {
	'Education' = 'Education',
'Information Technology'='Information Technology',
'Legal'='Legal',
'Real Estate'='Real Estate',
'Human Resources'='Human Resources',
'Media'='Media',
'Risk, Safety, Compliance'='Risk, Safety, Compliance',
'Publishing, Editorial and Reporting'='Publishing, Editorial and Reporting',
'Customer Service'='Customer Service',
'Sales and Support'='Sales and Support',
'Banking and Wealth Management'='Banking and Wealth Management',
'Design'='Design',
'Trades'='Trades',
'Quality'='Quality',
'Engineering'='Engineering',
'Marketing and Product'='Marketing and Product',
'Business Management'='Business Management',
'Healthcare'='Healthcare',
'Consulting'='Consulting',
'Public Relations'='Public Relations',
'Operations'='Operations',
'Finance and Administration'='Finance and Administration',
'Program and Project Management'='Program and Project Management'

}

export const RampedUpJobFunctionOptions = Object.entries(RampedUpJobFunctions)
	.filter((type: [string, string]) => typeof type[1] === 'string')
	.map((type: [string, string]) => ({
		value: type[0],
		label: type[1],
	}));

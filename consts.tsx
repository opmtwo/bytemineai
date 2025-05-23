import { sentenceCase } from 'change-case';

import { SortData, SortOrder } from './types';
import { countryCodes } from './codes';

export const ITEMS_PER_PAGE = 10;

export const TRIAL_CREDITS = 5;

export const MAXIMUM_CONTACTS_TO_UNLOCK = 50;

export const BATCH_SIZE = 50;

export const GOOGLE_MAP_API_KEY = 'AIzaSyAdsjcqYLRt0mHkG7_K5132233x2YhxEvw';

export const keysToExport = [
	'first_name',
	'last_name',
	'middle_name',
	'full_name',
	'job_title',
	'seniority',
	'department',
	'primary_role',
	'secondary_role',
	'linkedin_profile',
	'linkedin_connection_count',
	'work_email',
	'work_email_history',
	'personal_email',
	'personal_email2',
	'personal_email_history',
	'direct_dial',
	'mobile_number',
	'mobile_number_history',
	'work_number',
	'education',
	'skills',
	'interests',
	'linkedin_headline',
	'facebook_profile',
	'twitter_profile',
	'work_experience',
	'salary',
	'birth_year',
	'age',
	'gender',
	'new_hire',
	'job_start_date',
	'company_name',
	'company_domain',
	'company_website',
	'company_linkedin_profile',
	'company_linkedin_followers',
	'company_local_address',
	'company_local_city',
	'company_local_state',
	'company_local_address_postal',
	'company_hq_address',
	'company_hq_city',
	'company_hq_state',
	'company_hq_postal',
	'person_city',
	'person_state',
	'person_postal',
	'company_employee_range',
	'company_revenue_range',
	'company_industry',
	'company_sic4',
	'company_sic4_description',
	'company_naics',
	'company_naics_description',
	'company_type',
];

// export const exportLabels = {
// 	contactLinkedinConnectionCount: 'Contact Connections',
// 	companyPrimaryIndustry: 'Company industry',
// 	companyLinkedinFollowers: 'Company followers',
// };

export const exportLabels = {};

export const keysToExportMap: SortData[] = keysToExport.map((value) => ({
	id: value,
	content: sentenceCase(value),
	sortOrder: SortOrder.none,
	order: undefined,
}));

export const genericErrorMessage = 'Something went wrong, please try again.';

/**
 * @see
 * https://docs.atdata.com/?javascript#lists-of-values
 */
export const atDataResponseCodes = {
	'5': { status: 'unknown', code: 5, description: `Timeout. Did not get a response in time` },
	'10': { status: 'unknown', code: 10, description: `Syntax OK` },
	'20': { status: 'unknown', code: 20, description: `Syntax OK and the domain is valid` },
	'45': { status: 'unverifiable', code: 45, description: `Domain is a catch all and does not support validation` },
	'50': { status: 'valid', code: 50, description: `Valid email address` },
	'100': { status: 'invalid', code: 100, description: `General syntax error` },
	'110': { status: 'invalid', code: 110, description: `Invalid character in address` },
	'115': { status: 'invalid', code: 115, description: `Invalid domain syntax` },
	'120': { status: 'invalid', code: 120, description: `Invalid username syntax` },
	'125': { status: 'invalid', code: 125, description: `Invalid username syntax for that domain` },
	'130': { status: 'invalid', code: 130, description: `Address is too long` },
	'135': { status: 'invalid', code: 135, description: `Address has unbalanced parentheses` },
	'140': { status: 'invalid', code: 140, description: `Address doesn’t have a username` },
	'145': { status: 'invalid', code: 145, description: `Address doesn’t have a domain` },
	'150': { status: 'invalid', code: 150, description: `Address doesn’t have an @ sign` },
	'155': { status: 'invalid', code: 155, description: `Address has more than one @ sign` },
	'200': { status: 'invalid', code: 200, description: `Invalid top-level domain (TLD) in address` },
	'205': { status: 'invalid', code: 205, description: `IP address is not allowed as a domain` },
	'210': { status: 'invalid', code: 210, description: `Address contains an extra space or character` },
	'215': { status: 'invalid', code: 215, description: `Unquoted spaces not allowed in email addresses` },
	'310': { status: 'invalid', code: 310, description: `Domain doesn’t exist` },
	'315': { status: 'invalid', code: 315, description: `Domain doesn’t have a valid IP address` },
	'325': { status: 'invalid', code: 325, description: `Domain can’t receive email` },
	'400': { status: 'invalid', code: 400, description: `Mailbox doesn't exist` },
	'410': { status: 'invalid', code: 410, description: `The mailbox is full and can’t receive email` },
	'420': { status: 'invalid', code: 420, description: `Mail isn't accepted for this domain` },
	'500': { status: 'invalid', code: 500, description: `Emails with that username aren’t accepted` },
	'505': { status: 'invalid', code: 505, description: `Emails with that domain aren’t accepted` },
	'510': { status: 'invalid', code: 510, description: `That address isn’t accepted` },
	'520': { status: 'invalid', code: 520, description: `Address matched to known bouncers (optional feature)` },
	'525': { status: 'risky', code: 525, description: `Address is a spamtrap, a known complainer or is suppressed` },
	'530': { status: 'risky', code: 530, description: `Address has opted out from commercial email` },
	'999': { status: 'unknown', code: 999, description: `System error` },
};

// export const atDataValidEmailCodes = [50,55];
//export const atDataValidEmailCodes = [5];
export const atDataValidEmailCodes = [50];

// export const atDataCatchAllEmailCodes = [45, 50];
//export const atDataCatchAllEmailCodes = [4];
export const atDataCatchAllEmailCodes = [10, 20, 45, 50];

export const keysToExportContactPerson = [
	'contactFirstName',
	'contactMiddleName',
	'contactLastName',
	'companyStartDate',
	'companyEndDate',
	'contactTitle',
	'contactTitleLevel',
	'contactJobFunctions',
	'contactEmail',
	'contactPersonalEmail',
	'historicalEmails',
	'directDialPhone',
	'contactCity',
	'contactState',
	'contactZipCode',
	'contactSkills',
	'contactLinkedinURL',
	'contactEducation',
	'contactLinkedinConnectionCount',
	'hasChangedJobRecently',
	'companyName',
	'companyAddressLine1',
	'companyAddressLine2',
	'companyCity',
	'companyRegion',
	'companyZipCode',
	'companyLinkedinURL',
	'companyDomain',
	'companyPhone',
	'companyemployeeSizeRange',
	'companyRevenueRange',
	'companyPrimaryIndustry',
	'companySIC',
	'companyLinkedinFollowers',
	'companyNAICSCode',
	'contactid',

	'formerTitles',
	'formerCompanies',
];

export const exportContactPersonLabels = {
	contactLinkedinConnectionCount: 'Contact Connections',
	companyPrimaryIndustry: 'Company industry',
	companyLinkedinFollowers: 'Company followers',
};

export const keysToExportContactCompany = [
	'id',
	'alternateNames',
	'alternateEmailDomains',
	'annualSalesGrowth',
	'bbbRatingOrLicense',
	'companyStatus',
	'companyType',
	'corpFamilySize',
	'crunchbaseUrl',
	'description',
	'domain',
	'email',
	'emailDomain',
	'employeeRange',
	'employees',
	'hierarchyType',
	'eps',
	'exchange',
	'facebookUrl',
	'fax',
	'founded',
	'fye',
	'industry',
	'ipoYear',
	'legalName',
	'linkedInCompanyId',
	'linkedInFollowers',
	'linkedInIdNumber',
	'linkedInIdUrl',
	'linkedInUrl',
	'marketCap',
	'naicsCode',
	'naicsDesc',
	'naicsGroupCode',
	'naicsGroupDesc',
	'name',
	'otherPhones',
	'otherWebsites',
	'ownershipStatus',
	'paymentTypes',
	'phone',
	'phoneTollFree',
	'profiles',
	'regularHours',
	'revenue',
	'revenueRange',
	'sicCodes.0.sicCode2',
	'sicCodes.0.sicCode2Desc',
	'sicCodes.0.sicCode3',
	'sicCodes.0.sicCode3Desc',
	'sicCodes.0.sicCode4',
	'sicCodes.0.sicCode4Desc',
	'sicCodes.0.sicCode6',
	'sicCodes.0.sicCode6Desc',
	'specialties',
	'status',
	'ticker',
	'twitterUrl',
	'website',
	'yelpUrl',
	'location.locality',
	'location.metro',
	'location.majorMetroCity',
	'location.majorMetroState',
	'location.region',
	'location.regionCode',
	'location.subRegion',
	'location.country',
	'location.countryISO2',
	'location.continent',
	'location.geo',
	'location.zipPlus4',
	'location.streetAddress',
	'location.addressLine2',
	'location.latitude',
	'location.longitude',
	'location.postalCode',
	'locality',
	'metro',
	'majorMetroCity',
	'majorMetroState',
	'region',
	'regionCode',
	'subRegion',
	'country',
	'countryISO2',
	'continent',
	'geo',
	'zipPlus4',
	'streetAddress',
	'addressLine2',
	'latitude',
	'longitude',
	'postalCode',
	'technologies',
];

export const exportContactCompanyLabels = {
	industry: 'Company industry',
	linkedInFollowers: 'Company followers',
	'sicCodes.0.sicCode2': 'SIC Code 2',
	'sicCodes.0.sicCode2Desc': 'SIC Code 2 Description',
	'sicCodes.0.sicCode3': 'SIC Code 3',
	'sicCodes.0.sicCode3Desc': 'SIC Code 3 Description',
	'sicCodes.0.sicCode4': 'SIC Code 4',
	'sicCodes.0.sicCode4Desc': 'SIC Code 4 Description',
	'sicCodes.0.sicCode6': 'SIC Code 6',
	'sicCodes.0.sicCode6Desc': 'SIC Code 6 Description',
	'location.locality': 'Locality',
	'location.metro': 'Metro',
	'location.majorMetroCity': 'Major metro city',
	'location.majorMetroState': 'Major metro state',
	'location.region': 'Region',
	'location.regionCode': 'Region code',
	'location.subRegion': 'Sub region',
	'location.country': 'Country',
	'location.countryISO2': 'Country ISO 2',
	'location.continent': 'Continent',
	'location.geo': 'Geo',
	'location.zipPlus4': 'Zip plus 4',
	'location.streetAddress': 'Street address',
	'location.addressLine2': 'Address line 2',
	'location.latitude': 'Latitude',
	'location.longitude': 'Longitude',
	'location.postalCode': 'Postal code',
};

export const MONTHLY_PRICE_ID = 'price_1RNoLNLgUrD1kX4RjzqrCGS8';

export const YEARLY_PRICE_ID = 'price_1RNoLNLgUrD1kX4Rocv6WXIN';

export const PLAN_STARTER_MONTHLY = 'price_1RP5LUDsM2Cd0g4ebEsp66r6';

export const PLAN_STARTER_YEARLY = 'price_1RP5LUDsM2Cd0g4ePWqXnWQ3';

export const PLAN_GROWTH_MONTHLY = 'price_1RP5LUDsM2Cd0g4eItv1ahpI';

export const PLAN_GROWTH_YEARLY = 'price_1RP5LUDsM2Cd0g4eAY4rwsOF';

export const PLAN_PRO_MONTHLY = 'price_1RP5LUDsM2Cd0g4eEI0CbhUZ';

export const PLAN_PRO_YEARLY = 'price_1RP5LUDsM2Cd0g4eG9yFwBNQ';

export const PLAN_BUSINESS_MONTHLY = 'price_1RP5LUDsM2Cd0g4eEUzamNdQ';

export const PLAN_BUSINESS_YEARLY = 'price_1RP5LUDsM2Cd0g4eQL14r4I2';

export const PLAN_ENTERPRISE_MONTHLY = 'price_1RP5LUDsM2Cd0g4eYMocuEBF';

export const PLAN_ENTERPRISE_YEARLY = 'price_1RP5LUDsM2Cd0g4eVwbp22Gi';

export const planOptions = [
	{
		id: 'PLAN_STARTER_MONTHLY',
		interval: 'monthly',
		price: 50,
		credits: 1000,
		priceId: PLAN_STARTER_MONTHLY,
		label: '50$ - 1000 Credits',
		name: 'Monthly Plan',
	},
	{
		id: 'PLAN_STARTER_YEARLY',
		interval: 'yearly',
		price: 480,
		credits: 12000,
		priceId: PLAN_STARTER_YEARLY,
		label: '480$ - 12000 Credits',
		name: 'Yearly Plan',
	},
	{
		id: 'PLAN_GROWTH_MONTHLY',
		interval: 'monthly',
		price: 100,
		credits: 2500,
		priceId: PLAN_GROWTH_MONTHLY,
		label: '100$ - 2500 Credits',
		name: 'Monthly Plan',
	},
	{
		id: 'PLAN_GROWTH_YEARLY',
		interval: 'yearly',
		price: 960,
		credits: 30000,
		priceId: PLAN_GROWTH_YEARLY,
		label: '960$ - 30000 Credits',
		name: 'Yearly Plan',
	},
	{
		id: 'PLAN_PRO_MONTHLY', //
		interval: 'monthly',
		price: 250,
		credits: 7500,
		priceId: PLAN_PRO_MONTHLY,
		label: '250$ - 7500 Credits',
		name: 'Monthly Plan',
	},
	{
		id: 'PLAN_PRO_YEARLY', //
		interval: 'yearly',
		price: 2400,
		credits: 90000,
		priceId: PLAN_PRO_YEARLY,
		label: '2400$ - 90000 Credits',
		name: 'Yearly Plan',
	},
	{
		id: 'PLAN_BUSINESS_MONTHLY',
		interval: 'monthly',
		price: 500,
		credits: 20000,
		priceId: PLAN_BUSINESS_MONTHLY,
		label: '500$ - 20000 Credits',
		name: 'Monthly Plan',
	},
	{
		id: 'PLAN_BUSINESS_YEARLY',
		interval: 'yearly',
		price: 4800,
		credits: 240000,
		priceId: PLAN_BUSINESS_YEARLY,
		label: '4800$ - 240000 Credits',
		name: 'Yearly Plan',
	},
	{
		id: 'PLAN_ENTERPRISE_MONTHLY',
		interval: 'monthly',
		price: 1000,
		credits: 50000,
		priceId: PLAN_ENTERPRISE_MONTHLY,
		label: '1000$ - 50000 Credits',
		name: 'Monthly Plan',
	},
	{
		id: 'PLAN_ENTERPRISE_YEARLY',
		interval: 'yearly',
		price: 9600,
		credits: 600000,
		priceId: PLAN_ENTERPRISE_YEARLY,
		label: '9600$ - 600000 Credits',
		name: 'Yearly Plan',
	},
];

export const countryCodeOptions = countryCodes.map((_code) => ({
	id: _code.dial_code,
	name: `${_code.dial_code} ${_code.code} ${_code.name}`,
}));

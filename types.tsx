import { AuthUser, FetchUserAttributesOutput } from '@aws-amplify/auth';
import { ReactNode } from 'react';

/*
 * Custom attributes type defined according to the attributes used in this app
 */
export interface UserAttributes {
	sub: string;
	email: string;
	email_verified: string;
	name: string;
	family_name: string;
	given_name: string;
	phone_number: string;
	profile: string;
	'custom:role': string;
	'custom:country': string;
	'custom:profile_pic'?: string;
	'custom:created_at'?: string;
	'custom:last_login_at'?: string;
	'custom:group_name': string;
	'custom:account_type': string;
	'custom:renewal_period': string;
	'custom:renewal_date': string;
	'custom:credits': string;
	'custom:bonus_credits': string;
	'custom:monthly_credits': string;
	'custom:yearly_credits': string;
	'custom:seats': string;
	'custom:color_code': string;
	'custom:logo_s3_key': string;
	'custom:logo_s3_url'?: string;
	'custom:icon_s3_key': string;
	'custom:icon_s3_url'?: string;
	'custom:connect_email_code'?: string;
	'custom:connect_email_token'?: string;
	'custom:has_api'?: boolean;
	'custom:has_email'?: boolean;
	'custom:verificationdate'?: string;
	'custom:veriflastsent'?: string;
	'custom:company'?: string;
	'custom:temp_code'?: string;

	'custom:lastaudiencesample'?: string;
}

export enum Roles {
	'Admin' = 'Admin',
	'Manager' = 'Manager',
	'Editor' = 'Editor',
	'Viewer' = 'Viewer',
}

export const roleOptions = Object.entries(Roles).filter((value) => value[0] !== 'Admin').map((type: [string, string]) => ({ id: type[0], name: type[1] }));

export enum AccountType {
	'ActiveCustomer' = 'Active Customer',
	'Trial' = 'Trial',
}

export const accountTypeOptions = Object.entries(AccountType).map((type: [string, string]) => ({
	id: type[0],
	name: type[1],
}));

export enum RenewalPeriod {
	'Monthly' = 'Monthly',
	'Yearly' = 'Yearly',
}

export const renewalPeriodOptions = Object.entries(RenewalPeriod).map((type: [string, string]) => ({
	id: type[0],
	name: type[1],
}));

/*
 * The following interface extends the CognitoUser type because it has issues
 * (see github.com/aws-amplify/amplify-js/issues/4927). Eventually (when you
 * no longer get an error accessing a CognitoUser's 'attribute' property) you
 * will be able to use the CognitoUser type instead of CognitoUserExt.
 */
export interface CognitoUserExt extends AuthUser {
	attributes: UserAttributes;
}

export interface AuthContextInterface {
	user?: CognitoUserExt;
	attributes?: FetchUserAttributesOutput;
	authError?: Error;
	isAuthBusy: boolean;
	isRoot: boolean;
	isAdmin: boolean;
	isManager: boolean;
	isExpired: () => boolean;
	onSignIn: Function;
	onSignOut: Function;
	updateAttributes: Function;
}

export interface CognitoUserDataAttribute {
	Name:
		| 'sub'
		| 'name'
		| 'phone_number'
		| 'email'
		| 'email_verified'
		| 'given_name'
		| 'family_name'
		| 'profile'
		| 'custom:role'
		| 'custom:country'
		| 'custom:group_name'
		| 'custom:profile_pic'
		| 'custom:created_at'
		| 'custom:last_login_at'
		| 'custom:account_type'
		| 'custom:renewal_period'
		| 'custom:credits'
		| 'custom:bonus_credits'
		| 'custom:seats'
		| 'custom:color_code'
		| 'custom:logo_s3_key'
		| 'custom:logo_s3_url'
		| 'custom:icon_s3_key'
		| 'custom:icon_s3_url'
		| 'custom:connect_email_code'
		| 'custom:connect_email_token'
		| 'custom:temp_code'
		| 'custom:has_api'
		| 'custom:has_email';
	Value: string;
}

export interface CognitoUserData {
	Username: string;
	UserCreateDate: string;
	UserLastModifiedDate: string;
	Enabled: boolean;
	UserStatus: string;
	Attributes: CognitoUserDataAttribute[];
}

export type List = {
	id: string;
	name: string;
	tenants: string[];
	createdAt: string;
	updatedAt: string;
	owner: string;
};

export type Audience = {
	id: string;
	name: string;
	tenants: string[];
	createdAt: string;
	updatedAt: string;
	owner: string;
	expectedCount: string;
	currentStatus: string;
	filePath: string;
};

export type ContactForm = {
	id: string;
	name: string;
	tenants: string[];
	firstName: string;
	lastName: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
};

export type Contact = {
	id: string;
	userId?: string;
	groupId: string;
	tenants: string[];
	isUnlocked?: boolean;
	isUnlocking?: boolean;
	createdAt?: string;
	updatedAt?: string;
	isSelected?: boolean;

	isEmailVerified: boolean;
	contactEmailStatusCode: string;
	contactEmailDomainType: string;
	personalEmailStatusCode: string;
	personalEmailDomainType: string;
	contactPersonalEmailStatusCode: string;
	contactPersonalEmailDomainType: string;

	ruid: string;
	emailStatus?: string | null;
	contactFirstName?: string | null;
	contactMiddleName?: string | null;
	contactLastName?: string | null;
	contactFullName?: string | null;
	companyName?: string | null;
	companyStartDate?: string | null;
	companyEndDate?: string | null;
	contactTitle?: string | null;
	contactTitleLevel?: string | null;
	contactJobFunctions?: string | null;
	contactEmail?: string | null;
	contactPersonalEmail?: string | null;
	historicalEmails?: string[] | null;
	directDialPhone?: string | null;
	directDialType?: string | null;
	contactLocation?: string | null;
	contactCity?: string | null;
	contactState?: string | null;
	contactCountry?: string | null;
	contactContinent?: string | null;
	contactSkills?: string[] | null;
	contactLinkedinURL?: string | null;
	contactFacebook?: string | null;
	contactTwitterURL?: string | null;
	contactEducation?: string | null;
	contactBirthDate?: string | null;
	contactGender?: string | null;
	contactPhone?: string | null;
	contactOfficeCity?: string | null;
	contactOfficeAddress?: string | null;
	contactOfficeState?: string | null;
	contactOfficeCountry?: string | null;
	contactOfficeZipCode?: string | null;
	lastUpdatedDate?: string | null;
	contactLinkedinConnectionCount?: string | null;
	hasChangedJobRecently?: Boolean | null;
	companyId?: number | null;
	companyLinkedinURL?: string | null;
	companyDomain?: string | null;
	companyAddressLine1?: string | null;
	companyAddressLine2?: string | null;
	companyCity?: string | null;
	companyRegion?: string | null;
	companyCountry?: string | null;
	companyZipCode?: string | null;
	companyPhone?: string | null;
	companyEmployees?: string | null;
	companyRevenueRange?: string | null;
	companySpecialties?: string[] | null;
	companyPrimaryIndustry?: string | null;
	companySIC?: string | null;
	companyType?: string | null;
	companyStatus?: string | null;
	companyFoundedYear?: string | number | null;
	companyLinkedinFollowers?: string | null;
	companyNAICSCode?: string | null;
	companySICCode6?: string | null;
	formerTitles?: string[] | null;
	formerCompanies?: string[] | null;
	personalEmail?: string | null;
	hasContactPhone?: boolean | null;
	hasPersonalEmail?: boolean | null;
	hasContactEmail?: boolean | null;
	hasDirectDial?: boolean | null;
	hasLocalAddress?: boolean | null;
	hasCompanyPhone?: boolean | null;
};

export type DomainSearch = {
	id: string;
	term: string;
	tenants: string[];
	createdAt: string;
	updatedAt: string;
};

export enum EnrichType {
	All = 'All',
	Email = 'Email',
	Phone = 'Phone',
	Company = 'Company',
	LinkedIn = 'LinkedIn',
}

export type EnrichSearchObj = {
	id: string;
	type: EnrichType;
	term: string;
	tenants: string[];
	createdAt: string;
	updatedAt: string;
};

export interface SettingsContextInterface {
	id: string;
	term: string;
	tenants: string[];
	colorCode: string;
	logoS3Key: string;
	createdAt: string;
	updatedAt: string;
}

export enum ActionExport {
	'All' = 'Export All',
	'CurrentPage' = 'Export Current Page',
	'Selected' = 'Export Selected',
}

export enum ActionAddToList {
	'All' = 'Add All to List',
	'CurrentPage' = 'Add Current Page to List',
	'Selected' = 'Add Selected to List',
}

export enum ActionList {
	'All' = 'All',
	'CurrentPage' = 'Current Page',
	'Selected' = 'Selected',
}

export enum ActionUnlock {
	'All' = 'Unlock All',
	'CurrentPage' = 'Unlock Current Page',
	'Selected' = 'Unlock Selected',
}

export enum ActionSelect {
	'SelectAll' = 'Select All',
	'SelectCurrentPage' = 'Select Current Page',
	'ToggleCurrentPage' = 'Toggle Current Page',
}

export enum ActionApiGateway {
	'GetAccount' = 'Get Account',
	'SearchContacts' = 'SearchContacts',
}

export interface SelectOption {
	value: string;
	label: string;
	isFixed?: boolean;
	included?: boolean;
	excluded?: boolean;
}

export interface RampedUpFilter {
	website?: string;
	firstName?: SelectOption[];
	lastName?: SelectOption[];
	yearFounded?: string;
	keywords?: SelectOption[];
	urls?: SelectOption[];
	industries?: SelectOption[];
	jobTitles?: SelectOption[];
	sicCodes?: SelectOption[];
	companyNames?: SelectOption[];
	employeeSizes?: SelectOption[];
	departments?: SelectOption[];
	interests?: SelectOption[];
	skills?: SelectOption[];

	schools?: SelectOption[];
	seniorityLevels?: SelectOption[];
	companyRevenues?: SelectOption[];
	hqLocations?: SelectOption[];
	cities?: SelectOption[];
	states?: SelectOption[];
	companyTypes?: SelectOption[];
	urlsToSuppress?: SelectOption[];
	titlesToSuppress?: SelectOption[];
	emailsToSuppress?: SelectOption[];
	hasChangedJobRecently?: boolean;
	hasPrimaryContactsOnly?: boolean;
	hasPhone?: boolean;
	hasDirectDialOnly?: boolean;
	hasRequiredEmail?: boolean;
	hasPersonalEmailOnly?: boolean;
	hasLocalAddress?: boolean;
	hasValidateEmails?: boolean;
	excludeExisting?: boolean;
	page?: number;
}

export interface FilterModel {
	id: string;
	name: string;
	userId: string;
	groupId: string;
	tenants: string[];
	rampedUpFilter: RampedUpFilter;
	savedFilter: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CampaignModel {
	id: string;
	name: string;
	userId: string;
	groupId: string;
	tenants: string[];
	rampedUpFilter: RampedUpFilter;
	createdAt: string;
	updatedAt: string;
	savedFilter: boolean;
	expectedCount: string;
	currentCount: string;
	currentStatus: string;
	esFilter: RampedUpFilter;
	startedAt: string;
	owner: string;
}

export interface UsageModel {
	id: string;
	userId: string;
	groupId: string;
	tenants: string[];
	filterId: string;
	createdAt: string;
	updatedAt: string;
}

export interface AccountInfo {
	attributes: UserAttributes;
	account: CognitoUserData;
	isExpired: boolean;
	totalCredits: number;
	totalUsage: number;
	totalSearches: number;
}

export interface TabOption {
	id: string;
	value: string;
}

export interface ListContactModel {
	id: string;
	listId: string;
	contactId: string;
	userId: string;
	groupId: string;
	tenants: string[];
	contact?: Contact;
	createdAt: string;
	updatedAt: string;
}

export interface NylasEmailAccount {
	id: string;
	email_address: string;
	linked_at: number;
}

export interface EmailAccountModel {
	id: string;
	userId: string;
	groupId: string;
	tenants: string[];
	email: string;
	code: string;
	token: string;
	createdAt: string;
	updatedAt: string;
}

export interface AuditLogModel {
	id: string;
	userId: string;
	groupId: string;
	tenants: string;
	title: string;
	description: string;
	data: string;
	createdAt: string;
	updatedAt: string;
}

export enum SortOrder {
	'none',
	'asc',
	'desc',
}

export interface SortData {
	id: string;
	content: string;
	sortOrder?: SortOrder;
}

export interface ContactCompany {
	id: string;
	alternateNames: string[];
	alternateEmailDomains: string;
	annualSalesGrowth: string;
	bbbRatingOrLicense: string;
	companyStatus: string;
	companyType: string;
	corpFamilySize: string;
	crunchbaseUrl: string;
	description: string;
	domain: string;
	email: string;
	emailDomain: string;
	employeeRange: string;
	employees: string;
	hierarchyType: string;
	eps: string;
	exchange: string;
	facebookUrl: string;
	fax: string;
	founded: string;
	fye: string;
	industry: string;
	ipoYear: string;
	legalName: string;
	linkedInCompanyId: string;
	linkedInFollowers: string;
	linkedInIdNumber: string;
	linkedInIdUrl: string;
	linkedInUrl: string;
	marketCap: string;
	naicsCode: string;
	naicsDesc: string;
	naicsGroupCode: string;
	naicsGroupDesc: string;
	name: string;
	otherPhones: string[];
	otherWebsites: string[];
	ownershipStatus: string;
	paymentTypes: string[];
	phone: string;
	phoneTollFree: string;
	profiles: string[];
	regularHours: string;
	revenue: string;
	revenueRange: string;
	sicCodes: SicCode[];
	specialties: string[];
	status: string;
	ticker: string;
	twitterUrl: string;
	website: string;
	yelpUrl: string;
	location: Location;
	locality: string;
	metro: string;
	majorMetroCity: string;
	majorMetroState: string;
	region: string;
	regionCode: string;
	subRegion: string;
	country: string;
	countryISO2: string;
	continent: string;
	geo: string;
	zipPlus4: string;
	streetAddress: string;
	addressLine2: string;
	latitude: string;
	longitude: string;
	postalCode: string;
	technologies: Technology[];
}

export interface SicCode {
	sicCode2: string;
	sicCode2Desc: string;
	sicCode3: string;
	sicCode3Desc: string;
	sicCode4: string;
	sicCode4Desc: string;
	sicCode6: string;
	sicCode6Desc: string;
}

export interface Location {
	locality?: string;
	metro?: string;
	majorMetroCity?: string;
	majorMetroState?: string;
	region?: string;
	regionCode?: string;
	subRegion?: string;
	country?: string;
	countryISO2?: string;
	continent?: string;
	geo?: string;
	zipPlus4?: string;
	streetAddress?: string;
	addressLine2?: string;
	latitude?: string;
	longitude?: string;
	postalCode?: string;
}

export interface Technology {
	title: string;
	domain: string;
}

export interface Experience {
	title: string;
	company: string;
	startDate: string;
	endDate: string;
}

export interface Education {
	schoolName: string;
	startDate: string;
	endDate: string;
	degrees: string[];
}

export interface ContactPerson {
	nymblr_id: string;
	contactFirstName: string;
	contactMiddleName: string;
	contactLastName: string;
	contactFullName: string;
	companyStartDate: string;
	companyEndDate: string;
	contactTitle: string;
	contactTitleLevel: string[];
	contactJobFunctions: string;
	contactEmail: string;
	contactProfessionalEmailIsDeterministic: string;
	contactProfessionalEmailValidationStatus: string;
	contactProfessionalEmailValidationStatusDate: string;
	contactProfessionalEmailValidationWebSource: string;
	contactPersonalEmail: string;
	contactHistoricalEmails: string[];
	contactPersonalCity: string;
	contactPersonalRegion: string;
	contactPersonalRegionCode: string;
	contactPersonalCountry: string;
	contactPersonalContinent: string;
	contactSkills: string[];
	contactHeadline: string;
	contactLinkedinUrl: string;
	contactEducation: Education[];
	contactExperience: Experience[];
	contactIsPrimary: string;
	contactLastUpdated: string;
	contactLinkedinConnectionCount: string;
	contactRecentJobChange: string;
	companyName: string;
	companyHqAddress: string;
	companyHqAddress2: string;
	companyHqCity: string;
	companyHqRegion: string;
	companyHqRegionCode: string;
	companyHqPostalCode: string;
	companyHqCountry: string;
	companyLinkedinUrl: string;
	companyDomain: string;
	companyHqPhone: string;
	companyemployeeSizeRange: string;
	companyEmployees: string;
	companyRevenue: string;
	companyRevenueRange: string;
	companyPrimaryIndustry: string;
	companySicCode4: string;
	companyLinkedinFollowers: string;
	companyNaicsCode6: string;
	matchedTo: string;
	confidenceScore: string;
	contactValidation: string;
	contactId: string;
	companyHqId: string;
	companyLocalOfficeId: string;
	directDialPhone: string;
	directDialType: string;
	contactLocation: string;
	contactCity: string;
	contactState: string;
	contactZipCode: string;
	contactCountry: string;
	contactContinent: string;
	contactLinkedinURL: string;
	contactFacebook: string;
	contactTwitterURL: string;
	contactBirthDate: string;
	contactGender: string;
	contactPhone: string;
	contactOfficeCity: string;
	contactOfficeAddress: string;
	contactOfficeState: string;
	contactOfficeCountry: string;
	contactOfficeZipCode: string;
	hasChangedJobRecently: string;
	companyId: string;
	companyLinkedinURL: string;
	companyAddressLine1: string;
	companyAddressLine2: string;
	companyCity: string;
	companyRegion: string;
	companyCountry: string;
	companyZipCode: string;
	companyPhone: string;
	companySpecialties: string;
	companySIC: string;
	companyType: string;
	companyStatus: string;
	companyFoundedYear: string;
	companyNAICSCode: string;
	companySICCode6: string;
	formerTitles: string;
	formerCompanies: string;
	personalEmail: string;
	contactid: string;
}

export interface Upload {
	key: string;
	name: string;
	size: number;
	createdAt: number;
}

export interface Enrichment {
	id: string;
	userId: string;
	groupId: string;
	tenants: string[];
	s3Key: string;
	s3KeyOutput: string;
	name: string;
	size: number;
	recordsUploaded: number;
	recordsEnriched: number;
	recordsProcessed: number;
	isCompleted: boolean;
	keyEmail: string;
	keyPhone: string;
	keyLinkedin: string;
	status: string;
	createdAt: string;
	updatedAt: string;
}

export interface FilterItem {
	id: string;
	userId: string;
	groupId: string;
	tenants: string[];
	filterId: string;
	filename: string;
	key: string;
	val: string;
	createdAt: string;
	updatedAt: string;
}

export interface IBytemineContact {
	id: string;
	linkedin_url: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	full_name: string;
	job_title: string;
	seniority: string;
	department: string;
	primary_role: string;
	secondary_role: string;
	linkedin_profile: string;
	linkedin_connection_count: number;
	work_email: string;
	work_email_history: {
		work_email: string;
		yyyyqq: string;
	}[];
	personal_email: string;
	personal_email2: string;
	personal_email_history: {
		personal_email: string;
		yyyyqq: string;
	}[];
	direct_dial: string;
	mobile_number: string;
	mobile_number_history: {
		phone_mobile: string;
		yyyyqq: string;
	}[];
	work_number: string;
	education: {
		school: string;
		start_date: string;
		end_date: string;
		degrees: string;
	}[];
	skills: string[];
	interests: string;
	linkedin_headline: string;
	facebook_profile: string;
	twitter_profile: string;
	work_experience: {
		title: string;
		start_date: string; // ISO date string
		end_date: string;
		company: string;
	}[];
	salary: string;
	birth_year: number;
	age: number;
	gender: string;
	new_hire: boolean;
	job_start_date: string; // ISO date string
	company_name: string;
	company_domain: string;
	company_website: string;
	company_linkedin_profile: string;
	company_linkedin_followers: number;
	company_local_address: string;
	company_local_city: string;
	company_local_state: string;
	company_local_address_postal: string;
	company_hq_address: string;
	company_hq_city: string;
	company_hq_state: string;
	company_hq_postal: string;
	person_city: string;
	person_state: string;
	person_postal: string;
	company_employee_range: string;
	company_revenue_range: string;
	company_industry: string;
	company_sic4: string;
	company_sic4_description: string;
	company_naics: string;
	company_naics_description: string;
	company_type: string;
}

export interface IContactPersonalEmailEntry {
	personal_email: string;
	yyyyqq: string;
}

export interface IContactPhoneMobileEntry {
	phone_mobile: string;
	yyyyqq: string;
}

export interface IContactEducationEntry {
	school: string;
	start_date: string;
	end_date: string;
	degrees: string[];
}

export interface IContactWorkExperienceEntry {
	title: string;
	start_date: string;
	end_date: string;
	company: string;
}

export interface IContact {
	pid: number;
	first_name: string;
	last_name: string;
	middle_name: string;
	full_name: string;
	job_title: string;
	job_level: string;
	job_function: string;
	enhanced_job_function: string;
	job_sub_function: string;
	linkedin_url: string;
	linkedin_connection_count: number;
	work_email: string;
	work_email_dispo: string;
	work_email_array: string;
	email_domain: string;
	personal_email: string;
	personal_email_2: string;
	personal_email_array: IContactPersonalEmailEntry[];
	phone_1_dd: string;
	phone_mobile: string;
	phone_mobile_array: IContactPhoneMobileEntry[];
	phone_2_org: string;
	education: IContactEducationEntry[];
	skills: string[];
	interests: string;
	linkedin_headline: string;
	facebook_url: string;
	twitter_url: string;
	work_experience: IContactWorkExperienceEntry[];
	compensation: string;
	birth_year: number;
	approximate_age: number;
	gender: string;
	recent_job_change: boolean;
	job_start_date: string;
	org_name: string;
	org_domain: string;
	org_website: string;
	org_linkedin_url: string;
	org_linkedin_followers: number;
	address1_line1: string;
	address1_city: string;
	address1_state: string;
	address1_postal: string | number;
	address2_line1: string;
	address2_city: string;
	address2_state: string;
	address2_postal: string | number;
	address3_city: string;
	address3_state: string;
	address3_postal: string | number;
	employee_range: string;
	revenue_range: string;
	industry: string;
	sic_4d: number;
	sic_4d_desc: string;
	naics: number;
	naics_desc: string;
	org_ownership_status: string;
}

export interface IBytemineUser {
	id: string;
	owner: string;
	teamId?: string;
	userId?: string;

	createdAt: string; // ISO timestamp (AWSDateTime)
	updatedAt: string;

	isSelected?: boolean;

	isEnabled?: boolean;
	role?: 'Admin' | 'Manager' | 'Editor' | 'Viewer'; // example enum, adjust as needed

	email?: string;
	phone?: string;

	name?: string;
	givenName?: string;
	familyName?: string;

	company?: string;

	passwordHash?: string;

	accountType?: string;
	bonusCredits?: string;
	colorCode?: string;
	country?: string;
	credits?: string;
	groupName?: string;
	hasApi?: string;
	hasEmail?: string;
	iconS3Key?: string;
	logoS3Key?: string;
	isBlocked?: string;
	lastLoginAt?: string;
	renewalPeriod?: string;
	seats?: string;
}

export enum ESortOrder {
	'none',
	'asc',
	'desc',
}

export enum EActionSelect {
	'SelectAll' = 'Select All',
	'SelectCurrentPage' = 'Select Current Page',
	'ToggleCurrentPage' = 'Toggle Current Page',
}

export interface ISortData {
	id: string;
	children: ReactNode;
	sortOrder?: ESortOrder;
	isActive?: boolean;
	isSortable?: boolean;
	size?: string;
	callback?: (value: any, index?: number) => ReactNode;
}


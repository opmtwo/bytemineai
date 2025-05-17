const Joi = require('joi');

const schemaValidate = (schema) => {
	return async (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			return res.status(422).json(error);
		}
		return next();
	};
};

const ICollection = Joi.object({
	name: Joi.string().max(200).required(),
}).options({ abortEarly: false });

const phoneSchema = Joi.string().pattern(/^\+[1-9]\d{1,14}$/);

const IIds = Joi.object({
	ids: Joi.array().max(100).required().items(Joi.string().trim().max(100)),
});

const IPids = Joi.object({
	pids: Joi.array().max(100).required().items(Joi.string().trim().max(100)),
});

const IUser = Joi.object({
	email: Joi.string().max(200).required(),
	phone: Joi.string().max(20).required(),
	name: Joi.string().max(100).required(),
	givenName: Joi.string().allow('', null).max(50).optional(),
	familyName: Joi.string().allow('', null).max(50).optional(),
	country: Joi.string().allow('', null).max(50).optional(),
	company: Joi.string().allow('', null).max(200).optional(),
	role: Joi.string().optional().allow('', null, 'Admin', 'Manager', 'Editor', 'Viewer'),
}).options({ abortEarly: false });

const IPassword = Joi.object({
	password: Joi.string().max(100).required(),
}).options({ abortEarly: false });

const IDomainSearch = Joi.object({
	term: Joi.string().max(100).required(),
}).options({ abortEarly: false });

const ICSVFilter = Joi.object({
	key: Joi.string().max(100).required(),
	fieldId: Joi.string().max(100).required(),
	columnId: Joi.string().max(100).required(),
	name: Joi.string().max(100).required(),
}).options({ abortEarly: false });

const IPublicUpload = Joi.object({
	mime: Joi.string().max(100).required(),
	size: Joi.number().required(),
}).options({ abortEarly: false });

const IEnrichmentPreview = Joi.object({
	key: Joi.string().max(200).required(),
});

const IEnrichment = Joi.object({
	key: Joi.string().max(200).required(),
	name: Joi.string().max(200).required(),
	size: Joi.number().required(),
	email: Joi.string().allow('', null).max(200).optional(),
	phone: Joi.string().allow('', null).max(200).optional(),
	linkedin: Joi.string().allow('', null).max(200).optional(),
	facebook: Joi.string().allow('', null).max(200).optional(),
	phoneRequired: Joi.boolean().allow('', null).optional(),
	workEmailRequired: Joi.boolean().allow('', null).optional(),
}).options({ abortEarly: false });

const IFilter = Joi.object({
	id: Joi.string().max(100).optional().allow(null, ''),
	name: Joi.string().max(200).optional().allow(null, ''),
	filter: Joi.string().required(),
	isSaved: Joi.bool().optional().default(false),
}).options({ abortEarly: false });

const IContact = Joi.object({
	id: Joi.string().max(100).optional().allow(null, ''),
	pid: Joi.string().max(100).required(),
	uuid: Joi.string().max(100).optional().allow(null, ''),

	// # email validation
	is_email_verified: Joi.bool().optional().default(false),
	contact_email_status_code: Joi.string().optional().allow(null, ''),
	contact_email_domain_type: Joi.string().optional().allow(null, ''),
	personal_email_status_code: Joi.string().optional().allow(null, ''),
	personal_email_domain_type: Joi.string().optional().allow(null, ''),
	contact_personal_email_status_code: Joi.string().optional().allow(null, ''),
	contact_personal_email_domain_type: Joi.string().optional().allow(null, ''),

	// contact fields
	first_name: Joi.string().optional().allow(null, ''), // "Mandy",
	last_name: Joi.string().optional().allow(null, ''), // "Dancho",
	middle_name: Joi.string().optional().allow(null, ''), // "",
	full_name: Joi.string().optional().allow(null, ''), // "Mandy Dancho",
	job_title: Joi.string().optional().allow(null, ''), // "Director, Strategic Alliances, Global Project and Alliance Management",
	seniority: Joi.string().optional().allow(null, ''), // "Director",
	department: Joi.string().optional().allow(null, ''), // "Business Development, Corporate Development, Partnerships",
	primary_role: Joi.string().optional().allow(null, ''), // "Business Development, Corporate Development, Partnerships",
	secondary_role: Joi.string().optional().allow(null, ''), // "",
	linkedin_profile: Joi.string().optional().allow(null, ''), // "https://www.linkedin.com/in/mandy-dancho-pmp-cpm-4754651",
	linkedin_connection_count: Joi.string().optional().allow(null, ''), // "501",
	work_email: Joi.string().optional().allow(null, ''), // "mandy_dancho@merck.com",
	work_email_history: Joi.string().optional().allow(null, ''), // "[{\"work_email\": \"mandy_dancho@merck.com\", \"yyyyqq\": \"2025q1\"}, {\"work_email\": \"mandy.dancho@merck.com\", \"yyyyqq\": \"2024q4\"}]",
	personal_email: Joi.string().optional().allow(null, ''), // "mandy.dancho@yahoo.com",
	personal_email2: Joi.string().optional().allow(null, ''), // "adancho@gmail.com",
	personal_email_history: Joi.string().optional().allow(null, ''), // "[{\"personal_email\": \"mandy.dancho@rcn.com\", \"yyyyqq\": \"2025q1\"}, {\"personal_email\": \"mandy.dancho@yahoo.com\", \"yyyyqq\": \"2025q1\"}]",
	direct_dial: Joi.string().optional().allow(null, ''), // "(484) 951-6816",
	mobile_number: Joi.string().optional().allow(null, ''), // "(484) 951-6816",
	mobile_number_history: Joi.string().optional().allow(null, ''), // "[{\"phone_mobile\": \"(484) 951-6816\", \"yyyyqq\": \"2025q1\"}]",
	work_number: Joi.string().optional().allow(null, ''), // "(800) 672-6372",
	education: Joi.string().optional().allow(null, ''), // "[{\"school\":\"Shippensburg University of Pennsylvania\",\"end_date\":\"1997\",\"start_date\":\"1993\",\"degrees\":[\"B.S.\",\"Environmental Science, Biology\"]},{\"school\":\"Northern Virginia Community College\",\"end_date\":\"2001\",\"start_date\":\"1999\",\"degrees\":[\"A.S.\",\"Veterinary Technology\"]}]",
	skills: Joi.string().optional().allow(null, ''), // "[\"Glp\",\"Pharmaceutical Industry\",\"Cross Functional Team Leadership\",\"Oncology\",\"Clinical Development\",\"Validation\",\"In Vivo\",\"Fda\",\"Gmp\",\"Cro\",\"Life Sciences\",\"Biotechnology\",\"Clinical Trials\",\"Vaccines\",\"Sop\",\"Lims\",\"Cgmp\",\"Project Management\",\"Good Laboratory Practice\",\"Drug Development\",\"Microsoft Project\"]",
	interests: Joi.string().optional().allow(null, ''), // "",
	linkedin_headline: Joi.string().optional().allow(null, ''), // "Director, Strategic Alliances, Global Project and Alliance Management at Merck",
	facebook_profile: Joi.string().optional().allow(null, ''), // "facebook.com/mandydancho",
	twitter_profile: Joi.string().optional().allow(null, ''), // "twitter.com/mandkalman",
	work_experience: Joi.string().optional().allow(null, ''), // "[{\"title\":\"Director, Strategic Operations- Global Project And Alliance Mangement\",\"start_date\":\"2021-01-01\",\"end_date\":\"2022-04-01\",\"company\":\"Merck\"},{\"title\":\"Director, Global Clinical Trial Operations Pmo\",\"start_date\":\"2020-02-01\",\"end_date\":\"2021-01-01\",\"company\":\"Merck\"},{\"title\":\"Associate Director, Global Project & Alliance Management\",\"start_date\":\"2016-10-01\",\"end_date\":\"2020-02-01\",\"company\":\"Merck\"},{\"title\":\"Senior Specialist, Project Management\",\"start_date\":\"2015-03-01\",\"end_date\":\"2016-10-01\",\"company\":\"Merck\"},{\"title\":\"Specialist, Global Project Management\",\"start_date\":\"2012-10-01\",\"end_date\":\"2015-03-01\",\"company\":\"Merck\"},{\"title\":\"Research Biologist\",\"start_date\":\"2004-07-01\",\"end_date\":\"2012-10-01\",\"company\":\"Merck\"},{\"title\":\"Production Supervisor\",\"start_date\":\"2002-02-01\",\"end_date\":\"2004-07-01\",\"company\":\"Merck\"},{\"title\":\"Supervisor\",\"start_date\":\"1999-08-01\",\"end_date\":\"2002-02-01\",\"company\":\"Foundation for the National Institutes of Health\"}]",
	salary: Joi.string().optional().allow(null, ''), // "$200,001+",
	birth_year: Joi.string().optional().allow(null, ''), // "1975",
	age: Joi.string().optional().allow(null, ''), // "50",
	gender: Joi.string().optional().allow(null, ''), // "female",
	new_hire: Joi.string().optional().allow(null, ''), // "false",
	job_start_date: Joi.string().optional().allow(null, ''), // "2022-04-01",
	company_name: Joi.string().optional().allow(null, ''), // "Merck",
	company_domain: Joi.string().optional().allow(null, ''), // "merck.com",
	company_website: Joi.string().optional().allow(null, ''), // "www.merck.com",
	company_linkedin_profile: Joi.string().optional().allow(null, ''), // "https://www.linkedin.com/company/merck/",
	company_linkedin_followers: Joi.string().optional().allow(null, ''), // "2346674",
	company_local_address: Joi.string().optional().allow(null, ''), // "1684 N Broad St",
	company_local_city: Joi.string().optional().allow(null, ''), // "Lansdale",
	company_local_state: Joi.string().optional().allow(null, ''), // "PA",
	company_local_address_postal: Joi.string().optional().allow(null, ''), // "19446",
	company_hq_address: Joi.string().optional().allow(null, ''), // "2000 Galloping Hill Rd",
	company_hq_city: Joi.string().optional().allow(null, ''), // "Kenilworth",
	company_hq_state: Joi.string().optional().allow(null, ''), // "NJ",
	company_hq_postal: Joi.string().optional().allow(null, ''), // "07033",
	person_city: Joi.string().optional().allow(null, ''), // "Coopersburg",
	person_state: Joi.string().optional().allow(null, ''), // "PA",
	person_postal: Joi.string().optional().allow(null, ''), // "18036",
	company_employee_range: Joi.string().optional().allow(null, ''), // "5000+",
	company_revenue_range: Joi.string().optional().allow(null, ''), // "$1B+",
	company_industry: Joi.string().optional().allow(null, ''), // "Manufacturing",
	company_sic4: Joi.string().optional().allow(null, ''), // "2834",
	company_sic4_description: Joi.string().optional().allow(null, ''), // "Pharmaceutical Preparations",
	company_naics: Joi.string().optional().allow(null, ''), // "325412",
	company_naics_description: Joi.string().optional().allow(null, ''), // "Pharmaceutical Preparation Manufacturing",
	company_type: Joi.string().optional().allow(null, ''), // "Public Company"
}).options({ abortEarly: false });

module.exports = {
	schemaValidate,
	ICollection,
	phoneSchema,
	IIds,
	IPids,
	IUser,
	IPassword,
	IDomainSearch,
	ICSVFilter,
	IPublicUpload,
	IEnrichmentPreview,
	IEnrichment,
	IFilter,
	IContact,
};

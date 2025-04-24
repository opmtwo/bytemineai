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

const IUser = Joi.object({
	email: Joi.string().max(200).required(),
	phone: Joi.string().max(20).required(),
	name: Joi.string().max(100).required(),
	givenName: Joi.string().allow('', null).max(50).optional(),
	familyName: Joi.string().allow('', null).max(50).optional(),
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

module.exports = {
	schemaValidate,
	ICollection,
	phoneSchema,
	IIds,
	IUser,
	IPassword,
	IDomainSearch,
	ICSVFilter,
	IPublicUpload,
	IEnrichmentPreview,
	IEnrichment,
};

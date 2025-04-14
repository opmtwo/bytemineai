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
	title: Joi.string().max(200).required(),
	description: Joi.string().required(),
}).options({ abortEarly: false });

const phoneSchema = Joi.string().pattern(/^\+[1-9]\d{1,14}$/);

const IIds = Joi.object({
	ids: Joi.array().max(100).required().items(Joi.string().trim().max(100)),
});

module.exports = {
	schemaValidate,
	ICollection,
	phoneSchema,
	IIds,
};

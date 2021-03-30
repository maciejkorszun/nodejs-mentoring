const Joi = require("@hapi/joi");

function User(username = null, password = null) {
	this.username = username;
	this.password = password;
}

const createUserValidationSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required()
});

module.exports = {
	User: User,
	createUserValidationSchema: createUserValidationSchema
};
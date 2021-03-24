const Joi = require("@hapi/joi");

const createTodoValidationSchema = Joi.object({
	id: Joi.alternatives().try(Joi.number().integer(), Joi.string()),
	description: Joi.string().required(),
	completed: Joi.boolean(),
});

const modifyTodoValidationSchema = Joi.object({
	description: Joi.string(),
	completed: Joi.boolean(),
});

function Todo(id = null, description = null, completed = false) {
	this.id = id;
	this.description = description;
	this.completed = completed;
}

/*
{
  "id": "number or string",
  "description": "string",
  "completed": "boolean"
}
*/

module.exports = {
	Todo: Todo, 
	createTodoValidationSchema: createTodoValidationSchema,
	modifyTodoValidationSchema: modifyTodoValidationSchema
};
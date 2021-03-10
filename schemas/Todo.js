const Joi = require("@hapi/joi");

const TodoValidationSchema = Joi.object({
	id: Joi.alternatives().try(Joi.array().items(Joi.number().integer()), Joi.string()),
	description: Joi.string().required(),
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
	TodoValidationSchema: TodoValidationSchema
};
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

module.exports = Todo;
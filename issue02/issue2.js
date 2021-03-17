const express = require("express");
const {Todo, TodoValidationSchema} = require("../schemas/Todo");
const statusCodes = require("../other/statusCodes");
const expressJoiValidation = require("express-joi-validation");
const validator = expressJoiValidation.createValidator({});

const app = express();
const PORT = 3000;

console.log("app listening on port " + PORT);

function countId() {
	let counter = 0;
	return () => ++counter;
}
let getNewId = countId();


let currentTodos = [
	new Todo(getNewId(), "Buy groceries"),
	new Todo(getNewId(), "Dispose of garbage", true),
	new Todo(getNewId(), "Wash the floors", false)
];


app.get("/", function (req, res) {
	res.send("Maciej Korszuń nodejs mentoring with Adilson Junior as guru");
});

app.get("/api/todos", function (req, res) {
	res.send(currentTodos);
});

app.get("/api/todos/:id", function (req, res) { //localhost:3000/api/todos/1
	const foundTodo = currentTodos.find(oneTodo => oneTodo.id === Number(req.params.id));
	foundTodo ?
		res.send(foundTodo) :
		res.status(statusCodes["NOT_FOUND"]).json("Todo with id " + req.params.id + " not found");
});

app.post("/api/todos", validator.body(TodoValidationSchema), (req, res) => { //create new user
	const b = req.body;
	const p = req.params;

	console.log(b);
	console.log(p);
	// let newTodo = new Todo(b.description, b.completed);

	res.status(statusCodes["CREATED"]).json(null);
});

app.listen(PORT);
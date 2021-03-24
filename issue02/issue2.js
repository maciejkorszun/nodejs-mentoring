const express = require("express");
const { Todo, TodoValidationSchema } = require("../schemas/Todo");
const statusCodes = require("../other/statusCodes");
const expressJoiValidation = require("express-joi-validation");
const validator = expressJoiValidation.createValidator({});
const { getNewId } = require("../other/helperFunctions");

const app = express();
const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); // parse application/json
app.use(express.json());

console.log("app listening on port " + PORT);

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
	//localhost:3000/api/todos
	const b = req.body;

	let newTodo = new Todo(getNewId(), b.description, b.completed);
	currentTodos.push(newTodo);

	res.status(statusCodes["CREATED"]).json(newTodo);
});

app.listen(PORT);
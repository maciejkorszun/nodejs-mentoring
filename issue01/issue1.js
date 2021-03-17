const express = require("express");
const {Todo, TodoValidationSchema} = require("./../schemas/Todo");
const statusCodes = require("./../other/statusCodes");

const app = express();
const PORT = 3000;

TodoValidationSchema; //not needed

console.log("app listening on port " + PORT);

let currentTodos = [
	new Todo(1, "Buy groceries"),
	new Todo(2, "Dispose of garbage", true),
	new Todo(Math.floor((Math.random() * 10) + 2), "Wash the floors", false),
	new Todo(null, 12345, 12345)
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

app.listen(PORT);
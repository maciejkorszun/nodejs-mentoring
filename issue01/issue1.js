const PORT = 3000;
const express = require("express");
const app = express();
const Todo = require('./../schemas/Todo');

console.log('app working')

let currentTodos = [
	new Todo(1, "Buy groceries"),
	new Todo(2, "Dispose of garbage", true),
	new Todo(Math.floor(Math.random() * 10), "Wash the floors", false)
];

app.get("/", function (req, res) {
	res.send("Maciej Korszuń node.js training with Adilson Junior as mentor");
});

app.listen(PORT);
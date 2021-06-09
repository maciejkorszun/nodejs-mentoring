const express = require("express");
const { Todo, createTodoValidationSchema, modifyTodoValidationSchema } = require("../schemas/Todo");
const { User } = require("../schemas/User");
const statusCodes = require("../other/statusCodes");
const expressJoiValidation = require("express-joi-validation");
const validator = expressJoiValidation.createValidator({});
const { getNewId } = require("../other/helperFunctions");
require('dotenv').config();
var jwt = require('jsonwebtoken');

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

const systemUsers = [
	new User("maciek", "123"),
	new User("qwe", "rty"),
	new User("zxc", "zxc")
];


app.get("/", function (req, res) {
	res.send("Maciej Korszuń nodejs mentoring with Adilson Junior as guru");
});

app.post("/api/login", (req, res) => { //login
	const b = req.body;

	const user = systemUsers.find((oneUser) => oneUser.username === b.username);
	if (user && user.password === b.password) { //header is created automatically
		let token = jwt.sign(
		{
			username: b.username 	 //payload	
		},
			process.env.JWT_SECRET  //secret
		);
		
		res.status(statusCodes["OK"]).json(token);
		return;
	}
	//never diffrentiate wrong username/password errors  - you will give info if the given username exists that way
	res.status(statusCodes["FORBIDDEN"]).json("Could not authenticate - either there's no username or password is incorrect");
	return;
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

app.post("/api/todos", validator.body(createTodoValidationSchema), (req, res) => { //create new Todo
	//localhost:3000/api/todos
	const b = req.body;

	let newTodo = new Todo(getNewId(), b.description, b.completed);
	currentTodos.push(newTodo);

	res.status(statusCodes["CREATED"]).json(newTodo);
});

app.put("/api/todos/:id", validator.body(modifyTodoValidationSchema), (req, res) => { //modify Todo
	const b = req.body;
	const id = req.params.id;

	let foundTodo = currentTodos.find(oneTodo => oneTodo.id == id);
	if (!foundTodo) {
		res.status(statusCodes["NOT_FOUND"]).json("Todo with id " + id + " does not exist.");
		return;
	}

	// foundTodo = {...foundTodo, ...b}; //this doesnt work bc it creates new obj, instead of modifying state
	Object.assign(foundTodo, b);

	res.status(statusCodes["OK"]).json(foundTodo);
});

app.listen(PORT);

////////////////////////////////https://www.npmjs.com/package/jsonwebtoken
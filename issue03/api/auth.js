const AuthService = require('../services/auth');

app.post("/api/login", (req, res) => { //login
	const { username, password } = req.body;

	try {
        const token = AuthService.authenticate({ username, password });
        return res.status(statusCodes["OK"]).json(token);
    } catch (error) {
        LogService.logError(error); // <-- service for monitoring or tracking
        return res.status(statusCodes["FORBIDDEN"]).json("Could not authenticate - either there's no username or password is incorrect");
    }
});

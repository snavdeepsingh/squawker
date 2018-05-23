var passport = require("passport");

// auth login
module.exports = function (app) {
	app.get("/login", function (req, res) {
		res.render("login");
	});

	// auth logout

	app.get("/auth/logout", function (req, res) {
		// handle with passport
		// res.send("logging out");
		req.logout();
		res.redirect('/home');
		// console.log("logged out");
	})

	// auth with google
	app.get("/auth/google", passport.authenticate("google", {
		// handle with passport
		scope: ["profile"]
	}));

	app.get('/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			// console.log(req.user.)
			res.redirect('/home')
		});
}
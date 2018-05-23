var passport = require("passport");

module.exports = function(app) {
	app.get("/login", function(req, res){
    res.render("login");
	});

	app.get("/auth/logout", function(req, res){
	    req.logout();
			return res.redirect('/');
	})

	app.get("/auth/google", passport.authenticate("google", {
	     scope: ["profile"]
	}));

	app.get('/auth/google/callback', 
	  passport.authenticate('google'),
	  (req, res) => {
	  	res.redirect('/home')
  });
}
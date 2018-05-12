var router = require("express").Router();
var passport = require("passport");

// auth login

router.get("/login", function(req, res){
    res.render("login");
});

// auth logout

router.get("/logout", function(req, res){
    // handle with passport
    res.send("logging out");
})

// auth with google
router.get("/google", passport.authenticate("google", {
     // handle with passport
     scope: ["profile"]
}));

// callback route for google to redirect to 
router.get("/google/redirect", passport.authenticate("google") ,function(req, res){
    res.send("You are here.")
})

module.exports = router;
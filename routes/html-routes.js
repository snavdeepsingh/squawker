var db = require("../models");
var passport = require('passport');

module.exports = function(app) {
  app.get("/", function(req, res) {
    let handleBarsObj = {};
      console.log(handleBarsObj);
      res.render('index', handleBarsObj);
  });

  app.get("/home", function(req, res){
  	// console.log(req.user.dataValues)
  	if (req.user){
  		let handleBarsObj = {
	  		name: req.user.dataValues.username,
	  		image: req.user.dataValues.profileIMG
	  	}
	    return res.render("home", handleBarsObj);
  	}
  	return res.redirect('/')
  	
	});
};
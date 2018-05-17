var db = require("../models");
var passport = require('passport');

module.exports = function(app) {
  app.get("/", function(req, res) {
    let handleBarsObj = {};
      console.log(handleBarsObj);
      res.render('index', handleBarsObj);
  });

  app.get('/info', function(req, res) {
  	if (req.user){
  		let handleBarsObj = {
	  		name: req.user.dataValues.username,
	  		image: req.user.dataValues.profileIMG,
	  	}
	    return res.render("info", handleBarsObj);
  	}
  	return res.redirect('/')
  })

  app.get('/photos', function(req, res) {
    // give me photos from from '/api/photos'
    let photos;
  	if (req.user){
  		let handleBarsObj = {
	  		name: req.user.dataValues.username,
	  		image: req.user.dataValues.profileIMG,
	  		photos: photos
	  	}
	    return res.render("pictures", handleBarsObj);
  	}
  	return res.redirect('/')
  })

  app.get("/home", function(req, res){
  	if (req.user){
  		let handleBarsObj = {
	  		name: req.user.dataValues.username,
	  		image: req.user.dataValues.profileIMG,
	  	}
	    return res.render("home", handleBarsObj);
  	}
  	return res.redirect('/')
  	
	});
};
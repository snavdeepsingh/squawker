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
    if (req.user){
      db.Image.findAll({
        where: {
          userId: req.user.dataValues.id
        }
      })
      .then (photos => res.render("pictures", {
        name: req.user.dataValues.username,
        image: req.user.dataValues.profileIMG,
        photos: photos
      }))
      .catch(err => res.redirect('/'))
    } else {
      return res.redirect('/')  
    }
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
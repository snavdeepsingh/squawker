var db = require("../models");
var passport = require('passport');

let fakePhotos = [
  {
    id: 1,
    name: "picture-1",
    src: "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&h=350",
  },
  {
    id: 2,
    name: "picture-2",
    src: "https://files.allaboutbirds.net/wp-content/uploads/2015/06/prow-featured.jpg"
  },
  {
    id: 3,
    name: "picture-3",
    src: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&h=350"
  },
  {
    id: 4,
    name: "picture-4",
    src: "https://cdn.audubon.org/cdn/farfuture/xX2dO2IN71t0tfGOITDQ0HSLNOml6xiRu_z3MU6Xx5M/mtime:1486669862/sites/default/files/styles/engagement_card/public/sfw_apa_2013_28342_232388_briankushner_blue_jay_kk_high.jpg?itok=ttMfUhUu"
  },
  {
    id: 5,
    name: "picture-5",
    src: "https://files.allaboutbirds.net/wp-content/themes/html5blank-stable/images/blue-winged-warbler.jpg"
  },
  {
    id: 6,
    name: "picture-6",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg"
  }
];

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
	  		// image: req.user.dataValues.profileIMG,
	  	}
	    return res.render("info", handleBarsObj);
  	}
  	return res.redirect('/')
  })

  app.get('/photos', function(req, res) {
  	if (req.user){
  		let handleBarsObj = {
	  		name: req.user.dataValues.username,
	  		// image: req.user.dataValues.profileIMG,
	  		photos: fakePhotos
	  	}
	    return res.render("pictures", handleBarsObj);
  	}
  	return res.redirect('/')
  })

  app.get("/home", function(req, res){
  	// console.log(req.user.dataValues)
  	if (req.user){
  		let handleBarsObj = {
	  		name: req.user.dataValues.username,
	  		// image: req.user.dataValues.profileIMG,
	  	}
	    return res.render("home", handleBarsObj);
  	}
  	return res.redirect('/')
  	
	});
};
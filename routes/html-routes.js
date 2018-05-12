var db = require("../models");
var passport = require('passport');

module.exports = function(app) {
  app.get("/", function(req, res) {
    let handleBarsObj = {};
      console.log(handleBarsObj);
      res.render('index', handleBarsObj);
  });

  app.get('/home', function (req, res) {
    console.log('logged in')
  })
};
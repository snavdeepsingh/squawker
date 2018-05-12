var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.User.findAll({}).then( result => {
      let handleBarsObj = {
        users: result
      };
      console.log(handleBarsObj);
      res.render('index', handleBarsObj);
    })
  });
};

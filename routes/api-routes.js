var db = require("../models");

module.exports = function(app) {

	// Redundant...
  app.get("/api/photos", function(req, res) {

    db.Image.findAll({
      where: {
      	userId: req.user.dataValues.id
      }
    }).then(function(dbPhotos) {
      res.json(dbPhotos);
    });
  });
};

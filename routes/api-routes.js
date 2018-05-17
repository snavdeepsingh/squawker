var db = require("../models");

module.exports = function(app) {
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

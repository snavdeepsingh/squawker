var multer = require('multer');
var express = require("express");
var memoryStorage = multer.memoryStorage();
var storage = require("@google-cloud/storage");
var db = require('../models');
var keys = require('../config/keys.js');

const googleCloudStorage = storage({
  projectId: "Bird",
  private_key: keys.keyFile.private_key,
  client_email: keys.keyFile.client_email
});
const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
var BucketName = "snavdeepsingh"
const bucket = googleCloudStorage.bucket(BucketName);

module.exports = function (app){
  app.post("/upload", upload.single("file"), (req, res, next) => {
    console.log(req.user.dataValues.googleID);
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });
  
    blobStream.on("error", err => {
      next(err);
      return;
    });
  
    blobStream.on("finish", () => {
      
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  
      blob.makePublic().then(() => {
        db.Image.findOrCreate({
          where: {
            url: publicUrl,
            UserId: req.user.dataValues.id
          }
        })
        .then(() => {
          let handleBarsObj = {
            name: req.user.dataValues.username,
            image: req.user.dataValues.profileIMG,
            lastPictureSrc: publicUrl,
          };
          res.render("results", handleBarsObj)
        });
      });
    });
  
    blobStream.end(req.file.buffer);
  });

}


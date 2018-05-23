var multer = require('multer');
var express = require("express");
var memoryStorage = multer.memoryStorage();
var storage = require("@google-cloud/storage");
var db = require('../models');
const visionAPI = require('./vision-api')

const googleCloudStorage = storage({
  projectId: "Bird",
  keyFilename: "keyfile.json"
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
    // console.log(req.user.dataValues.googleID);
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
          visionAPI.reqObj.requests[0].image.source.imageUri = publicUrl
          
          return visionAPI.visionQuery(visionAPI.apiCall, visionAPI.reqObj)
        }).then((visionQueryResults) => {
          let birdNames = [];
          visionQueryResults[0].labelAnnotations.forEach(labelAnnotation => {
            birdNames.push(labelAnnotation.description);
          })
          if (!birdNames.includes('fauna') || !birdNames.includes('bird')) {
            res.render("tryAgain", {
              name: req.user.dataValues.username,
              image: req.user.dataValues.profileIMG,
              lastPictureSrc: publicUrl
            })
          } else {
            let handleBarsObj = {
              name: req.user.dataValues.username,
              image: req.user.dataValues.profileIMG,
              lastPictureSrc: publicUrl,
              birdType: visionQueryResults[0].webDetection.webEntities[0].description,
              similarImage: visionQueryResults[0].webDetection.visuallySimilarImages[0].url
            }
            res.render("results", handleBarsObj)
          }
        }).catch(err => console.log(err))
      });
    });

    blobStream.end(req.file.buffer);
  });

}

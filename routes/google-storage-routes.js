var multer = require('multer');
var express = require("express");
var memoryStorage = multer.memoryStorage();
var storage = require("@google-cloud/storage");
var db = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var searchImages = require('../public/js/searchImages')
const visionAPI = require('./vision-api');

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
    // console.log(req)
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
      const visionUrl = `gs://${bucket.name}/${blob.name}`;

      blob.makePublic().then(() => {
        db.Image.findOrCreate({
          where: {
            url: publicUrl,
            UserId: req.user.dataValues.id
          }
        })
        .then(() => {
          visionAPI.reqObj.requests[0].image.source.imageUri = visionUrl

          return visionAPI.visionQuery(visionAPI.apiCall, visionAPI.reqObj)
        }).then((visionQueryResults) => {
          let birdNames = [];
          visionQueryResults[0].labelAnnotations.forEach(labelAnnotation => {
            birdNames.push(labelAnnotation.description);
          })
          if (birdNames.includes('fauna') || birdNames.includes('bird')) {
            let newBirdNames = [];
            visionQueryResults[0].webDetection.webEntities.forEach(entity => {
              if (entity.description && entity.description.toLowerCase() !== 'bird' && entity.description.toLowerCase() !== 'hawk' && entity.description.toLowerCase() !== 'eagle' && entity.description.toLowerCase() !== 'fauna')
                newBirdNames.push(entity.description)
            })
            if (visionQueryResults[0].webDetection.fullMatchingImages || visionQueryResults[0].webDetection.partialMatchingImages) {
              console.log(newBirdNames);
              db.BirdNameMaster.findOne({
                where: {
                  BirdName : newBirdNames[0],
                }
              }).then((data) => {
                res.render("results", {
                  name: req.user.dataValues.username,
                  image: req.user.dataValues.profileIMG,
                  lastPictureSrc: publicUrl,
                  birdType: data.dataValues.BirdName,
                  similarImage: (visionQueryResults[0].webDetection.fullMatchingImages ? visionQueryResults[0].webDetection.fullMatchingImages[0].url :visionQueryResults[0].webDetection.partialMatchingImages[0].url),
                })
              }).catch(err => {
                res.render("tryAgain", {
                  name: req.user.dataValues.username,
                  image: req.user.dataValues.profileIMG,
                  lastPictureSrc: publicUrl
                })
              })
            } else if (visionQueryResults[0].webDetection.visuallySimilarImages) {
              let birdInfo = searchImages(visionQueryResults[0].webDetection.visuallySimilarImages, newBirdNames);
              console.log(birdInfo)
              res.render("results", {
                name: req.user.dataValues.username,
                image: req.user.dataValues.profileIMG,
                lastPictureSrc: publicUrl,
                birdType: birdInfo.birdType,
                similarImage: birdInfo.similarImage
              })
            }
          } else {
            res.render("tryAgain", {
              name: req.user.dataValues.username,
              image: req.user.dataValues.profileIMG,
              lastPictureSrc: publicUrl
            })
          }
        }).catch(err => console.log(err))
      });
    });

    blobStream.end(req.file.buffer);
  });

}

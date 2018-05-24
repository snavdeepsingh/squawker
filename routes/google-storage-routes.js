require('dotenv').config();
var multer = require('multer');
var express = require("express");
var memoryStorage = multer.memoryStorage();
var storage = require("@google-cloud/storage");
var db = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var keys = require("../config/keys.js");

var searchImages = require('../public/js/searchImages')
const visionAPI = require('./vision-api');

const googleCloudStorage = storage({
  projectId: "Bird",
  // keyFilename: "keyfile.json"
  credentials: JSON.parse(process.env.GOOGLE_KEY_FILE_JSON)
});
const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
var BucketName = keys.storageBucket.BucketName;
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
          console.log("BIRD NAMES HERE ++++");
          console.log(birdNames);
          if (birdNames.includes('fauna') || birdNames.includes('bird')) {
            let newBirdNames = [];
            visionQueryResults[0].webDetection.webEntities.forEach(entity => {
              if (entity.description && entity.description.toLowerCase() !== 'bird' && entity.description.toLowerCase() !== 'hawk' && entity.description.toLowerCase() !== 'eagle' && entity.description.toLowerCase() !== 'fauna')
                newBirdNames.push([entity.description, entity.score])
            })
            console.log(newBirdNames)
            if (visionQueryResults[0].webDetection.fullMatchingImages || visionQueryResults[0].webDetection.partialMatchingImages) {
              // saving bird names array for matching later
              let savedNewBirdNames = JSON.parse(JSON.stringify(newBirdNames))

              // add % for the like SQL query
              newBirdNames.forEach((name, i) => {
                name[0].replace("'", "\\'")
                newBirdNames[i][0] = "%" + name[0] + "%"
              })
              console.log(newBirdNames);
              // Turning the items into objects with "$iLike" as the key
              let searchFor = newBirdNames.map((item) => {
                  return {$like: item[0]};
              });
              console.log(newBirdNames);
              // Filter the matching names from the bird name database with the descriptions
              db.BirdNameMaster.findAll({
                where: {
                    $or: {
                      BirdName: {
                        $or: searchFor
                      }
                    },
                }
              // db.BirdNameMaster.findAll({
              //   where: {
              //     BirdName: newBirdNames[0]
              //   }
              }).then((data) => {
                console.log(data)
                console.log(visionQueryResults)

                let dataObjToArray = []
                data.forEach(e => dataObjToArray.push(e.dataValues.BirdName))
                console.log(dataObjToArray);

                console.log("Saved NBN: ", savedNewBirdNames);
                // Match the name from dataObjToArray to the highest score in newBirdNames
                let highScore = []
                savedNewBirdNames.forEach((name, i) => {
                  dataObjToArray.forEach(e => {
                    // let highScore = Math.max.apply(Math,filteredArray.map(bird => bird.score))
                    if (name[0].toLowerCase() === e.toLowerCase()) {
                      console.log(`${name[0]} === ${e} with a score of ${name[1]}`);
                      if (highScore < name[1]) {
                        highScore.push(name, i)
                      }
                    } else {
                      console.log(`${name[0]} !== ${e} with a score of ${name[1]}`);
                    }
                  })
                })
                console.log(highScore);

                res.render("results", {
                  name: req.user.dataValues.username,
                  image: req.user.dataValues.profileIMG,
                  lastPictureSrc: publicUrl,
                  birdType: highScore[0][0],
                  similarImage: (visionQueryResults[0].webDetection.fullMatchingImages ? visionQueryResults[0].webDetection.fullMatchingImages[0].url :visionQueryResults[0].webDetection.partialMatchingImages[0].url),
                })
              }).catch(err => {
                console.log(err)
                res.render("tryAgain", {
                  name: req.user.dataValues.username,
                  image: req.user.dataValues.profileIMG,
                  lastPictureSrc: publicUrl
                })
              })
            }
             else if (visionQueryResults[0].webDetection.visuallySimilarImages) {
              let birdInfo = searchImages(visionQueryResults[0].webDetection.visuallySimilarImages, newBirdNames);
              console.log(birdInfo)
              // res.render("results", {
              //   name: req.user.dataValues.username,
              //   image: req.user.dataValues.profileIMG,
              //   lastPictureSrc: publicUrl,
              //   birdType: birdInfo.birdType,
              //   similarImage: birdInfo.similarImage
              // })
              res.render("tryAgain", {
                name: req.user.dataValues.username,
                image: req.user.dataValues.profileIMG,
                lastPictureSrc: publicUrl
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

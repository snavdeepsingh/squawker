var multer = require('multer');
var express = require("express");
// var path =  require("path");
var memoryStorage = multer.memoryStorage();
// var upload = multer({ storage: storage });
var storage = require("@google-cloud/storage");
var db = require('../models');

// Instantiate a storage client
const googleCloudStorage = storage({
  projectId: "Bird",
  keyFilename: "keyfile.json"
});

// Instantiate an express server
// const app = express();

// Multer is required to process file uploads and make them available via
// req.files.
const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});
var BucketName = "snavdeepsingh"
// A bucket is a container for objects (files).
const bucket = googleCloudStorage.bucket(BucketName);

module.exports = function (app){

    // Display a form for uploading files.
// app.get("/info", (req, res) => {
//     res.sendFile(path.join(`${__dirname}/info`));
//   });
  
  // Process the file upload and upload to Google Cloud Storage.
  app.post("/upload", upload.single("file"), (req, res, next) => {
    // console.log(req.user.dataValues.googleID);
    // console.log(req.user);
    console.log(req.file);    
    
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
  
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
  
    // Make sure to set the contentType metadata for the browser to be able
    // to render the image instead of downloading the file (default behavior)
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
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  
      // Make the image public to the web (since we'll be displaying it in browser)
      blob.makePublic().then(() => {
        // res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
        // console.log("Hello" + db.User);
        db.Image.create({
          url: publicUrl,
          UserId: req.user.dataValues.id
        }).then(() => res.render("home"))
        // .then( function() {
        //   $("#image-capture-submit").on("click", function(event) {
        //     $("#bird-pic")
        //         .attr("src", publicUrl)
        //         .width("150px")
        //         .height("150px");


          })
        });
      });
    });
  
    blobStream.end(req.file.buffer);
  });

}


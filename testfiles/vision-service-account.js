// Log the path to the json file that has the authentication info
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
console.log(client);

const fileName = '../public/images/harrishawk.jpg';

const request = {
  image: {
    source: {
      filename: fileName,
    },
  },
  "features":[
    {
      "type":"LABEL_DETECTION"
    },
    {
      "type": "WEB_DETECTION"
    }
  ],
  imageContext: {
    webDetectionParams: {
      includeGeoResults: true,
    },
  },
};

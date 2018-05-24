const axios = require('axios')
const fs = require('fs')
const keys = require('../config/keys.js')
const request = require('request')

let imageURL = "https://www.hbw.com/sites/default/files/styles/ibc_1k/public/ibc/p/e7d_9494a.jpg?itok=-TK6SIQL"

const apiCall = 'https://vision.googleapis.com/v1/images:annotate?key=' + keys.googleVision.apiKey
module.exports.apiCall = apiCall

let base64image = ""


// Remote Image
let reqObj = {
  "requests": [
    {
      "image": {
        "content": base64image
      },
      "features": [
        {
          "type": "LABEL_DETECTION"
        },
        {
          "type": "WEB_DETECTION"
        }
      ],
      imageContext: {
        webDetectionParams: {
          includeGeoResults: false,
        },
      },
    }
  ]
}

let visionQuery = function (apiCall, reqObj) {
  axios.post(apiCall, reqObj)
    .then((response) => {
      console.log(response);
      console.log(JSON.stringify(response.data.responses, undefined, 2));
  }).catch((e) => {
    console.log(e);
    console.log(e.response);
  });
}

function base64encode(imageURL) {
  request({
    method: 'GET',
    uri: imageURL,
    encoding: 'base64'
  }, function(err, resp, body) {
    // error handling omitted
    // `body` is a base64 representation of the image
    reqObj.requests[0].image.content = body
    if (err) {
      console.log(err);
    }
    console.log(body);
    visionQuery(apiCall, reqObj)
  })
}

base64encode(imageURL)

// visionQuery(apiCall, reqObj)

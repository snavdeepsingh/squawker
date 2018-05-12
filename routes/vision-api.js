const axios = require('axios')
const fs = require('fs')
const keys = require('../config/keys.js')

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

let testImage = '../public/images/harrishawk.jpg'
let testURL = "http://cdn.audubon.org/cdn/farfuture/hh8B4rQM6EMBMiZCfVR0p3yrg6PeZXIt_-9DeYG0dGY/mtime:1422549346/sites/default/files/Harris%2527s_Hawk_b13-46-102_l_0.jpg"

let base64str = base64_encode(testImage);
const apiCall = 'https://vision.googleapis.com/v1/images:annotate?key=' + keys.googleVision.apiKey
const reqObj = {
  "requests": [
    {
      "image": {
        "content": base64str
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
          includeGeoResults: true,
        },
      },
    }
  ]
}

axios.post(apiCall, reqObj)
  .then((response) => {
    // console.log(response);
    // console.log(JSON.stringify(response.data.responses, undefined, 4));
    console.log(response.data.responses[0].labelAnnotations)
    console.log(response.data.responses[0].webDetection);
    console.log(response.data.responses[0].webDetection.visuallySimilarImages[0].url);
    // base64str = response.data.responses[0].webDetection.visuallySimilarImages[0].url
    // axios.post(apiCall, reqObj)
}).catch((e) => {
    console.log(e.response);
});

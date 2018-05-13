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
let testURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Harris%27s_Hawk_%28Parabuteo_unicinctus%29_3_of_4_in_set.jpg/220px-Harris%27s_Hawk_%28Parabuteo_unicinctus%29_3_of_4_in_set.jpg"

let base64str = base64_encode(testImage);
const apiCall = 'https://vision.googleapis.com/v1/images:annotate?key=' + keys.googleVision.apiKey

// Local Image
// const reqObj = {
//   "requests": [
//     {
//       "image": {
//         "content": base64str
//       },
//       "features": [
//         {
//           "type": "LABEL_DETECTION"
//         },
//         {
//           "type": "WEB_DETECTION"
//         }
//       ],
//       imageContext: {
//         webDetectionParams: {
//           includeGeoResults: true,
//         },
//       },
//     }
//   ]
// }

// Remote Image
const reqObj = {
  "requests": [
    {
      "image": {
        "source": {
          "imageUri": testURL
        }
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
    console.log(JSON.stringify(response.data.responses, undefined, 2));
    // console.log(response.data.responses[0].labelAnnotations)
    // console.log(response.data.responses[0].webDetection);
    // console.log(response.data.responses[0].webDetection.visuallySimilarImages[0].url);
    // base64str = response.data.responses[0].webDetection.visuallySimilarImages[0].url
    // axios.post(apiCall, reqObj)
}).catch((e) => {
    console.log(e.response);
});

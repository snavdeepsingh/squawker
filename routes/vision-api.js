const axios = require('axios')
const fs = require('fs')
const keys = require('../config/keys.js')

let imageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Harris%27s_Hawk_%28Parabuteo_unicinctus%29_3_of_4_in_set.jpg/220px-Harris%27s_Hawk_%28Parabuteo_unicinctus%29_3_of_4_in_set.jpg"

const apiCall = 'https://vision.googleapis.com/v1/images:annotate?key=' + keys.googleVision.apiKey
module.exports.apiCall = apiCall

// Remote Image
module.exports.reqObj = {
  "requests": [
    {
      "image": {
        "source": {
          "imageUri": imageURL
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

module.exports.visionQuery = function (apiCall, reqObj) {
  return new Promise((resolve, reject) => {
    axios.post(apiCall, reqObj)
      .then((response) => {
        // console.log(JSON.stringify(response.data.responses, undefined, 2));
        // console.log(response.data.responses);

        return resolve(response.data.responses)
    }).catch((e) => {
        // console.log(e.response);
        return reject(e.response)
    });
  })
}

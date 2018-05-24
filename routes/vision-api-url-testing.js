const axios = require('axios')
const fs = require('fs')
const keys = require('../config/keys.js')
const request = require('request')

let imageURL = "https://www.hbw.com/sites/default/files/styles/ibc_1k/public/ibc/p/e7d_9494a.jpg?itok=-TK6SIQL"

const apiCall = 'https://vision.googleapis.com/v1/images:annotate?key=' + keys.googleVision.apiKey
module.exports.apiCall = apiCall

let base64image = ""

let visSimAggregateArray = []

let visuallySimilarImages = [
  {"url": "http://www.bio-foto.com/albums/ptaci/Passer-domesticus-web-IMG_6.jpg"},
  {"url": "https://c1.staticflickr.com/7/6124/5924816375_e521c91449_b.jpg"},
  {"url": "https://i.ytimg.com/vi/xJQsZFOcCf4/maxresdefault.jpg"},
  {"url": "https://ssl.c.photoshelter.com/img-get2/I0000qyMmNB2QmxI/fit=1000x750/Juvenile-Male-House-Sparrow.jpg"},
  {"url": "https://www.birdwatchersdigest.com/bwdsite/wp-content/uploads/2015/02/800px-Passer_domesticus_-Battery_Park_-USA-8.jpg"},
  {"url": "https://thumbs.dreamstime.com/b/house-sparrow-passer-domesticus-natural-background-beautiful-little-sparrow-bird-natural-background-generally-sparrows-113283084.jpg"},
  {"url": "https://download.ams.birds.cornell.edu/api/v1/asset/24912601"},
  {"url": "https://photos.smugmug.com/British-wildlife/House-Sparrows/i-gPmRv5R/14/efe6a8ea/S/house_sparrow_bird_british_birds_kj_photography-16-S.jpg"}
]

// Remote Image
let reqObjbase64 = {
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
          includeGeoResults: true,
        },
      },
    }
  ]
}

let visionQuery = function (apiCall, reqObj) {
  return new Promise((resolve, reject) => {
    axios.post(apiCall, reqObj)
      .then((response) => {
        console.log(JSON.stringify(response.data.responses[0].labelAnnotations, undefined, 2));
        // console.log(response.data.responses);

        return resolve(response.data.responses)
    }).catch((e) => {
        // console.log(e.response);
        return reject(e.response)
    });
  })
}

function base64encode(imageUrlArray) {
  imageUrlArray.forEach(e => {
    imageURL = e.url
    request({
      method: 'GET',
      uri: imageURL,
      encoding: 'base64'
    }, function(err, resp, body) {
      // error handling omitted
      // `body` is a base64 representation of the image
      reqObjbase64.requests[0].image.content = body
      if (err) {
        console.log(err);
      }
      // console.log(body);
      visSimAggregateArray.push(visionQuery(apiCall, reqObjbase64))
    })
  })
}

base64encode(visuallySimilarImages)

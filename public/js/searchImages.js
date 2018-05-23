const visionAPI = require('../../routes/vision-api');

module.exports = function searchImages(visionUrls, birdNames){
	console.log(birdNames)
	visionUrls.forEach(urlObj => {
		console.log(urlObj.url);
	})
	// ((visionUrls) => {
	// 	visionAPI.reqObj.requests[0].image.source.imageUri = visionUrls[0].url;
 //  	return visionAPI.visionQuery(visionAPI.apiCall, visionAPI.reqObj)
	// }).then((queryResults) => {
	// 	console.log(queryResults)
	// })
	return {birdType: 'birdType', similarImage: visionUrls[0].url};	
}
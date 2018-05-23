const visionAPI = require('../routes/vision-api')

console.log(JSON.stringify(visionAPI.reqObj, undefined, 2))
console.log(visionAPI.visionQuery)
console.log(visionAPI.apiCall)

visionAPI.visionQuery(visionAPI.apiCall, visionAPI.reqObj)

require('dotenv').config();

module.exports = {
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	},
	session: {
		cookieKey: "testtesttest"
	},
	storageBucket: {
		BucketName: process.env.BUCKET_NAME
    },
    googleVision: {
        apiKey: process.env.GOOGLE_CLOUD_VISION
    }

}
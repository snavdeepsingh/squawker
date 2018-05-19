module.exports = {
	google: {
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET
	},
	session: {
		cookieKey: process.env.COOKIE_KEY
	},
	googleVision: {
		apiKey: process.env.GOOGLE_API
	},
	keyFile: {
		private_key: process.env.PRIVATE_KEY
		client_email: process.env.CLIENT_EMAIL
	}
}
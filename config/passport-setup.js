var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./.keys.js");
var db = require('../models');

passport.use(new GoogleStrategy({
    // options for the google strategy object
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, function(accessToken, refreshToken, profile, done){
    // passport callback function
    console.log("passport callback fired");

    console.log(profile);
    db.User.create({
    	username: profile.displayName,
    	imageURL: profile.image
    }).then( result => {
    	console.log(result)
    	return done(result)
    });
}))
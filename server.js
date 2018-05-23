var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var cookieSession = require('cookie-session')
var passport = require('passport');

var passportSetup = require('./config/passport-setup.js');
var keys = require('./config/keys.js')


var PORT = process.env.PORT || 3000;
var app = express();

var db = require("./models");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}))

// For Passport
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/auth-routes.js')(app);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/google-storage-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on: http://localhost:"+PORT);
  });
});

var express = require("express");
var authRoutes = require("./routes/auth-routes.js");
var passportSetup = require("./config/passport-setup.js");

var PORT = process.env.PORT || 3000;
var app = express();

// set up view engine
app.set("view engine", "ejs");

// set up routes
app.use("/auth",authRoutes);

app.get("/", function(req, res){
    res.render("home");
});



app.listen(PORT, function(){
    console.log("app listening on port "+ PORT);
});



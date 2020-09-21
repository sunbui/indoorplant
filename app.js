const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Plant = require("./models/plant"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	flash = require("connect-flash"),
	seedDB = require("./seeds.js");

//requiring routes
const commentRoutes = require("./routes/comments"),
	plantRoutes = require("./routes/plants"),
	indexRoutes = require("./routes/index");

var url = process.env.db || "mongodb://localhost:27017/indoor_plant_1";
mongoose.connect(url);

// mongoose.connect("mongodb+srv://indoor:Hello@2021@cluster0.rqusw.mongodb.net/<dbname>?retryWrites=true&w=majority", {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true,
// }).then(() => {
// 	console.log("connect DB");
// }).catch(err => {
// 	console.log(err);
// });

// mongoose.connect("mongodb://localhost:27017/indoor_plant_1", {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true,
// });
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
// app.use(bodyParser.json());
app.set("view engine");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/plants", plantRoutes);
app.use("/plants/:id/comments", commentRoutes);

// app.listen(3001, function () {
// 	console.log("The indoor plant has started!");
// });


const port = process.env.PORT || 3001;
app.listen(port, function () {
	console.log("The indoor plant has started!");
});
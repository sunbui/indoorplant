var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/", function (req, res) {
  res.render("landing.ejs");
});

// show register form
router.get("/register", function (req, res) {
  res.render("register.ejs");
});
//handle sign up logic
router.post("/register", function (req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register.ejs");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/plants");
    });
  });
});
//show login form
router.get("/login", function (req, res) {
  res.render("login.ejs");
});

// handling login logic
router.post("/login", passport.authenticate("local", {
  successRedirect: "/plants",
  failureRedirect: "/login"
}), function (req, res) {});

// logic route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/plants");
});
//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}



module.exports = router;
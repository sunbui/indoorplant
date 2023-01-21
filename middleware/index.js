const Plant = require("../models/plant"),
 Comment = require("../models/comment");

// all the middleware goes here
let middlewareObj = {};
middlewareObj.checkPlantOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Plant.findById(req.params.id, function (err, foundPlant) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the plant?
                if (foundPlant.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;
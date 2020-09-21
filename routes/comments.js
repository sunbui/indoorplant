const express = require("express"),
  router = express.Router({
    mergeParams: true
  }),
  Plant = require("../models/plant"),
  Comment = require("../models/comment"),
  middleware = require("../middleware");
//Comments New
router.get("/new", isLoggedIn, function (req, res) {
  // find plant by id
  Plant.findById(req.params.id, function (err, plant) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new.ejs", {
        plant: plant,
      });
    }
  });
});
//comment create
router.post("/", middleware.isLoggedIn, function (req, res) {
  //lookup plant using ID
  Plant.findById(req.params.id, function (err, plant) {
    if (err) {
      console.log(err);
      res.redirect("/plants");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          plant.comments.push(comment);
          plant.save();
          res.redirect('/plants/' + plant._id);
        }
      });
    }
  });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit.ejs", {
        plant_id: req.params.id,
        comment: foundComment
      });
    }
  });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/plants/" + req.params.id);
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/plants/" + req.params.id);
    }
  });
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
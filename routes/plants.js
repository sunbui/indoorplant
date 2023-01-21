const express = require("express"),
  router = express.Router(),
  Plant = require("../models/plant"),
  middleware = require("../middleware");


//index
router.get("/", function (req, res) {
  Plant.find({}, function (err, allPlants) {
    if (err) {
      console.log(err);
    } else {
      res.render("plants/index.ejs", {
        plants: allPlants,
      });
    }
  });
});

//CREATE - add new plant to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
  // get data from form and add to plant array
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var created = req.body.created;

  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newPlant = {
    name: name,
    image: image,
    price: price,
    description: desc,
    author: author
  };


  // Create a new plant and save to DB
  Plant.create(newPlant, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect("/plants");
    }
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("plants/new.ejs");
});

//SHOW - shows more info about one plant
router.get("/:id", function (req, res) {
  //find the plant with provided ID
  Plant.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundPlant) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundPlant);
        //render show template with that plant
        res.render("plants/show.ejs", {
          plant: foundPlant,
        });
      }
    });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkPlantOwnership, function (req, res) {
  Plant.findById(req.params.id, function (err, foundPlant) {
    res.render("plants/edit.ejs", {
      plant: foundPlant
    });
  });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkPlantOwnership, function (req, res) {
  // find and update the correct campground
  Plant.findByIdAndUpdate(req.params.id, req.body.plant, function (err, updatedPlant) {
    if (err) {
      res.redirect("/plants");
    } else {
      //redirect somewhere(show page)
      res.redirect("/plants/" + req.params.id);
    }
  });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkPlantOwnership, function (req, res) {
  Plant.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/plants");
    } else {
      res.redirect("/plants");
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
const mongoose = require("mongoose"),
  Comment = require("./models/comment"),
  Plant = require("./models/plant");

var data = [{
    name: "Kaufman Mercantile",
    image: "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description: "beautiful",
  },
  {
    name: "Brian Blum",
    image: "https://images.unsplash.com/photo-1497990571654-77aa8ec36038?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80",
    description: "beautiful",
  },
  {
    name: "Sunny",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
    description: "beautiful",
  },
  {
    name: "Succulent",
    image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description: "beautiful",
  }
];

function seedDB() {
  //Remove all campgrounds
  Plant.remove({}, function (err) {
    // if (err) {
    //   console.log(err);
    // }
    // console.log("removed plants!");
    // Comment.remove({}, function (err) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log("removed comments!");
    //   //add a few campgrounds
    //   data.forEach(function (seed) {
    //     Plant.create(seed, function (err, plant) {
    //       if (err) {
    //         console.log(err)
    //       } else {
    //         console.log("added a plant");
    //         //create a comment
    //         Comment.create({
    //           text: "This place is great, but I wish there was internet",
    //           author: "Homer"
    //         }, function (err, comment) {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             plant.comments.push(comment);
    //             plant.save();
    //             console.log("Created new comment");
    //           }
    //         });
    //       }
    //     });
    //   });
    // });
  });
  //add a few comments
}

module.exports = seedDB;
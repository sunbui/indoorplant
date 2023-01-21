const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  created: {type: Date, default: Date.now},
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model("Plant", plantSchema);
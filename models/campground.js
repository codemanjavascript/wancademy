var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   created: {type: Date, default: Date.now},
   createdAt: { type: Date, default: Date.now },
   views: {type: Number, default: 0},
   likes: {type: Number, default:0},
   dislikes: {type: Number, default:0},
   typeOf: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      profileImage: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
   name: String,
   whatwillyoulearn: String,
   created: {type: Date, default: Date.now},
   createdAt: { type: Date, default: Date.now },
   views: {type: Number, default: 0},
   video: String, 
   doc: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      profileImage: String
   },
   /*Worry about comments later*/
});

module.exports = mongoose.model("Video", videoSchema);
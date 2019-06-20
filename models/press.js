var mongoose = require("mongoose");

var pressSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   created: {type: Date, default: Date.now},
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      profileImage: String
   }
});

module.exports = mongoose.model("Press", pressSchema);
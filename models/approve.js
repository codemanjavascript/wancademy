var mongoose = require("mongoose");

var approveSchema = new mongoose.Schema({
   description: String,
   experience: String,
   profileLink: String,
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

module.exports = mongoose.model("Approve", approveSchema);
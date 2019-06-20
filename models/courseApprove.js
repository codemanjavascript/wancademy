var mongoose = require("mongoose");

var courseApproveSchema = new mongoose.Schema({
   title: String,
   description: String,
   imageLink: String,
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

module.exports = mongoose.model("courseApprove", courseApproveSchema);
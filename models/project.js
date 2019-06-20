var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
   title: String,
   description: String,
   htmlCode: String,
   cssCode: String,
   jsCode: String,
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

module.exports = mongoose.model("Project", projectSchema);
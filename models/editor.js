var mongoose = require("mongoose");

var editorSchema = new mongoose.Schema({
   title: String,
   videoLink: String,
   instructions: String,
   rightTextHTML: String,
   setTextHTML: String,
   intructions: String,
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      profileImage: {type: String, default: "http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1.jpg"}
   },
   answers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Answer"
      }
   ]
   
});

module.exports = mongoose.model("Editor", editorSchema);
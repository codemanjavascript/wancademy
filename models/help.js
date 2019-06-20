var mongoose = require("mongoose");

var helpSchema = new mongoose.Schema({
   question: String,
   answer: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      profileImage: {type: String, default: "http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1.jpg"}
   }
});

module.exports = mongoose.model("Help", helpSchema);
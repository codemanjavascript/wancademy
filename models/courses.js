var mongoose = require("mongoose");

var coursesSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   moreimage: String,
   video: String,
   link: String,
   created: {type: Date, default: Date.now},
   createdAt: { type: Date, default: Date.now },
   views: {type: Number, default: 0},
   likes: {type: Number, default:0},
   dislikes: {type: Number, default:0},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
       profileImage: {type: String, default: "http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1.jpg"}
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Course", coursesSchema);
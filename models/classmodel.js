// var mongoose = require("mongoose");

// var classesSchema = new mongoose.Schema({
//    name: String,
//    image: String,
//    bannerImage: String,
//    description: String,
//    created: {type: Date, default: Date.now},
//    createdAt: { type: Date, default: Date.now },
//    author: {
//       id: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User"
//       },
//       username: String,
//       profileImage: String
//    },
//    posts: [
//    {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Post"
//    }   
//    ]
// });

// module.exports = mongoose.model("Class", classesSchema);
var mongoose = require("mongoose");

var classSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
      profileImage: {type: String, default: "http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1.jpg"}
   },
   posts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
      }
   ]
});

module.exports = mongoose.model("Class", classSchema);
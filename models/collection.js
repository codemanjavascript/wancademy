var mongoose = require("mongoose");

var collectionSchema = mongoose.Schema({
    name: String,
     author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String,
       profileImage: {type: String, default: "http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1.jpg"}
   },
    flashcards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flashcard"
        }
    ]
});


module.exports = mongoose.model("Collection", collectionSchema);
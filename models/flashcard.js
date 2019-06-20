var mongoose = require("mongoose");

var flashcardSchema = mongoose.Schema({
    name: String,
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

module.exports = mongoose.model("Flashcard", flashcardSchema);


/*---Front
falshcard.question

---Back
flashcard.answer*/
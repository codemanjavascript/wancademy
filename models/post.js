var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
    name: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
         profileImage: {type: String, default: "http://valleyosteopathy.com.au/wp-content/uploads/2013/11/facebook-default-no-profile-pic1.jpg"}
    },
    createdAt: { type: Date, default: Date.now },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
    ]
});

module.exports = mongoose.model("Post", postSchema);

/*<div class="delete-form">
                    <a href="/classes/<%= classes._id %>/edit"><button  class="button3-md">Edit</button ></a>
                    <form class="delete-form" action="/classes/<%= classes._id %>?_method=DELETE" method="POST">
                            <button class="button5-md" id="delete">Delete</button>
                        </form>
            </div>*/
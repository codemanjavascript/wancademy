var express    = require("express");
var middleware = require("../middleware");
var Forum = require("../models/forums");
var Answer = require("../models/answers");
var router = express.Router({mergeParams: true});

//answers New
router.get("/new", isLoggedIn, function(req, res){

    Forum.findById(req.params.id, function(err, forum){
        if(err){
            console.log(err);
        } else {
             res.render("answers/new", {forum: forum});
        }
    })
});

// Create
router.post("/", isLoggedIn,function(req, res){
   //lookup campground using ID
   Forum.findById(req.params.id, function(err, forum){
       if(err){
           console.log(err);
           res.redirect("/");
       } else {
        Answer.create(req.body.answer, function(err, answer){
           if(err){
               req.flash("error", "Something went wrong: Please Email Us");
               console.log(err);
           } else {
               //add username and id to comment
               answer.author.id = req.user._id;
               answer.author.username = req.user.username;
               //save comment
               answer.save();
               forum.answers.push(answer);
               forum.save();
               console.log(answer);
               req.flash("success", "Successfully Added Comment");
               res.redirect('/forums/' + forum._id);
           }
        });
       }
   });
});

// Answer EDIT ROUTE
router.get("/:answer_id/edit", function(req, res){
   Answer.findById(req.params.answer_id, function(err, foundAnswer){
      if(err){
          console.log(err);
          res.redirect("back");
      } else {
        res.render("answers/edit", {forum_id: req.params.id, answer: foundAnswer});
      }
   });
});


// answer UPDATE
router.put("/:answer_id", function(req, res){
   Answer.findByIdAndUpdate(req.params.answer_id, req.body.answer, function(err, updatedAnswer){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/forums/" + req.params.id);
      }
   });
});

// answer DESTROY ROUTE
router.delete("/:answer_id", function(req, res){
    //findByIdAndRemove
    Answer.findByIdAndRemove(req.params.answer_id, function(err){
       if(err){
           res.redirect("/");
       } else {
           req.flash("success", "Your answer has been Deleted");
           res.redirect("/forums/" + req.params.id);
       }
    });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;
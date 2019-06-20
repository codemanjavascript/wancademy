var express = require("express");
var router  = express.Router({mergeParams: true});
var ClassModel = require("../models/classmodel");
var Post = require("../models/post");


router.get("/new", isLoggedIn, function(req, res){
    ClassModel.findById(req.params.id, function(err, foundClass) {
        if(err) {
            return err;
        }
        res.render("classPosts/new", {foundClass: foundClass});
    });
});

router.post("/", isLoggedIn, function(req, res){
   //Lookup class using ID
   ClassModel.findById(req.params.id, function(err, foundClass){
       if(err){
           console.log(err); 
           res.redirect("/404");
       } else {
           /*Try Changing req.body.posts to req.body.classPost*/
            Post.create(req.body.post, function(err, post){
               if(err){
                  req.flash(err, "An error has arised");
                  console.log(err);  
                  res.redirect("/404");
               } else {
                   post.author = {
                       id: req.user._id,
                       username: req.user.username,
                       profileImage: req.user.image
                   }
               //save comment
               post.save();
               foundClass.posts.push(post);
               foundClass.save();
               console.log(post);
               req.flash("success", "Successfully added comment");
                   res.redirect("/classes/" + req.params.id);
               }   
            });
       }
   });
});

router.get("/comments/new", function(req, res) {
    res.render("")
});

router.post("/comments", function(req, res) {
    
});
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    req.flash("error", "Please log in first");
    res.redirect('/login');
}


module.exports = router;
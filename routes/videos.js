var express = require("express");
var router  = express.Router();
var Video   = require("../models/videos");
var middleware = require("../middleware");
var User = require("../models/user");

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    req.flash("err", "You need to register or login first.")
    res.redirect('/login');
}


//INDEX for HTML  - show all videos

router.get("/html", function(req, res){
    Video.find({}, function(err, allVideos){
       if(err){
           console.log(err);
           res.redirect("/404")
       } else {
           res.render("courses-html/html/index", {videos:allVideos}) 
       }
    });
});

//CREATE - add new video to DB
router.post("/html", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var whatwillyoulearn = req.body.whatwillyoulearn;
    var video = req.body.video;
    var doc = req.body.doc;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newlyCreatedVideo = {name: name, whatwillyoulearn:whatwillyoulearn, video:video, doc:doc, author:author,currentUser: req.user};
    // Create a new campground and save to DB
    Video.create(newlyCreatedVideo, function(err, newlyCreatedVideo){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            res.redirect("/html");
        }
    });
});

//NEW - show form to create new video
router.get("/new-video-html", middleware.isLoggedIn, function(req, res){
   res.render("courses-html/html/new.ejs"); 
}); 

// SHOW - shows more info about one video
router.get("/html/:id", function(req, res){
    Video.findById(req.params.id).populate("question").exec(function(err, foundVideo){
        if(err){
            console.log(err);
            res.redirect("/404");
        } else {
            res.render("courses-html/html/show", {videos:foundVideo});
        }
    });
});


module.exports = router;


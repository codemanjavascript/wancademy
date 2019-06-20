var express = require("express");
var router  = express.Router();
var Editor = require("../models/editor");
var User = require("../models/user");
var middleware = require("../middleware");

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    req.flash("err", "You need to register or login first.")
    res.redirect('/login');
}



//INDEX for Editor

router.get("/", function(req, res){
    Editor.find({}, function(err, allEditors){
       if(err){
           console.log(err);
           res.redirect("/404");
       } else {
           res.render("editor/index", {editor:allEditors}); 
       }
    });
});

//CREATE press page
router.post("/", isLoggedIn,function(req, res){
    // get data from form and add to campgrounds array
    var title = req.body.title;
    var videoLink = req.body.videoLink;
    var instructions = req.body.instructions;
    var rightTextHTML = req.body.notes;
    var setTextHTML = req.body.notes;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newlyCreatedEditor = {rightTextHTML:rightTextHTML, setTextHTML:setTextHTML, title:title, videoLink: videoLink, instructions:instructions, author:author,currentUser: req.user};
    // Create a new campground and save to DB
    Editor.create(newlyCreatedEditor, function(err, newlyCreatedEditor){
        if(err){
            console.log(err);
            res.redirect("/404");
        } else {
            res.redirect("/editor/learn/" + newlyCreatedEditor._id);
        }
    });
});

router.get("/learn/:id", function(req, res){
    Editor.findById(req.params.id, function(err, foundEditor){
        if(err){
            console.log(err);
            res.redirect("/404");
        } else {
            res.render("editor/show", {editor:foundEditor});
        }
    });
});




router.get("/new", isLoggedIn, function(req, res){
    res.render("editor/new");

});



module.exports = router;

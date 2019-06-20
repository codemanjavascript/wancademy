//route for press
var express = require("express");
var router  = express.Router();
var Help = require("../models/help");
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



//INDEX for Press

router.get("/all", function(req, res){
    Help.find({}, function(err, allHelp){
       if(err){
           console.log(err);
           res.redirect("/404");
       } else {
           res.render("support/index", {helps:allHelp}); 
       }
    });
});

//CREATE press page
router.post("/all", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var question = req.body.question;
    var answer = req.body.answer;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newlyCreatedHelp = {name: name, question:question, answer:answer, author:author,currentUser: req.user};
    // Create a new campground and save to DB
    Help.create(newlyCreatedHelp, function(err, newlyCreatedHelp){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            res.redirect("/help/all");
        }
    });
});


router.get("/new", isLoggedIn, function(req, res){
    res.render("support/new");

});



module.exports = router;


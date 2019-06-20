//route for press
var express = require("express");
var router  = express.Router();
var Press = require("../models/press");
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
    Press.find({}, function(err, allPress){
       if(err){
           console.log(err);
           res.redirect("/404");
       } else {
           res.render("press/index", {presses:allPress}); 
       }
    });
});

//CREATE press page
router.post("/all", function(req, res){
    // get data from form and add to press array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newlyCreatedPress = {name: name, image:image, description:description, author:author,currentUser: req.user};
    // Create a new campground and save to DB
    Press.create(newlyCreatedPress, function(err, newlyCreatedPress){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            res.redirect("/press/all");
        }
    });
});


// SHOW - shows more info about one video
router.get("/:id", function(req, res){
    Press.findById(req.params.id , function(err, foundPress){
        if(err){
            console.log(err);
            res.redirect("/404");
        } else {
            res.render("press/show", {press:foundPress});
        }
    });
});




module.exports = router;


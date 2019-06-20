//route for press
var express = require("express");
var router  = express.Router();
var Project = require("../models/project");
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

/*index show all projects*/
router.get("/", function(req, res){
    res.render("projects/index");
});

/*show: show each project with code and result*/
router.get("/new", function(req,res){
    var title 
    res.render("projects/new")
});


// //CREATE - add new campground to DB
// router.post("/", middleware.isLoggedIn, function(req, res){
//     // get data from form and add to campgrounds array
//     var name = req.body.name;
//     var price = req.body.price;
//     var image = req.body.image;
//     var desc = req.body.description;
//     var email= req.body.email;
//     var typeOf = req.body.typeOf;
//     var author = {
//         id: req.user._id,
//         username: req.user.username,
//         profileImage: req.user.image
//     };
//     var newCampground = {name: name, price: price, image: image, description: desc, email:email, author:author,currentUser: req.user, typeOf:typeOf};
//     // Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             console.log(newlyCreated);
//             res.redirect("/campgrounds/"+ newlyCreated._id);
//         }
//     });
// });


/*show: show each project with code and result*/
router.get("/:id", function(req,res){
    res.render("projects/index")
});

/*new: create new project and be able to save code data*/



module.exports = router;


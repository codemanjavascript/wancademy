var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var ClassModel = require("../models/classmodel");
var Courses = require("../models/courses");
var User = require("../models/user");
var Approve = require("../models/approve");
var courseApprove = require("../models/courseApprove");

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    req.flash("err", "You need to register or login first.")
    res.redirect('/login');
}


//INDEX - show all campgrounds

router.get("/", isLoggedIn, function(req, res){
    Campground.find({}, null, {sort: {views: 1}}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
            ClassModel.find(function(err, allClasses){
                if(err){
                    req.flash(err, "There was an error showing the classes");
                    console.log(err);
                } else {
                    Courses.find(function(err, allCourses){
                        if(err){
                            console.log(err);
                                } else {
                                    User.findById(req.params.id).populate('friends').exec(function(err, user) {
                                        if(err) {
                                            console.log(err);
                                        } else {
                                            Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
                                                if(err){
                                                    console.log(err);
                                                 } else {
                                                     courseApprove.find({}, function(err, allCourses){
                                                           if(err){
                                                               console.log(err);
                                                               res.redirect("/404");
                                                           } else {
                                                              Approve.find({}, function(err, allApprovals){
                                                                if(err){
                                                                    console.log(err);
                                                                    res.redirect("/404");
                                                                } else {
                                                                    User.findById(req.params.id).populate('friends').exec(function(err, user) {
                                                                        if(err) {
                                                                            console.log(err);
                                                                            res.redirect("/404");
                                                                        } else {
                                                                            res.render("dashboard/index", {user:user, coursesApproved:allCourses, approvals:allApprovals, courses:allCourses,classes:allClasses,campgrounds:allCampgrounds, currentUser: req.user});
                                                    
                                                                        }
                                                                    });
                                                                        
                                                                }
                                                            });
                                                           }
                                                        });
                                                    
                                                }
                                     });
                                }
                            });
                            
                         }
                     });
                }
         });
       }
    });
});


//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var email= req.body.email;
    var typeOf = req.body.typeOf;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newCampground = {name: name, price: price, image: image, description: desc, email:email, author:author,currentUser: req.user, typeOf:typeOf};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds/"+ newlyCreated._id);
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("courses/new"); 
}); 

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // increment and save campground prior to rendering view
            foundCampground.views++;
            
            foundCampground.save();
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// note from ian, this route needs to have an :id in it, like this: /likes/:id
// otherwise you can't access req.params.id
//Response, Thanks. I forgot that each likes is unique! :)
router.get("/likes/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            foundCampground.likes++;
            foundCampground.save();
            res.json(foundCampground);
            
        }
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            
        } else {
        res.render("campgrounds/edit", {campground: foundCampground, currentUser: req.user});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");  
}

module.exports = router;


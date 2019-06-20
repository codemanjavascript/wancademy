var express = require("express");
var router  = express.Router();
var Courses = require("../models/courses");
var middleware = require("../middleware");


function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");  
}


//INDEX/Courses - show all campgrounds

router.get("/", function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Courses.find({name:regex},function(err, allCourses){
               if(err){
                   console.log(err);
               } else {
                  res.render("courses/index", {courses:allCourses, currentUser: req.user});
               }
            });
    } else {
           Courses.find({},function(err, allCourses){
               if(err){
                   console.log(err);
               } else {
                  res.render("courses/index", {courses:allCourses, currentUser: req.user});
               }
            });
    }
});


//CREATE/ course - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var moreimage = req.body.moreimage;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    
    var newCourse = {moreimage:moreimage,name: name, image: image, description: desc, author:author,currentUser: req.user};
    // Create a new campground and save to DB
    Courses.create(newCourse, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/courses/"+ newlyCreated._id);
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
    Courses.findById(req.params.id).populate("comments").exec(function(err, foundCourses){
        if(err){
            console.log(err);
        } else {
            console.log(foundCourses);
            foundCourses.views++;
            foundCourses.save();
            res.render("courses/show", {course: foundCourses});
        }
    });
});
// EDIT COurses ROUTE
router.get("/:id/edit", function(req, res){
    Courses.findById(req.params.id, function(err, foundCourses){
        if(err){
            console.log(err)
        } else {
        res.render("courses/edit", {course: foundCourses, currentUser: req.user});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
    // find and update the correct campground
    Courses.findByIdAndUpdate(req.params.id, req.body.course, function(err, updatedCourse){
       if(err){
           res.redirect("/courses");
       } else {
           //redirect somewhere(show page)
           res.redirect("/courses/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",  function(req, res){
   Courses.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/courses");
      } else {
          res.redirect("/courses");
      }
   });
});

module.exports = router;

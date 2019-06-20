var express    = require("express");
var router     = express.Router();
var ClassModel = require("../models/classmodel");
var Post       = require("../models/post");
var middleware = require("../middleware");

//INDEX/Courses - show all Classes

function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");  
}


router.get("/", function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        ClassModel.find({name:regex}, function(err, allClasses){
           if(err){
               console.log(err);
               res.redirect("/404");
           } else {
              res.render("classes/index", {classes:allClasses});
           }
        });
    } else {
        ClassModel.find({}, function(err, allClasses){
           if(err){
               console.log(err);
               res.redirect("/404");
           } else {
              res.render("classes/index", {classes:allClasses});
           }
        });
    }
});


//CREATE/ course - add new class to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to classes array
    var name = req.body.name;
    var bannerImage = req.body.bannerImage;
    var desc = req.body.description;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newClass = {name: name, image:image, bannerImage: bannerImage, description: desc, author:author,currentUser: req.user};
    // Create a new class and save to DB
    ClassModel.create(newClass, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            //redirect back to class page
            console.log(newlyCreated);
            res.redirect("/classes/"+ newlyCreated._id);
        }
    });
});

//NEW - show form to create new class
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("classes/new" ); 
}); 

// SHOW - shows more info about one class
router.get("/:id", function(req, res){
 
    //find the campground with provided ID
    /*Maybe populate with something else*/
    ClassModel.findById(req.params.id).populate("posts").exec(function(err, foundClass){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            console.log(foundClass)
            res.render("classes/show", {classes: foundClass});
        }
    });
});

// SHOW About - shows more info about one class
router.get("/:id/about", function(req, res){
    //find the campground with provided ID
    /*Maybe populate with something else*/
    ClassModel.findById(req.params.id).populate("posts").exec(function(err, foundClass){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            console.log(foundClass)
            res.render("classes/about", {classes: foundClass});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", function(req, res){
    ClassModel.findById(req.params.id, function(err, foundClasses){
        if(err){
            console.log(err)
        } else {
            res.render("classes/edit", {Class: foundClasses, currentUser: req.user});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
    // find and update the correct campground
    ClassModel.findByIdAndUpdate(req.params.id, req.body.classes, function(err, updatedClasses){
       if(err){
           res.redirect("/classes");
       } else {
           //redirect somewhere(show page)
           res.redirect("/classes/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res){
   ClassModel.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/classes");
      } else {
          res.redirect("/classes");
      }
   });
});

module.exports = router;
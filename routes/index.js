var express = require("express");
var router     = express.Router();
var passport = require("passport");
var Courses = require("../models/courses");
var User = require("../models/user");
var Comment = require("../models/comment");
var Campground = require("../models/campground");
var Flashcard  = require("../models/flashcard");
var Collection  = require("../models/collection");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var Help = require("../models/help");
var Forum = require("../models/forums");
var middleware = require("../middleware");
var Approve = require("../models/approve");
var courseApprove = require("../models/courseApprove");

function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");  
}

//////*Mathematical Courses*//////

/*pre-algebra*/
router.get("/pre-algebra", function(req, res) {
    res.render("mathematics/pre-algebra.ejs") 
 });

/*algebra 1*/
router.get("/algebra-1", function(req, res) {
    res.render("mathematics/algebra-1") 
 });

 /*geometry*/
router.get("/geometry", function(req, res) {
    res.render("mathematics/geometry") 
 });

 /*algebra 2*/
router.get("/algebra-2", function(req, res) {
    res.render("mathematics/algebra-2") 
 });






/*biology*/
router.get("/biology", function(req, res) {
   res.render("biology/index") 
});
/*chemistry*/
router.get("/chemistry", function(req, res) {
   res.render("chemistry/index") 
});
/*physics*/
router.get("/physics", function(req, res) {
   res.render("physics/index") 
});


router.get("/editor/introduction-to-frontend", function(req, res) {
   res.render("editor/introductiontofrontend") ;
});

router.get("/editor/introductiontohtml/documentandtags", function(req, res) {
   res.render("editor/documentandheading") ;
});

router.get("/editor/introductiontohtml/headingsandparagraph", function(req, res) {
    res.render("editor/headingsandparagraph");
});

router.get("/editor/introductiontohtml/links", function(req, res) {
    res.render("editor/links");
});

router.get("/editor/introductiontohtml/images", function(req, res) {
    res.render("editor/images");
});

router.get("/editor/introductiontohtml/buttons", function(req, res) {
    res.render("editor/buttons");
});

router.get("/editor/introductiontohtml/lists", function(req, res) {
    res.render("editor/lists");
});



router.get("/editor/introductiontohtml/inline-style", function(req, res) {
    res.render("editor/inline-style");
});

router.get("/editor/introductiontohtml/commentdivs", function(req, res) {
    res.render("editor/commentdivs");
});

router.get("/editor/introductiontohtml/wrap", function(req, res) {
    res.render("editor/wrap");
});


router.get("/paths/front-end", function(req, res) {
   res.render("paths/front-end"); 
});

router.get("/paths/back-end", function(req, res) {
   res.render("paths/back-end"); 
});

router.get("/paths/design", function(req, res) {
   res.render("paths/design"); 
});

router.get("/paths/game", function(req, res) {
   res.render("paths/game"); 
});

router.get("/experiment-2", function(req, res) {
    res.render("experiment-2");
})
router.get("/admin", function(req, res) {
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
                        res.render("admin/index", {user:user,coursesApproved:allCourses, approvals:allApprovals}); 
                    }
                });
                    
            }
        });
       }
    });
});

router.get("/delete-profile/confirm", function(req, res) {
   res.render("delete-profile-confirm") 
});

router.get("/courses/submit", function(req, res){
    res.render("courses/submit")
});

/*New put in index*/

// SHOW - shows more info about one video
router.get("/press/new", function(req, res){
    res.render("press/new");
});


//CREATE press page
router.post("/courses/submit", function(req, res){
    // get data from form and add to press array
    var title = req.body.title;
    var imageLink = req.body.imageLink;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newlyCreatedCourseApproval = {title:title, imageLink:imageLink, description:description, author:author,currentUser: req.user};
    // Create a new campground and save to DB
    courseApprove.create(newlyCreatedCourseApproval, function(err, newlyCreatedCourseApproval){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            res.redirect("/course-submitted");
        }
    });
});

/*Premium*/
router.get("/course-submitted", function(req, res) {
   res.render("courses/submitted"); 
});


/*Premium*/
router.get("/premium", function(req, res) {
   res.render("premium"); 
});

/*Educators Approve*/
router.get("/educators/approve", function(req, res) {
    res.render("getstartedPages/educators-approve");
});

//CREATE press page
router.post("/educators/approve", function(req, res){
    // get data from form and add to press array
    var experience = req.body.experience;
    var profileLink = req.body.profileLink;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newlyCreatedApproval = {experience:experience, profileLink:profileLink, description:description, author:author,currentUser: req.user};
    // Create a new campground and save to DB
   Approve.create(newlyCreatedApproval, function(err, newlyCreatedApproval){
        if(err){
            console.log(err);
            res.redirect("/404")
        } else {
            res.redirect("/approval-finish");
        }
    });
});

router.get("/approval-finish", function(req, res) {
    res.render("approvalFinish")
})

router.get("/help", function(req, res) {
   res.render("frequently-asked-questions");
});

router.get("/community-guidelines", function(req, res) {
    res.render("community-guidelines");
});

router.get("/success-donate", function(req, res) {
    res.render("success-donate");
});

router.get("/paypal", function(req, res) {
    res.render("paypal");
});


/*Take the tour*/
router.get("/educators-dashboard-instructions", function(req, res) {
    res.render("educators-dashboard-instructions");
});

/*paths*/
router.get("/paths", isLoggedIn, function(req, res) {
    res.render("recommendations/paths")
});

/*Course quiz*/
router.get("/course-help",isLoggedIn, function(req, res) {
   res.render("recommendations/course-help.ejs");
});

/*Course quiz leading to sites and games*/
router.get("/recommendations/sitesandgames",isLoggedIn, function(req, res) {
   res.render("recommendations/sitesandgames/sites&games");
});

router.get("/recommendations/sitesandgames/beginner",isLoggedIn, function(req, res) {
   res.render("recommendations/sitesandgames/beginner");
});

router.get("/recommendations/sitesandgames/intermediate",isLoggedIn, function(req, res) {
   res.render("recommendations/sitesandgames/intermediate");
});

router.get("/recommendations/sitesandgames/advanced",isLoggedIn, function(req, res) {
   res.render("recommendations/sitesandgames/advanced");
});

router.get("/recommendations/sitesandgames/notsure",isLoggedIn, function(req, res) {
   res.render("recommendations/sitesandgames/notsure");
});

router.get("/recommendations/companyandecommerce",isLoggedIn, function(req, res) {
   res.render("recommendations/companyandecommerce/company&ecommerce");
});

router.get("/recommendations/companyandecommerce/beginner",isLoggedIn, function(req, res) {
   res.render("recommendations/companyandecommerce/beginner");
});

router.get("/recommendations/companyandecommerce/intermediate",isLoggedIn, function(req, res) {
   res.render("recommendations/companyandecommerce/intermediate");
});

router.get("/recommendations/companyandecommerce/advanced",isLoggedIn, function(req, res) {
   res.render("recommendations/companyandecommerce/advanced");
});

router.get("/recommendations/companyandecommerce/notsure",isLoggedIn, function(req, res) {
   res.render("recommendations/companyandecommerce/notsure");
});

router.get("/recommendations/advancecodingskills",isLoggedIn, function(req, res) {
   res.render("recommendations/advancecodingskills/advancecodingskills");
});

router.get("/recommendations/advancecodingskills/backend",isLoggedIn, function(req, res) {
   res.render("recommendations/advancecodingskills/backend");
});

router.get("/recommendations/advancecodingskills/animateanddesign",isLoggedIn, function(req, res) {
   res.render("recommendations/advancecodingskills/animateanddesign");
});

router.get("/recommendations/advancecodingskills/websites",isLoggedIn, function(req, res) {
   res.render("recommendations/advancecodingskills/websites");
});

router.get("/recommendations/advancecodingskills/notsure",isLoggedIn, function(req, res) {
   res.render("recommendations/advancecodingskills/notsure");
});





/*Course quiz leading to sites and games*/
router.get("/recommendations/advancecodingskills",isLoggedIn, function(req, res) {
   res.render("recommendations/advancecodingskills.ejs");
});

/*Course quiz leading to sites and games*/
router.get("/recommendations/notsure",isLoggedIn, function(req, res) {
   res.render("recommendations/notsure.ejs");
});

router.get("/mongoDB", function(req, res) {
   res.render("courses-html/mongoDB.ejs"); 
});

router.get("/beginner", function(req, res) {
   res.render("progressiveLearning/beginner.ejs"); 
});

router.get("/intermediate", function(req, res) {
   res.render("levels/intermediate.ejs"); 
});

router.get("/advanced", function(req, res) {
   res.render("levels/advanced.ejs"); 
});

router.get("/nodejs", function(req, res) {
   res.render("courses-html/introtonode.ejs"); 
});
router.get("/CRUD", function(req, res) {
   res.render("courses-html/CRUD.ejs"); 
});
//Intro to backend
router.get("/intro-to-backend", function(req, res) {
   res.render("courses-html/introtobackend.ejs");
});
//Code editors
router.get("/code-editors", function(req, res) {
    res.render("courses-html/codeeditors/codeeditors.ejs");
});
//
router.get("/uploadWebsite", function(req, res) {
    res.render("courses-html/uploadWebsite.ejs");
});

/*Donate*/
router.get("/donate", function(req, res) {
   res.render("donate.ejs"); 
});

/*Google form page for contributors*/
router.get("/helpcontribute", function(req, res) {
   res.render("googleform.ejs"); 
});

/*About US Page*/
router.get("/aboutus", function(req, res) {
   res.render("aboutus.ejs"); 
});

/*Contributers Page*/
router.get("/contributors", function(req, res) {
   res.render("contributors.ejs"); 
});


/*NEWS CODE*/

/*News Page*/
router.get("/press", function(req, res) {
   res.render("press.ejs"); 
});




/*Supporters Page */
router.get("/supporters", function(req, res) {
   res.render("supporters.ejs"); 
});

/*Terms of Service*/
router.get("/termsofservice", function(req, res) {
   res.render("termsofservice.ejs"); 
});



/*Calculator Code*/
router.get("/calculator", function(req, res) {
   res.render("calculator") 
});

/*Get started for students*/
router.get("/getstarted/students", function(req, res) {
     Courses.find({},function(err, allCourses){
               if(err){
                   console.log(err);
               } else {
                  res.render("getstarted/students", {courses:allCourses, currentUser: req.user});
               }
        });
});

/*Get started for teachers*/
router.get("/getstarted/educators", function(req, res) {
   res.render("getstartedPages/teachers"); 
});



/*Forum Code*/
router.get("/forums", isLoggedIn, function(req, res) {
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Forum.find({name:regex}, function(err, allForums){
            if(err){
                res.redirect("/");
                console.log(err);
            } else {
                res.render("forum/index", {forums: allForums}); 
            }
        });
    } else {
        Forum.find({}, function(err, allForums){
            if(err){
                res.redirect("/");
                console.log(err);
            } else {
                res.render("forum/index", {forums: allForums}); 
            }
        });
    }
});



//CREATE - add new forum to DB
router.post("/forums", function(req, res){
    // get data from form and add to forum array
    var name = req.body.name;
    var question = req.body.question;
    var notes = req.body.notes;
    var author = {
        id: req.user.id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newForum = {name: name, notes: notes, question:question, author: author, currentUser: req.user};
    // Create a new forum and save to DB
    Forum.create(newForum, function(err, newlyCreated){
        if(err){
            res.redirect("/");
            console.log(err);
        } else {
            var author = {
              id: req.user.id,
              username: req.user.username
            };
            //redirect back to forum page
            console.log(newlyCreated);
            res.redirect("/forums/" + newlyCreated._id);
        }
    });
});

//NEW - show form to create new forum
router.get("/forums/new", isLoggedIn, function(req, res){
   res.render("forum/new"); 
}); 

// SHOW - shows more info about one forum
router.get("/forums/:id", function(req, res){
    //find the campground with provided ID
    Forum.findById(req.params.id).populate("answers").exec(function(err, foundForum){
        if(err){
            console.log(err);
        } else {
            console.log(foundForum);
            res.render("forum/show", {forum: foundForum});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/forums/:id/edit", function(req, res){
    Forum.findById(req.params.id, function(err, foundForum){
        if(err){
            console.log(err);
        } else {
            res.render("forum/edit", {forum: foundForum, currentUser: req.user});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/forums/:id", function(req, res){
    // find and update the correct campground
    Forum.findByIdAndUpdate(req.params.id, req.body.forum, function(err, updatedForum){
       if(err){
           res.redirect("/");
       } else {
           //redirect somewhere(show page)
           res.redirect("/forums/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/forums/:id", function(req, res){
   Forum.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/");
      } else {
          req.flash("err", "Deleted campground")
          res.redirect("/forums");
      }
   });
});

router.get("/forums-getstarted", function(req, res) {
   res.render("forum-started"); 
});


/*Teacher Emails.*/

router.get("/admin/teacher-emails/new", function(req, res){
    res.render("teacherEmails/teacher-emails");
});

router.post('/teacher-email', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'wancademy@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'TWCubing@gmail.com',
        subject: 'Wancademy Teacher Code',
        text: 'You are receiving this because you (or someone else) have requested a educators code.\n\n' +
          'Please copy the following code, and paste this into your "Educators code" section in the register form to complete the process: TW101480fj\n\n' +
          'If you did not request this, please ignore this email. \n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        res.redirect("/entereducatorscode");
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/admin/teacher-emails/new');
  });
});




/*Flashcard Stuff*/
router.get("/collections/:id/study-flashcards", function(req, res) {
    Collection.findById(req.params.id).populate("flashcards").exec(function(err, collection){
      if(err){
            res.redirect("/collections");
      } else {
            res.render("study", {collection: collection});
      }
   });
    /*Flashcard.findById(req.params.flashcard_id, function(err, foundFlashcard){
      if(err){
          console.log(err)
          res.redirect("back");
      } else {
          res.render("study", {flashcard: foundFlashcard, collection_id: req.params.id});
        }
    });*/
});

router.get("/404", function(req, res) {
   res.render("error"); 
});

/*Flashcard New Routes*/
router.get("/collections/new", function(req, res) {
    res.render("collections/new");
});


/*Show all route*/
router.get("/collections", function(req, res){
      if(req.query.search){
          const regex = new RegExp(escapeRegex(req.query.search), 'gi');
          Collection.find({name:regex},function(err, collections) {
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            } else {
                Flashcard.find(function(err, flashcards){
                    if(err){
                        console.log(err);
                        res.redirect("/campgrounds");
                    } else {
                        res.render("collections/index", {flashcard: flashcards,collections:collections}); 
                    }
                });
            }
        });
        } else {
          Collection.find(function(err, collections) {
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            } else {
                Flashcard.find(function(err, flashcards){
                    if(err){
                        console.log(err);
                        res.redirect("/campgrounds");
                    } else {
                        res.render("collections/index", {flashcard: flashcards,collections:collections}); 
                    }
                });
            }
        });
        
        
        }
    
});

router.post("/collections", function(req, res) {
    var amount = Number(req.body.amount);
    var counter = 0;
    var name = req.body.name;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
        profileImage: req.user.image
    };
    var newCollection = {name: name, description: desc, author:author,currentUser: req.user};
    Collection.create(newCollection, function(err, collection) {
        if(err) {
            req.flash('error', "There was a problem creating the flashcard!");
            res.redirect("/collections/new");
        }
        for(var i = 0; i < amount; i++) {
            Flashcard.create({}, function(err, newFlashcard){
                if(err){
                     req.flash('error', "There was a problem creating the flashcard!");
                    res.render("/collections/new");
                } else {
                    var author = {
                        id: req.user._id,
                         username: req.user.username
                    };
                     req.body.author = author;
                    collection.flashcards.push(newFlashcard);
                    counter+=1;
                    if(counter === amount) {
                        collection.save();
                        res.redirect("/collections/" + collection.id);
                        req.flash('success', "Created your set! You may stard editing them!");
                    }
                }
            });
        } 
    });
});

router.post("/newflashcard", function(req, res) {
     Collection.findById(req.params.id).populate("flashcards").exec(function(err, collection){
      if(err){
            res.redirect("/collections");
            console.log(err);
      } else {
             Flashcard.create({}, function(err, newFlashcard){
                if(err){
                     req.flash('error', "There was a problem creating the flashcard!");
                    res.render("/collections/new");
                } else {
                    var author = {
                        id: req.user._id,
                         username: req.user.username
                    };
                     req.body.author = author;
                    collection.flashcards.push(newFlashcard);
                        collection.save();
                        res.redirect("/");
                        req.flash('success', "Created your set! You may stard editing them!");
                    
                }
            });
      }
   });
});

//Find the collection

//Create a empty popup flashcard 

//redirect to show page with ID


router.get("/collections/:id", function(req, res){
   Collection.findById(req.params.id).populate("flashcards").exec(function(err, collection){
      if(err){
            res.redirect("/collections");
      } else {
            res.render("collections/show", {collection: collection});
      }
   });
});


/*Trying to get edit to work*/
router.get("/collections/:id/flashcards/:flashcard_id/edit", function(req, res){
   Flashcard.findById(req.params.flashcard_id, function(err, foundFlashcard){
      if(err){
          console.log(err)
          res.redirect("back");
      } else {
          res.render("collections/flashcards/edit", {flashcard: foundFlashcard, collection_id: req.params.id});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/collections/:id/flashcards/:flashcard_id", function(req, res){
    // find and update the correct campground
    Flashcard.findByIdAndUpdate(req.params.flashcard_id, req.body.flashcard, function(err, updatedFlashcard){
       if(err){
           console.log(err);
           res.redirect("/collections");
       } else {
           //redirect somewhere(show page)
           res.redirect("/collections/" + req.params.id);
       }
    });
});

// DESTROY Flashcard ROUTE
router.delete("/collections/:id/flashcards/:flashcard_id" , function(req, res){
    
   Flashcard.findByIdAndRemove(req.params.flashcard_id, function(err){
      if(err){
          console.log(err);
          res.redirect("back");
      } else {
          req.flash("success", "Comment Deleted");
          res.redirect("/collections/" + req.params.id);
      }
   });
});


/*Flashcard Routes End*/

//Experimental Route
router.get("/experiment", function(req, res){
     Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("experiment" , {campgrounds:allCampgrounds, currentUser: req.user});
          }
       
    });
});



//Language Arts
router.get("/la", function(req, res){
     Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("courses-html/la" , {campgrounds:allCampgrounds, currentUser: req.user});
          }
       
    });
  
});

//Science
router.get("/science", function(req, res){
     Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("courses-html/science" , {campgrounds:allCampgrounds, currentUser: req.user});
          }
       
    });
  
});

//Music
router.get("/music", function(req, res){
     Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("courses-html/music" , {campgrounds:allCampgrounds, currentUser: req.user});
          }
       
    });
  
});

//Math
router.get("/math", function(req, res){
     Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("courses-html/math" , {campgrounds:allCampgrounds, currentUser: req.user});
          }
       
    });
  
});

//Programming
router.get("/code", function(req, res){
     Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("courses-html/coding/code" , {campgrounds:allCampgrounds, currentUser: req.user});
          }
    });
  
});

//Art
router.get("/art", function(req, res){
     Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("courses/art" , {campgrounds:allCampgrounds, currentUser: req.user});
          }
       
    });
  
});


router.get("/post-content", function(req, res) {
    res.render("post-content");
});


//root route
router.get("/", function(req, res){
    if (req.user) {
    res.render("dashboard/index");
} else {
    Collection.find({},function(err, collections) {
            if(err){
                console.log(err);
                res.redirect("/");
            } else {
                Flashcard.find(function(err, flashcards){
                    if(err){
                        console.log(err);
                        res.redirect("/campgrounds");
                    } else {
                        
                        res.render("landing", {flashcard: flashcards,collections:collections}); 
                    }
                });
            }
    });
}
});

//Trending
router.get("/trending", function(req,res){
   Campground.find( function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("trending", {campgrounds:allCampgrounds, currentUser: req.user});
          }
       
    });
});
// show register form
router.get("/feed", function(req, res){
   res.render("feed"); 
});


// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wancademy@gmail.com',
    pass: 'TommyWan832'
  }
});



//handle sign up logic
router.post("/register", function(req, res){
    !req.body.image ? req.body.image = 'https://image.flaticon.com/icons/svg/149/149071.svg' : '';
    var newUser = new User({username: req.body.username, description: req.body.description, image: req.body.image, email: req.body.email});
     if(req.body.teacherCode === 'TW101480fj') {
          newUser.isTeacher = true;
     }
      if(req.body.developerCode === 'iamadeveloperforthis') {
          newUser.isAdmin = true;
     }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
             req.flash("error", err.message);
             res.redirect("/404");
             console.log(err);
        } else {
            var mailOptionsRegister = {
              from: 'wancademy@gmail.com',
              to: newUser.email,
              subject: 'Welcome to Wancademy!  🤖',
              html: '<img src="https://i.imgur.com/Soq3GtW.png" style="width:520px;height:150px;"><h1 style="  color:#00AAFF;font-size:45px;">Hello <span style="color:black;font-size:45px;">'+ newUser.username + '!</span></h1> <h5  style="font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif; font-weight:100;font-size:25px;color:#232323;">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; From our developers, we warmly welcome you to our site. To access you dashboard, you can click <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/campgrounds">here</a>. <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io">Wancademy</a> is a free tool (and always free) where you can learn to code, design, ask questions of forums, and much more. <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Now it is time to start learning: Some features our site has that you can use are <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/classes"> communities </a>, <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/forums">forums</a>, and <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/courses">courses</a>. Courses can be found in your <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/campgrounds">dashboard</a>. We suggest either you take a <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/course-help">quick quiz</a> to help us recommend you some courses, or you can follow a progressional beginners to advanced coding path we designed. <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If you are looking for articles instead of courses, <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/articles">visit our articles section </a>. <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/classes">communities</a> are a place where users can freely talk about subjects related to coding or learning. You can discuss and ask questions, converse freely, make new friends, and your limits are endless! <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/forums">Forums</a> are a place where you can ask questions or answer them. <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Here are some useful sources:<br><br> - If you ever need help, <a style="text-decoration:none;color:#0068FF;" href="www.yelp-camp-tommyschool.c9users.io/faq">our help center is always open.</a> We love to hear any comments or complaints, you can email our support team by replying to this email or at <a style="text-decoration:none;color:#0068FF;" href="wancademy@gmail.com">wancademy@gmail.com</a> </h5> <h5 style=" font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif;font-weight:100;font-size:24px;color:#292929;"><br> ------------- <br><br> Best wishes and to your success, <br> &nbsp;&nbsp;&nbsp;&nbsp; Tommy Wan, Founder of Wancademy</h5><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5 style="font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif; font-weight:100;font-size:24px;color:#292929;">Since wancademy is free, we depend on donations to create new tutorials, courses, features, and to generally maintain our site. Please consider <a style="text-decoration:none;color:#FF0000;" href="yelp-camp-tommyschool.c9users.io/donate">donating</a> to keep our lowly site running. <br><br></h5>'
              
            };
            transporter.sendMail(mailOptionsRegister, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

             passport.authenticate("local")(req, res, function(){
                   req.flash("success", "Successfully Signed Up! Welcome to Wancademy!");
                   res.redirect("/course-help");
             });
        }
    });
});


router.get("/no-permission", function(req, res){
    res.render("no-permission");
});

router.get("/entereducatorscode", function(req, res) {
     User.findById(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render("entereducatorscode", {currentUser: req.user});
        }
    });
   
});

//handle sign up logic
router.post("/entereducatorscode", isLoggedIn, function(req, res){
    
     
       if(req.body.teacherCode === 'TW101480fj'){
         req.user.isTeacher = true;
         req.user.save();
         console.log(req.user);
         res.redirect("/campgrounds");
       } else{
           res.render("/404");
       }

    
});

// show educator register form
router.get("/educator-register", function(req, res){
   res.render("educator-register"); 
});

//handle sign up logic
router.post("/educator-register", function(req, res){
    !req.body.image ? req.body.image = 'https://www.horoscope.com/images-US/signs/profile-virgo.png' : '';
    var newUser = new User({username: req.body.username, description: req.body.description, image: req.body.image, email: req.body.email});
     if(req.body.teacherCode === 'TW101480fj') {
          newUser.isTeacher = true;
     }
      if(req.body.developerCode === 'iamadeveloperforthis') {
          newUser.isAdmin = true;
     }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
             req.flash("error", err.message);
             res.redirect("/404")
        } else {

             passport.authenticate("local")(req, res, function(){
                   req.flash("success", "Successfully Signed Up! Welcome to Wancademy!");
                   res.redirect("/getyoureducatorscode");
             });
        }
    });
});

/*get your educators code page after sign in with teacher register*/
router.get("/getyoureducatorscode", function(req, res) {
   res.render("getyoureducatorscode"); 
});




//Edit User Profile URL
router.get("/users/:id", function(req, res) {
    User.findById(req.user._id, function(err, foundUser) {
       if(err){
       console.log(err);
       } else{
           res.render("user/edit", {user: foundUser});
       }
    });
});

//Update User Profile 
router.put("/user/:id", function(req, res) {
  //Find and update correct user
  User.findByIdAndUpdate(req.user._id, req.body, {new: true}, function(err, user){
    if(err){
        res.redirect('/campgrounds');
        req.flash("err", "Someone has this name. Please change it");
        console.log(err);
    } else{
        req.login(user, function(err) {
          if(err) { console.log(err); }
          res.redirect('/users/friends/'+ user._id);
        });
    } 
  });
});

//Remove/Destroy User Profile URL
router.delete("/user/:id", function(req, res){
 
         
   User.findByIdAndRemove(req.user._id, function(err){
      if(err){
          res.redirect("/user/" + req.params.id);
          console.log(err);
      } else{
          res.redirect("/delete-profile/success");
      }
   });
	   
});

router.get("/delete-profile/success", function(req, res) {
    res.render("delete-profile-success")
});

//////////////////////////////////////////////
// USER DISCUSSION COMMENTS ///
/////////////////////////////////////////////

//User Comment (Discussion)
router.post("/user/:id/comments", checkCommentOwnership, function(req, res){
    
    User.findById(req.params.id, function(err, user) {
        if(err){
            res.redirect("landing");
            console.log(err)
        } else{
            var author = {
                id: req.user._id,
                username: req.user.username
            }
            req.body.comment.author = author;
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err)
               } else{
                   console.log("comment", comment);
                   user.comments.push(comment);
                   user.save();
                   res.redirect('/users/friends/' + req.params.id);
               }
            });
        }
    });    
});

//Make new comment in discussion
router.get("/user/:id/comments/new", function(req, res) {
    //Find User By ID
    User.findById(req.params.id, function(err, user) {
        if(err){
            console.log(err);
        } else {
            res.render("user/new", {user: user, User:user });
        }
    });
});

/*router.get("/user/:id", function(req, res) {
    User.findById(req.params.id).populate("comments").exec(function(err, User) {
        if(err){
            res.redirect("back");
            console.log(err);
        } else{
            res.render("profile.ejs", {user: User})
        }
    });
});*/

//Comment Edit
router.get("/user/:id/comments/:comment_id/edit", function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if(err){
           console.log(err);
           res.redirect("back");
       } else{
         res.render("user/comments/edit", {comment: foundComment});  
       }
    });
});

//Comment Update
router.put("/user/:id/comments/:comment_id", checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           console.log(err);
           res.redirect("login");
       } else {
           res.redirect("/user/" + req.params.id);
       }
    });
});

router.delete("/user/:id/comments/:comment_id", function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      } else{
          res.redirect("/user/" + req.params.id);
      }
   });
});

function checkCommentOwnership(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}

router.get("/users/friends/:id", isLoggedIn, function(req, res) {
 User.findById(req.params.id).populate('friends').exec(function(err, user) {
      if(err) {
          console.log(err);
      } else {
          Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
             res.render('friends.ejs', {user: user, currentUser: req.user});  
        }
    });
 }
  });
  });

////////////////////////////////
// USER DISCUSSION END ////////
//////////////////////////////

//show login form
router.get("/login", function(req, res){
   res.render("login", {message:req.flash("error")}); 
});



//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/404",
        successFlash: "Login was successful, welcome back to wancademy! ",
        failureFlash: "Invalid username or password. **Capitilize and space sensitive** "
    }), function(req, res){
        
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You are logged out!");
   res.redirect("/");
});

/*Forgot password route*/
router.get("/forgot", function(req, res) {
    res.render("forgotPassword.ejs")
})

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        } else{
            console.log(err);
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'wancademy@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'wancademy@gmail.com',
        subject: 'Wancademy Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {token: req.params.token});
  });
});

router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'wancademy@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'wancademy@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/campgrounds');
  });
});



router.put("/users/:id/add", function(req, res) {
  User.findById(req.params.id, function(err, friend) {
      if(err) {
          console.log(err);
      }
      User.findById(req.user._id, function(err, self) {
        if(err) {
            console.log(err);
        }
        if(friend.friends.indexOf(self) === -1) {
            friend.friends.push(self);
            friend.save();
        };
        if(self.friends.indexOf(friend) === -1) {
            self.friends.push(friend);
            self.save(); 
        };
        res.redirect('/user/'+req.user._id);
      });
  });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
     req.flash("error", "You need to login!");
    res.redirect('/login');
}






module.exports = router;
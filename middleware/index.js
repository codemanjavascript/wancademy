//Middleware

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

//Teacher middleware
middlewareObj.isTeacher = function(req, res, next) {
 if(req.body.isTeacher === false){
        req.flash("error", "You don't have permission access this.")
    } else {
        next();
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
                req.flash("error", "You need to sign in!")
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                res.flash("error", "You need to sign in!")
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Zapit! You need to sign in!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You need to sign in!");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to sign in!");
    res.redirect("/login");
};

middlewareObj.isAdmin = function(req, res, next){
    if(req.body.isAdmin === false){
        req.flash("error", "You don't have permission access this.");
        res.redirect("/no-permission");
    } else {
        next();
    }
};

module.exports = middlewareObj;
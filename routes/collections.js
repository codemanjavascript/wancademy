var express = require("express");
var router  = express.Router();
var Collection = require("../models/collection");
var middleware = require("../middleware");



router.get("/:id", function(req, res) {
    Collection.findById(req.params.id).populate('flashcards').exec(function(err, collection) {
        if(err) {
            req.flash('error', err);
            res.redirect('back');
        }
        res.render('collections/show', {collection: collection});
    });  
});

router.get("/:id/edit", function(req, res){
    var amount = Number(req.body.amount);
    var counter = 0;
    Collection.findById(req.params.id, function(err, foundCollections){
        if(err){
            console.log(err)
        } else {
        res.render("collections/edit", {collection: foundCollections, currentUser: req.user});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res){
    // find and update the correct campground
    Collection.findByIdAndUpdate(req.params.id, req.body.collection, function(err, updatedCollection){
       if(err){
           res.redirect("/collections");
       } else {
           //redirect somewhere(show page)
           res.redirect("/collections/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",  function(req, res){
   Collection.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/collections");
      } else {
          res.redirect("/collections");
      }
   });
});

//FLashcard edit route

module.exports = router;
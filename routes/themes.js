var express = require("express");
var router  = express.Router();
var User = require("../models/user");

router.get("/:user_id/edit", function(req, res) {
    res.render("themes/edit", {user_id: req.params.user_id});
});

router.put("/:user_id", function(req,res) {
    User.findById(req.params.user_id,function(err, user) {
        if(err) {
            return err;
        }
        user.theme = req.body.theme;
        user.save();
        res.redirect("/campgrounds");
    });
});

module.exports = router;
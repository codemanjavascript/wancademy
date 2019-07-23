var express    = require("express");
var router     = express.Router();

/*Introduction to Porgramming*/
router.get("/introduction-to-programming", isLoggedIn, function(req, res) {
   res.render("courses-html/intro-to-programming.ejs") 
});

/*HTML Code*/
router.get("/1-getstarted", isLoggedIn, function(req, res){
  res.render("courses-html/html/getstarted");
});

router.get("/html/attributes", isLoggedIn,function(req, res) {
   res.render("courses-html/html/attributes") 
});
router.get("/html/styles", isLoggedIn,function(req, res) {
   res.render("courses-html/html/styles") 
});
router.get("/html/tagsandheadings", isLoggedIn,function(req, res){
   res.render("courses-html/html/tags&head");
});

/*HTML*/
router.get("/html", function(req, res) {
    res.render("courses-html/html/index");
});

/*CSS*/
router.get("/css", function(req, res){
    res.render("courses-html/css/index");
});

/*Javascript*/
router.get("/javascript", function(req, res){
    res.render("courses-html/javascript/index");
});

/*Bootstrap*/
router.get("/bootstrap", function(req, res){
    res.render("courses-html/bootstrap/index");
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;

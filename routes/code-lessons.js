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

/*jQuery*/
router.get("/jquery", function(req, res){
    res.render("courses-html/jquery/index");
});

/*Design a Blog*/
router.get("/design-a-blog", function(req, res){
    res.render("courses-html/design-a-blog/index");
});

/*Code Your Portfolio*/
router.get("/code-your-portfolio", function(req, res){
    res.render("courses-html/code-your-portfolio/index");
});

/*Deploy*/
router.get("/deploy", function(req, res){
    res.render("courses-html/deploy/index");
});

/*Counting Game*/
router.get("/counting", function(req, res){
    res.render("courses-html/counting/index");
});

/*Cookie Clicker Clone*/
router.get("/cookie", function(req, res){
    res.render("courses-html/cookie/index");
});

/*Text Game*/
router.get("/text", function(req, res){
    res.render("courses-html/text/index");
});

/*Functional Clock*/
router.get("/clock", function(req, res){
    res.render("courses-html/clock/index");
});

/*Functional Calculator*/
router.get("/calculator", function(req, res){
    res.render("courses-html/calculator/index");
});

/*Skateboard ecommerce*/
router.get("/skateboard", function(req, res){
    res.render("courses-html/skateboard/index");
});

/*Animate.css*/
router.get("/animate", function(req, res){
    res.render("courses-html/animate/index");
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

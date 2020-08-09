var express    = require("express");
var router     = express.Router();

/*Introduction to Porgramming*/
router.get("/introduction-to-programming", isLoggedIn, function(req, res) {
   res.render("courses-html/intro-to-programming.ejs") 
});

router.get("/1-getstarted", isLoggedIn, function(req, res){
    res.render("courses-html/html/getstarted");
});

router.get("/editor/introduction-to-frontend", function(req, res) {
    res.render("editor/introductiontofrontend") ;
});

/*HTML*/
router.get("/html", function(req, res) {
    res.render("courses-html/html/index");
});
 
 router.get("/editor/html/introduction", function(req, res) {
     res.render("editor/html/introduction") ;
  });
 
 router.get("/editor/html/documentandtags", function(req, res) {
    res.render("editor/html/documentandheading") ;
 });
 
 router.get("/editor/html/headingsandparagraph", function(req, res) {
     res.render("editor/html/headingsandparagraph");
 });
 
 router.get("/editor/html/links", function(req, res) {
     res.render("editor/html/links");
 });
 
 router.get("/editor/html/images", function(req, res) {
     res.render("editor/html/images");
 });
 
 router.get("/editor/html/buttons", function(req, res) {
     res.render("editor/html/buttons");
 });
 
 router.get("/editor/html/lists", function(req, res) {
     res.render("editor/html/lists");
 });

 router.get("/editor/html/attributes", function(req, res) {
    res.render("editor/html/attributes");
});
 
 router.get("/editor/html/inline-style", function(req, res) {
     res.render("editor/html/inline-style");
 });
 
 router.get("/editor/html/commentdivs", function(req, res) {
     res.render("editor/html/commentdivs");
 });

 router.get("/editor/html/tables", function(req, res) {
    res.render("editor/html/tables");
});

router.get("/editor/html/span", function(req, res) {
    res.render("editor/html/span");
});

router.get("/quizzes/html/quiz1", function(req, res) {
    res.render("quizzes/html/quiz1");
});
 
 router.get("/editor/html/wrap", function(req, res) {
     res.render("editor/html/wrap");
 });

 router.get("/editor/html/tutorial", function(req, res) {
    res.render("editor/html/tutorial");
});
 
/*CSS*/
router.get("/css", function(req, res){
    res.render("courses-html/css/index");
});

router.get("/editor/css/introduction", function(req, res) {
    res.render("editor/css/introduction");
});


router.get("/editor/css/tutorial", function(req, res) {
    res.render("editor/css/tutorial");
});


router.get("/editor/css/selectors", function(req, res) {
    res.render("editor/css/selectors");
});

router.get("/editor/css/comments", function(req, res) {
    res.render("editor/css/comments");
});

router.get("/editor/css/colors", function(req, res) {
    res.render("editor/css/colors");
});

router.get("/editor/css/borders", function(req, res) {
    res.render("editor/css/borders");
});

router.get("/editor/css/backgrounds", function(req, res) {
    res.render("editor/css/backgrounds");
});

router.get("/editor/css/mpf", function(req, res) {
    res.render("editor/css/mpf");
});

router.get("/editor/css/fonts", function(req, res) {
    res.render("editor/css/fonts");
});

router.get("/editor/css/positions", function(req, res) {
    res.render("editor/css/positions");
});

router.get("/editor/css/align", function(req, res) {
    res.render("editor/css/align");
});

router.get("/editor/css/gradient", function(req, res) {
    res.render("editor/css/gradient");
});

router.get("/editor/css/animation", function(req, res) {
    res.render("editor/css/animation");
});

router.get("/editor/css/tidbits", function(req, res) {
    res.render("editor/css/tidbits");
});

router.get("/quizzes/css/quiz1", function(req, res) {
    res.render("quizzes/css/quiz1");
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

/*Functional Calculator*/
router.get("/calc", function(req, res){
    res.render("courses-html/calc/index");
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

//Require Plug-in's
var     express     = require("express"),
        app         = express(),
   expressSanitizer = require("express-sanitizer"),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        flash       = require("connect-flash"),
        passport    = require("passport"),
      LocalStrategy = require("passport-local"),
     methodOverride = require("method-override"),
            Post    = require("./models/post"),
               User = require("./models/user"),
         ClassModel = require("./models/classmodel"),
            Courses = require("./models/courses"),
      TeacherEmails = require("./models/teacherEmails"),
          Flashcard = require("./models/flashcard"),
          Videos    = require("./models/videos"),
         configAuth = require('./auth'),
            session = require('express-session'),
            Forums  = require('./models/forums'),
            Help    = require("./models/help"),
            Press   = require("./models/press"),
            Approve = require("./models/approve"),
            Editor  = require("./models/editor"),
            Project = require("./models/project"),
       cookieParser = require('cookie-parser');
//test for git

    
//Require Routes
var commentRoutes    = require("./routes/comments"),
    passportRoutes   = require("./config/passport"),
    answerRoutes    = require("./routes/answers"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"),
    classesRoutes    = require("./routes/classes"),
    coursesRoutes    = require("./routes/courses"),
    postRoutes       = require("./routes/posts"),
    themeRoutes      = require("./routes/themes"),
 code_lessonsRoutes  = require("./routes/code-lessons"),
 teacherEmailsRoutes = require("./routes/teacherEmails"),
    collectionRoutes = require("./routes/collections"),
    pressRoutes      = require("./routes/press"),
    editorRoutes      = require("./routes/editor"),
    helpRoutes       = require("./routes/help"),
    projectRoutes       = require("./routes/project"),
    videoRoutes     = require("./routes/videos");
    
//Dot nev configuration
require('dotenv').config()
//Mongo connect locally    
 mongoose.connect("mongodb://localhost/yelp_camp_v10");
 //ef
//Mongo using Mlab
//mongoose.connect("mongodb://Tommy:8328783999@ds147681.mlab.com:47681/wancademy");

/*Use bodyParser*/
app.use(bodyParser.urlencoded({extended: true}));

//EJS Shortcut
app.set("view engine", "ejs");

app.use(expressSanitizer());

//For Css and JS
app.use(express.static(__dirname + "/public"));

//Method Overide use
app.use(methodOverride("_method"));

//Flash messages
app.use(flash());

//Moment Use
app.locals.moment = require('moment');

//Use express-session
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

//local passport strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Use flash on login/resgister
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


// Stripe configuration
/* const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = require("stripe")(keySecret);


app.get("/stripe", (req, res) => //pug
  res.render("stripe", {keyPublishable}));

app.post("/charge", (req, res) => {
  var amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.ejs"));
});

app.listen(4567);*/


//Shorcuts on routes
app.use("/", indexRoutes);
app.use("/", code_lessonsRoutes);
/*app.use("/", authRoutes);*/
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/forums/:id/answers", answerRoutes);
app.use("/courses", coursesRoutes);
app.use("/classes", classesRoutes);
app.use("/collections", collectionRoutes);
app.use("/classes/:id/posts", postRoutes);
app.use("/themes", themeRoutes);
app.use("/", videoRoutes);
app.use("/help", helpRoutes);
app.use("/press", pressRoutes);
app.use("/projects", projectRoutes);
app.use("/editor", editorRoutes);

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

var todoSchema = new mongoose.Schema({
  text: String,
});

var Todo = mongoose.model("Todo", todoSchema);

app.get("/todos", function(req, res){
  Todo.find({}, function(err, todos){
    if(err){
      console.log(err);
    } else {
      res.render("todo/index", {todos: todos}); 
    }
  })
});

app.get("/todos/new", function(req, res){
 res.render("todo/new"); 
});

app.post("/todos", function(req, res){
 req.body.todo.text = req.sanitize(req.body.todo.text);
 var formData = req.body.todo;
 Todo.create(formData, function(err, newTodo){
    if(err){
      res.render("new");
    } else {
        res.redirect("/todos");
    }
  });
});

app.get("/todos/:id/edit", function(req, res){
 Todo.findById(req.params.id, function(err, todo){
   if(err){
     console.log(err);
     res.redirect("todo/index")
   } else {
      res.render("todo/edit", {todo: todo});
   }
 });
});

app.put("/todos/:id", function(req, res){
 Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, todo){
   if(err){
     console.log(err);
   } else {
      res.redirect('/todos');
   }
 });
});

app.delete("/todos/:id", function(req, res){
 Todo.findById(req.params.id, function(err, todo){
   if(err){
     console.log(err);
   } else {
      todo.remove();
      res.redirect("/todos");
   }
 }); 
});

//Route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//Start up the app
app.listen(3000, '127.0.0.1', function(){
   console.log("Wancademy Server Started");
});


var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    username: {type:String, unique:true, required: true},
    email: {type:String, unique:true, required: true},
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isTeacher: {type: Boolean, default: false},
    isAdmin: {type:Boolean, default:false},
    description: {type:String, defualt:"Welcome to my profile!"},
    image: {type: String},
   comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
    ],
    friends: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      }
    ],
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    theme: {type: String, default: "orange"}
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


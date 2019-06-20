var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Comment = require("../models/comment");
var Campground = require("../models/campground");
var Flashcard  = require("../models/flashcard");
var Collection  = require("../models/collection");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");



var mongoose = require("mongoose");

var teacherEmailsSchema = mongoose.Schema({
    email: String,
    secret: String
});

module.exports = mongoose.model("teacherEmails", teacherEmailsSchema);
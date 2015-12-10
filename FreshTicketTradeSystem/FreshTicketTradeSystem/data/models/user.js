var mongoose = require('mongoose');
var User = require('../schemas/user');
var passportLocalMongoose = require('passport-local-mongoose');
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
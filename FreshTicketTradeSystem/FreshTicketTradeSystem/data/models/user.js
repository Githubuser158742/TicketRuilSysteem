//var mongoose = require('mongoose');
//var schema = require('../schemas/schema.js');
//var User = mongoose.model('User',userSchema, 'users');
//module.exports = User;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
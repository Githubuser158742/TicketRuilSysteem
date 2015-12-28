var mongoose = require('mongoose');
var userSchema = require('../schemas/user');
var User = mongoose.model('User', userSchema, "users");
module.exports = User;
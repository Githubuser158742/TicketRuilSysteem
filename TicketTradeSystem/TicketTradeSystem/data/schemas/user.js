"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String,
        firstname: String,
        lastname: String,
        street: String,
        number: String,
        phone: String,
        zip: String,
        city: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        email: String,
        name: String
    },    
    admin: { type: Boolean, default: false },
    createdOn: {type: Date, default: Date.now}
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = userSchema;
"use strict";
//var mongoose = require('mongoose');

var usersRepo = (function () {
    var User = require('./user.js');
    var changeUser = function (user, changes, next) {
        var changedUser = user;
        changedUser.email = changes.email;
        changedUser.city = changes.city;
        changedUser.firstname = changes.firstname;
        changedUser.lastname = changes.lastname;
        changedUser.save(function (err) {
            if (err) return next(err)
            // What's happening in passport's session? Check a specific field...
            console.log("Before relogin: " + req.session.passport.user.changedField)
            
            req.login(user, function (err) {
                if (err) return next(err)
                
                console.log("After relogin: " + req.session.passport.user.changedField)
                res.send(200)
            })
        })
    }
}());

module.exports = usersRepo;
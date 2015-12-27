"use strict";
//var mongoose = require('mongoose');

var usersRepo =(function () {
    var User = require('./user.js');
    var changeUser = function (user, changes, next) {
        var changedUser = user;
        if (!user.fb) { changedUser.local.email = changes.email }
        changedUser.email = changes.email;
        changedUser.city = changes.city;
        changedUser.firstname = changes.firstname;
        changedUser.lastname = changes.lastname;
        changedUser.save(function (err, user) {
            if (err) return next(err)            
            user.login(user, function (err) {
                if (err) return next(err)
<<<<<<< HEAD
            })
=======
                
                console.log("After relogin: " + req.session.passport.user.changedField)
                res.send(200)
            });
>>>>>>> origin/master
        });
    };
    return {
        model: User,
        changeUser: changeUser
<<<<<<< HEAD
    };
=======
            };
>>>>>>> origin/master
}());

module.exports = usersRepo;
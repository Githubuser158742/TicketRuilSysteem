"use strict";
var express = require('express');
var router = express.Router();

//middleware
var isAuthenticated = require('./middleware/isAuthenticated.js');

router.get('/:id/delete', function (req, res) {
    req.user.remove(function (err) {
        if (err) {
            return console.error(err);
        }
        res.format({
            html: function () {
                req.flash('error', 'Your account was deleted!');
                res.redirect('/');
            }
        });
    });
});

router.get('/', isAuthenticated, function (req, res) {
    res.render('profile/index', { user : req.user, title: "Profile", messages: req.flash('error'), detailsChanged: req.flash('detailsChanged') });
});

router.post('/', isAuthenticated, function (req, res) {
    if (req.body.password || req.body.newpassword1 || req.body.newpassword2) {
        if (req.body.newpassword1 == req.body.newpassword2) {
            var user = req.user;
            user.local.email = req.body.email;
            user.local.city = req.body.city;
            user.local.firstname = req.body.firstname;
            user.local.lastname = req.body.lastname;
            user.local.street = req.body.street;
            user.local.number = req.body.number;
            user.local.zip = req.body.zip;
            if (user.validPassword(req.body.password)) {
                user.local.password = user.generateHash(req.body.newpassword1);
                user.save(function (err) {
                    if (err) return next(err)
                    req.login(user, function (err) {
                        if (err) return next(err)
                        req.flash('detailsChanged', 'Your details have been changed!');
                        res.redirect('/profile');
                    })
                })
            } else {
                req.flash('error', 'Your old password was incorrect! Please try again.');
                res.redirect('/profile');
            }
        } else {
            req.flash('error', 'The passwords did not match! Please try again.');
            res.redirect('/profile');
        }
    } else { 
        var user = req.user;
        user.local.email = req.body.email;
        user.local.city = req.body.city;
        user.local.firstname = req.body.firstname;
        user.local.lastname = req.body.lastname;
        user.local.street = req.body.street;
        user.local.number = req.body.number;
        user.local.zip = req.body.zip;
        user.save(function (err) {
            if (err) return next(err)
            req.login(user, function (err) {
                if (err) return next(err)
                req.flash('detailsChanged', 'Your details have been changed!');
                res.redirect('/profile');
            })
        });
    }
});

module.exports = router;
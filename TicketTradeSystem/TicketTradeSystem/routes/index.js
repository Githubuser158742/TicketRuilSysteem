"use strict";
var express = require('express');
var router = express.Router();
var passport = require('passport');

var isAuthenticated = require('./middleware/isAuthenticated.js');
var isNotAuthenticated = require('./middleware/isNotAuthenticated.js');

//var usersRepo = require('../data/models/usersRepo');

//router.emitter = new (require('events').EventEmitter)();

/* GET home page. */
router.get('/', isNotAuthenticated, function (req, res) {
    res.render('index', { title: 'Welcome', messages: req.flash('error') });
});

router.get('/login', isNotAuthenticated, function (req, res) {
    res.render('login.jade', { title: 'Sign in', messages: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login',{
    successRedirect : '/tickets',
    failureRedirect : '/login',
    session: true
}));

router.get('/signup', function (req, res) {
    res.render('signup.jade', { title: 'Sign up' });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup'
}));

router.get('/profile', isAuthenticated, function (req, res) {
    res.render('profile.jade', { user : req.user, title: "Profile", messages: req.flash('error'), detailsChanged: req.flash('detailsChanged') });
});

router.post('/profile', function (req, res) {
    var user = req.user;
    user.local.email = req.body.email;
    user.local.city = req.body.city;
    user.local.firstname = req.body.firstname;
    user.local.lastname = req.body.lastname;
    user.save(function (err) {
        if (err) return next(err)
        // What's happening in passport's session? Check a specific field...
        console.log("Before relogin: " + req.session.passport.user.changedField)
        
        req.login(user, function (err) {
            if (err) return next(err)
            req.flash('detailsChanged', 'Your details have been changed!');
            console.log("After relogin: " + req.session.passport.user.changedField)
            res.redirect('/profile');
        })
    })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// FACEBOOK
//router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

//// CB
//router.get('/auth/facebook/callback',
//    passport.authenticate('facebook', {
//    successRedirect : '/profile',
//    failureRedirect : '/'
//}));

//// FB Profile
//router.get('/profile-fb', function (req, res) {
//    res.render('profile-fb.jade', {
//        user : req.user
//    });
//});

function isLoggedIn(req, res, next) { // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
};

module.exports = router;
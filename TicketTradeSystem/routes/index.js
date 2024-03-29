﻿var express = require('express');
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

router.post('/login', isNotAuthenticated, passport.authenticate('local-login',{
    successRedirect : '/events',
    failureRedirect : '/login',
    session: true
}));

router.get('/signup', isNotAuthenticated, function (req, res) {
    res.render('signup.jade', { title: 'Sign up', messages: req.flash('signupMessage') });
});

router.post('/signup', isNotAuthenticated, passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup'
}));

router.get('/logout', isAuthenticated, function (req, res) {
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
}

module.exports = router;
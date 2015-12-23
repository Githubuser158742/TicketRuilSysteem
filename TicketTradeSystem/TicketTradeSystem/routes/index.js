"use strict";
var express = require('express');
var router = express.Router();
var passport = require('passport');

var isAuthenticated = require('./middleware/isAuthenticated.js');
var isNotAuthenticated = require('./middleware/isNotAuthenticated.js');

/* GET home page. */
router.get('/', isNotAuthenticated, function (req, res) {
    res.render('index', { title: 'Welcome', messages: req.flash('error') });
});

router.get('/test', function (req, res) {
    res.render('test.jade');
});

router.get('/login', isNotAuthenticated, function (req, res) {
    res.render('login.jade', { title: 'Sign in', messages: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login',{
    successRedirect : '/profile',
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

router.get('/profile', function (req, res) {
    res.render('profile.jade', { user : req.user, title: "Profile", messages: req.flash('error') });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// FACEBOOK
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// CB
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
    successRedirect : '/profile-fb',
    failureRedirect : '/'
}));

// FB Profile
router.get('/profile-fb', function (req, res) {
    res.render('profile-fb.jade', {
        user : req.user
    });
});

function isLoggedIn(req, res, next) { // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
};


module.exports = router;
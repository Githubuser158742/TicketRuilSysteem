var express = require('express');
var router = express.Router();

var User = require('../data/models/user');
var loadUser = require('./middleware/loadUser');

router.get('/', function (req, res) {
    User.find({}).sort('username').exec(function (err, docs) {
        res.render('users/index', { title: 'Users overzicht', userlist: docs });
    })
});

router.get('/new', function (req, res) {
    res.render('users/new', { title: "New User" });
});

router.post('/', function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.redirect('/users');
    });
});


router.get('/:name', loadUser, function (req, res, next) {
    res.render('users/details', { title: 'User profile', user: req.user });
});

router.get('/edit/:name', loadUser, function (req, res, next) {
    res.render('users/edit', { title: 'Edit User profile', user: req.user });
});


router.route('/:name').post(loadUser , function (req, res, next) {
    switch (req.body._method) {
        case "DELETE":
            req.user.remove(function (err) {
                if (err) { return next(err); }
            });
            break;
        case "PUT":
            req.user.update(req.body, function (err) {
                 
            });
            break;
        default:
            next();
    }
    res.redirect('/users');
});

module.exports = router;
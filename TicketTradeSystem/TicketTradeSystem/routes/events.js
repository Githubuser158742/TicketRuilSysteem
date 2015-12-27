"use strict";
var express = require('express');
var router = express.Router();
var fs = require('fs');
var io = require('socket.io');

var eventsRepo = require('../data/models/eventsRepo');

//middleware
var loadEvent = require('./middleware/loadEvent.js');
var isAuthenticated = require('./middleware/isAuthenticated.js');

router.emitter = new(require('events').EventEmitter)();

/* GET events listing. */
router.get('/', isAuthenticated, function (req, res) {
        eventsRepo.getAllEvents(function (err, events) {
            if (err) {
                res.status(500).send('server error - event overview');
                res.end();
        }
            res.render('events/index', { title: 'Events', eventslist: events, messages: req.flash('adminMessage') });
        });
});

router.get('/myevents', function (req, res) {
    eventsRepo.getEventsByIdUser(req._passport.session.user, function (err, eventsuser) {
        if (err) {
            res.status(500).send('server error - events user');
            res.end();
        }
        res.render('events/myevents', {title: 'My Events', eventslistuser: eventsuser});
    });
});

router.get('/new', function (req, res) {
    res.render('events/new', {title: 'New Event'});
});

router.post('/', function (req, res, next) {
    req.body.userId = req._passport.session.user;
    var tags = req.body.tags.replace(", ", ",").split(",");
    req.body.tags = tags;
    eventsRepo.createEvent(req.body, function (next) {
        if (next.errors) {
            next(new Error(next.message));
        } else {
            router.emitter.emit('routermessage', req.body);
            res.redirect('/events');
        }
    });
});

router.get('/:id', loadEvent, function (req, res) {
    res.render('events/detail', {nick: req.user.local.firstname, event: req.event, title: req.event.name});
});

router.get('/:id/edit', loadEvent, function (req, res) {
    res.render('events/edit', {event: req.event});
});

router.post('/:id/edit', loadEvent, function (req, res) {
    if (req.user.admin == true) {
    var name = req.body.name,
        description = req.body.description,
        date = req.body.date,
        time = req.body.time,
        location = req.body.location,
        city = req.body.city,
        price = req.body.price,
        pictureUrl = req.body.pictureUrl,
        tags = req.body.tags;

    req.event.update({
        name: name,
        description: description,
        date: date,
        time: time,
        location: location,
        city: city,
        price: price,
        pictureUrl: pictureUrl,
        tags: tags
    }, function (err) {
        if (err) {
            res.send('Update failed' + err);
        } else {
            res.format({
                html: function () {
                    res.redirect('/events/' + req.event._id);
                }
            });
        }
        });
    } else {
        req.flash('adminMessage', 'You must be an administrator to do that.');
        res.format({
            html: function () {
                res.redirect('/events');
            }
        });
    }
});

router.get('/:id/delete', loadEvent, function (req, res) {
    if (req.user.admin == true) {
        req.event.update({ eventCancelled: true }, function (err) {
            if (err) {
                res.send('Delete failed' + err);
            } else {
                res.format({
                    html: function () {
                        res.redirect('/events');
                    }
                });
            }
        });
    } else {
        req.flash('adminMessage', 'You must be an administrator to do that.');
        res.format({
            html: function () {
                res.redirect('/events');
            }
        });
    }
});

module.exports = router;
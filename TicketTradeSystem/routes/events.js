"use strict";
var express = require('express');
var router = express.Router();
var fs = require('fs');
var io = require('socket.io');

var eventsRepo = require('../data/models/eventsRepo');
var chatsRepo = require('../data/models/chatsRepo');

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
        console.log(req.user);
            res.render('events/index', { title: 'Events', eventslist: events, currentuser: req.user, messages: req.flash('adminMessage'), search: false });
        });
});

router.get('/myevents', isAuthenticated, function (req, res) {
    eventsRepo.getEventsByIdUser(req._passport.session.user, function (err, eventsuser) {
        if (err) {
            res.status(500).send('server error - events user');
            res.end();
        }
        res.render('events/myevents', {title: 'My Events', eventslistuser: eventsuser});
    });
});

router.get('/new', isAuthenticated, function (req, res) {
    res.render('events/new', {title: 'New Event'});
});

router.get("/search", function (req, res) {
    res.redirect("/");
});

router.post("/search", function (req, res) {
    console.log("entered search route");
    eventsRepo.search(req.body.search, function (err, events) {
        if (err) {
            res.status(500).send('server error - event search');
            res.end();
        }
        res.render('events/index', { title: "Zoeken: " + req.body.search, eventslist: events, search: true });
    });
});

router.post('/', isAuthenticated, function (req, res, next) {
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

router.get('/:id', loadEvent, isAuthenticated, function (req, res) {
    chatsRepo.getChatByEvent(req.event.id, function (err, chatsevent) {
        if (err) {
            res.status(500).send('server error - chats event');
            res.end();
        }
        console.log(chatsevent);
        //console.log(chatsevent);
        res.render('events/detail', { chatlistevent: chatsevent, nick: req.user.local.firstname + " " + req.user.local.lastname, event: req.event, title: req.event.name });
    });
});
    
router.get('/:id/edit', loadEvent, isAuthenticated, function (req, res) {
    if (req.user.admin == true) {
        res.render('events/edit', { event: req.event });
    } else {
        req.flash('adminMessage', 'You must be an administrator to do that.');
        res.format({
            html: function () {
                res.redirect('/events');
            }
        });
    }
});

router.post('/:id/edit', loadEvent, isAuthenticated, function (req, res) {
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

router.get('/:id/delete', loadEvent, isAuthenticated, function (req, res) {
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
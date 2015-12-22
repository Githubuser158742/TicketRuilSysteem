"use strict";
var express = require('express');
var router = express.Router();

var eventsRepo = require('../data/models/eventsRepo');
//var loadEvent = require('./middleware/loadEvent.js');

var isAuthenticated = require('./middleware/isAuthenticated.js');

//nog vervangen door bovenstaande middleware
var Event = require('../data/models/event');

router.emitter = new (require('events').EventEmitter)();

/* GET events listing. */
router.get('/', isAuthenticated, function (req, res) {
    eventsRepo.getAllEvents(function (err, events) {
        if (err) {
            res.status(500).send('server error - event overview');
            res.end();
        }
        res.render('events/index', { title: 'Events overview', eventslist: events });
    });
});

router.get('/myevents', function (req, res) {
    eventsRepo.getEventsByIdUser(req._passport.session.user, function (err, eventsuser) {
        if (err) {
            res.status(500).send('server error - events user');
            res.end();
        }
        res.render('events/myevents', { title: 'My Events', eventslistuser: eventsuser });
    });
});

router.get('/new', function (req, res) {
    res.render('events/new', { title: 'New Event' });
});

router.post('/', function (req, res, next) {
    req.body.userId = req._passport.session.user;
    eventsRepo.createEvent(req.body, function (next) {
        if (next.errors) {
            next(new Error(next.message));
        } else {
            router.emitter.emit('routermessage', req.body);
            res.redirect('/events');
        }
    });
});


router.get('/:id', function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('events/detail', { event: event });
        }
    });
});

router.get('/:id/edit', function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('events/edit', { event: event });
        }
    });
});

router.post('/:id/edit', function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var date = req.body.date;
    var time = req.body.time;
    var location = req.body.location;
    var city = req.body.city;
    var price = req.body.price;
    var pictureUrl = req.body.pictureUrl;
    var tags = req.body.tags;
    
    Event.findById(req.params.id, function (err, event) {
        event.update({
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
                        res.redirect('/events/' + event._id);
                    }
                });
            }
        });
    });
});

router.get('/:id/delete', function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return console.error(err);
        }
        event.remove(function (err) {
            if (err) {
                return console.error(err);
            }
            res.format({
                html: function () {
                    res.redirect('/events');
                }
            });
        });
    });
});

module.exports = router;
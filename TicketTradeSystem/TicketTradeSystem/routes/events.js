"use strict";
var express = require('express');
var router = express.Router();

var eventsRepo = require('../data/models/eventsRepo');
//var loadEvent = require('./middleware/loadEvent.js');

//nog vervangen door bovenstaande middleware
var Event = require('../data/models/event');

router.emitter = new (require('events').EventEmitter)();

/* GET events listing. */
router.get('/', function (req, res) {
    eventsRepo.getAllEvents(function (err, events) {
        if (err) {
            res.status(500).send('server error - event overview');
            res.end();
        }
        res.render('events/index', { title: 'Events overview', eventslist: events });
    });
});

//router.get('/mytickets', function (req, res) {
//    ticketsRepo.getTicketsByIdUser(req._passport.session.user, function (err, ticketsuser) {
//        if (err) {
//            res.status(500).send('server error - tickets user');
//            res.end();
//        }
//        res.render('tickets/mytickets', { title: 'My Tickets', ticketslistuser: ticketsuser });
//    });
//});

router.get('/new', function (req, res) {
    res.render('events/new', { title: 'New Event' });
});

router.post('/', function (req, res, next) {
    req.body.userid = req._passport.session.user;
    eventsRepo.createEvent(req.body, function (next) {
        if (next.errors) {
            next(new Error(next.message));
        } else {
            router.emitter.emit('routermessage', req.body);
            res.redirect('/events');
        }
    });
});


//router.get('/:id', function (req, res) {
//    Ticket.findById(req.params.id, function (err, ticket) {
//        if (err) {
//            console.log('Error: ' + err);
//        } else {
//            res.render('tickets/detail', { ticket: ticket });
//        }
//    });
//});

//router.get('/:id/edit', function (req, res) {
//    Ticket.findById(req.params.id, function (err, ticket) {
//        if (err) {
//            console.log('Error: ' + err);
//        } else {
//            res.render('tickets/edit', { ticket: ticket });
//        }
//    });
//});

//router.post('/:id/edit', function (req, res) {
//    var name = req.body.name;
//    var description = req.body.description;
//    var price = req.body.price;
    
//    Ticket.findById(req.params.id, function (err, ticket) {
//        ticket.update({
//            name: name,
//            description: description,
//            price: price
//        }, function (err) {
//            if (err) {
//                res.send('Update failed' + err);
//            } else {
//                res.format({
//                    html: function () {
//                        res.redirect('/tickets/' + ticket._id);
//                    }
//                });
//            }
//        });
//    });
//});

//router.get('/:id/delete', function (req, res) {
//    Ticket.findById(req.params.id, function (err, ticket) {
//        if (err) {
//            return console.error(err);
//        }
//        ticket.remove(function (err) {
//            if (err) {
//                return console.error(err);
//            }
//            res.format({
//                html: function () {
//                    res.redirect('/tickets');
//                }
//            });
//        });
//    });
//});

module.exports = router;
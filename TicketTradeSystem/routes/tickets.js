﻿var express = require('express');
var router = express.Router();
var async = require('async');

var ticketsRepo = require('../data/models/ticketsRepo');
var eventsRepo = require('../data/models/eventsRepo');
var tradesRepo = require('../data/models/tradesRepo');

//middleware
var loadTicket = require('./middleware/loadTicket.js');
var loadEventForTicketPost = require('./middleware/loadEventForTicketPost.js');
var isAuthenticated = require('./middleware/isAuthenticated.js');

router.emitter = new(require('events').EventEmitter)();

router.get('/', isAuthenticated, function (req, res) {
    ticketsRepo.getAllTickets(function (err, tickets) {
        if (err) {
            res.status(500).send('server error - tickets');
            res.end();
        }
        res.render('tickets/index', {title: 'Tickets', ticketslist: tickets, currentuser: req._passport.session, admin: req.user.admin});
    });
});

router.get('/mytickets', isAuthenticated, function (req, res) {
    ticketsRepo.getTicketsByIdUser(req._passport.session.user, function (err, ticketsuser) {
        if (err) {
            res.status(500).send('server error - tickets user');
            res.end();
        }
        res.render('tickets/mytickets', {title: 'My Tickets', ticketslistuser: ticketsuser});
    });
});

router.get('/new', isAuthenticated, function (req, res) {
    eventsRepo.getAllEvents(function (err, events) {
        if (err) {
            res.status(500).send('server error - new ticket');
            res.end();
        }
        res.render('tickets/new', {title: 'New ticket', eventslist: events});
    });
});

router.post('/', loadEventForTicketPost, isAuthenticated, function (req, res, next) {
    req.body.userid = req._passport.session.user;
    var user = req._passport.session;
    ticketsRepo.createTicket(req.body, req.event, function (next) {
        if (next.errors) {
            next(new Error(next.message));
        } else {
            router.emitter.emit('routermessage', req.body);
            res.redirect('/tickets');
        }
    });
});

router.get('/:id', loadTicket, isAuthenticated, function (req, res) {
    res.render('tickets/detail', {ticket: req.ticket, title: req.ticket._event.name});
});

router.post('/:id', loadTicket, isAuthenticated, function (req, res) {
    tradesRepo.createTrade(req, function (next) {
        if (next.errors) {
            next(new Error(next.message));
        } else {
            router.emitter.emit('routermessage', req.body);
            req.ticket.update({
                amount: req.ticket._doc.amount - req.body.amount
            }, function (err) {
                if (err) {
                    res.send('Update failed' + err);
                } else {
                    res.redirect('/tickets');
                }
            });
        }
    });
});

router.get('/:id/edit', loadTicket, isAuthenticated, function (req, res) {
    res.render('tickets/edit', {ticket: req.ticket, title: "Edit ticket"});
});

router.post('/:id/edit', loadTicket, isAuthenticated, function (req, res) {
    var name = req.body.name,
        amount = req.body.amount,
        price = req.body.price;

    req.ticket.update({
        name: name,
        amount: amount,
        price: price
    }, function (err) {
        if (err) {
            res.send('Update failed' + err);
        } else {
            res.format({
                html: function () {
                    res.redirect('/tickets/' + req.ticket._id);
                }
            });
        }
    });
});

router.get('/:id/delete', loadTicket, isAuthenticated, function (req, res) {
    req.ticket.remove(function (err) {
        if (err) {
            return console.error(err);
        }
        res.format({
            html: function () {
                res.redirect('/tickets');
            }
        });
    });
});

module.exports = router;
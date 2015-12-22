﻿"use strict";
var express = require('express');
var router = express.Router();

var ticketsRepo = require('../data/models/ticketsRepo');
//var loadTicket = require('./middleware/loadTicket.js');

//nog vervangen door bovenstaande middleware
var Ticket = require('../data/models/ticket');

router.emitter = new(require('events').EventEmitter)();

/* GET tickets listing. */
router.get('/', function (req, res) {
    ticketsRepo.getAllTickets(function (err, tickets) {
        if (err) {
            res.status(500).send('server error - ticket overview');
            res.end();
        }
        res.render('tickets/index', {title: 'Tickets overview', ticketslist: tickets});
    });
});

router.get('/mytickets', function (req, res) {
    ticketsRepo.getTicketsByIdUser(req._passport.session.user, function (err, ticketsuser) {
        if (err) {
            res.status(500).send('server error - tickets user');
            res.end();
        }
        res.render('tickets/mytickets', {title: 'My Tickets', ticketslistuser: ticketsuser});
    });
});

router.get('/new', function (req, res) {
    res.render('tickets/new', {title: 'New Ticket'});
});

router.post('/', function (req, res, next) {
    req.body.userid = req._passport.session.user;
    ticketsRepo.createTicket(req.body, function (next) {
        if (next.errors) {
            next(new Error(next.message));
        } else {
            router.emitter.emit('routermessage', req.body);
            res.redirect('/tickets');
        }
    });
});


router.get('/:id', function (req, res) {
    Ticket.findById(req.params.id, function (err, ticket) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('tickets/detail', {ticket: ticket});
        }
    });
});

router.get('/:id/edit', function (req, res) {
    Ticket.findById(req.params.id, function (err, ticket) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.render('tickets/edit', {ticket: ticket});
        }
    });
});

router.post('/:id/edit', function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;

    Ticket.findById(req.params.id, function (err, ticket) {
        ticket.update({
            name: name,
            description: description,
            price: price
        }, function (err) {
            if (err) {
                res.send('Update failed' + err);
            } else {
                res.format({
                    html: function () {
                        res.redirect('/tickets/' + ticket._id);
                    }
                });
            }
        });
    });
});

router.get('/:id/delete', function (req, res) {
    Ticket.findById(req.params.id, function (err, ticket) {
        if (err) {
            return console.error(err);
        }
        ticket.remove(function (err) {
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
});

module.exports = router;
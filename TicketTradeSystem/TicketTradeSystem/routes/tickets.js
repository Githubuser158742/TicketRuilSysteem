var express = require('express');
var router = express.Router();

var ticketsRepo = require('../data/models/ticketsRepo');
var loadTicket = require('./middleware/loadTicket.js');

//nog vervangen door die middleware
//var Ticket = require('../data/models/ticket');

router.emitter = new (require('events').EventEmitter)();

/* GET tickets listing. */
router.get('/', function (req, res) {
    ticketsRepo.getAllTickets(function (err, tickets) {
        if (err) {
            res.status(500).send('server error - ticket overview');
            res.end();
        }
        res.render('tickets/index', { title: 'Tickets overview', ticketslist: tickets });
    });
});

//router.get('/detail', function (req, res) {
//    res.render('tickets/detail', {
//        ticket: req.ticket
//    });
//});

router.get('/new', function (req, res) {
    res.render('tickets/new', { title: 'New Ticket' });
});

router.post('/', function (req, res, next) {
    ticketsRepo.createTicket(req.body, function (next) {
        if (next.errors) {
            next(new Error(next.message));
        }
        else {
            router.emitter.emit('routermessage', req.body);
            res.redirect('/tickets');
        }
    });
});

module.exports = router;
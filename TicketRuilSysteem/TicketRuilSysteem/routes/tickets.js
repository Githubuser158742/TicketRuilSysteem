var Ticket = require('../models/ticket');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
    next();
});

router.route('/tickets').get(function (req, res) {
    Ticket.find(function (err, tickets) {
        if (err) {
            return res.send(err);
        }
        
        res.json(tickets);
    });
});

router.route('/tickets').post(function (req, res) {
    var ticket = new Ticket(req.body);
    
    ticket.save(function (err) {
        if (err) {
            return res.send(err);
        }
        
        res.send({ message: 'Ticket Added' });
    });
});

router.route('/tickets/:id').get(function (req, res) {
    Ticket.findOne({ _id: req.params.id }, function (err, ticket) {
        if (err) {
            return res.send(err);
        }
        
        res.json(ticket);
    });
});

router.route('/tickets/:id').put(function (req, res){
    Ticket.findOne({ _id: req.params.id }, function (err, ticket) {
        if (err) {
            return res.send(err);
        }
        
        for (prop in req.body) {
            ticket[prop] = req.body[prop];
        }
        
        ticket.save(function (err) {
            if (err) {
                return res.send(err);
            }
            
            res.json({ message: 'Ticket Updated' });
        });
    });
})

router.route('/tickets/:id').delete(function (req, res) {
    Ticket.remove({
        _id: req.params.id
    }, function (err, ticket) {
        if (err) {
            return res.send(err);
        }
        
        res.json({ message: 'Ticket Deleted' });
    });
});

module.exports = router;
"use strict";
var Ticket = require('../../data/models/ticket');

function loadTicket(req, res, next) {
    Ticket.findById({_id: req.params.id}, function (err, ticket) {
        if (err) {
            return next(err);
        }
        if (!ticket) {
            return res.send('Not found', 404);
        }
        req.ticket = ticket;
        next();
    });
}

module.exports = loadTicket;
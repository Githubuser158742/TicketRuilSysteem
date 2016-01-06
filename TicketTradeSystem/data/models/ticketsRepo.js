//var mongoose = require('mongoose');

var ticketsRepo = (function () {
    "use strict";
    var Ticket = require('./ticket.js');
    var getAllTickets = function (next) {
        Ticket.find({}).sort('price').populate('_event _user').exec(function (err, docs) {
            if (err) {
                console.log(err);
                next(err, null);
            }
            //console.log(docs);
            var docs2 = [];
            docs.forEach(function (doc) { 
                if (doc._event.eventCancelled === false && doc._user !== null && doc.amount > 0) { docs2.push(doc); }
            });
            //console.log(docs2);
            next(null, docs2);
        });
    },
        getTicketsByIdUser = function (id, next) {
            Ticket.find({ _user: id }).sort('price').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        createTicket = function (ticket, event, next) {
            var ticket1 = new Ticket({
                price: ticket.price,
                amount: ticket.amount,
                createdOn: new Date(),
                _event: ticket.eventid,
                _user: ticket.userid
            });
            event.tickets.push(ticket1);
            event.save(function (err) {
                if (err) {
                    next(err);
                }
                ticket1.save(function (err) {
                    if (err) {
                        next(err);
                    }
                });
                next(ticket);
            });
        };
    return {
        model: Ticket,
        getAllTickets: getAllTickets,
        getTicketsByIdUser: getTicketsByIdUser,
        createTicket: createTicket
    };
}());

module.exports = ticketsRepo;
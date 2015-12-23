"use strict";
//var mongoose = require('mongoose');

var ticketsRepo = (function () {
    var Ticket = require('./ticket.js');
    var getAllTickets = function (next) {
        Ticket.find({}).sort('price').populate('_event _user').exec(function (err, docs) {
            if (err) {
                console.log(err);
                next(err, null);
            }
            next(null, docs);
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
            event.save(function (err) {
                if (err) {
                    next(err);
                }
                var ticket1 = new Ticket({
                    price: ticket.price,
                    amount: ticket.amount,
                    createdOn: new Date(),
                    _event: ticket.eventid,
                    _user: ticket.userid
                });
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
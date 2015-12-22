"use strict";
//var mongoose = require('mongoose');

var ticketsRepo = (function () {
    var Ticket = require('./ticket.js');
    var getAllTickets = function (next) {
            Ticket.find({}).sort('price').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        getTicketsByIdUser = function (id, next) {
            Ticket.find({userid: id}).sort('name').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        createTicket = function (ticket, next) {
            ticket.creationDate = new Date();
            Ticket.create(ticket, function (err) {
                if (err) {
                    return next(err);
                }
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
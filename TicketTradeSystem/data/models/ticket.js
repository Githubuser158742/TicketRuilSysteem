var mongoose = require('mongoose');
var ticketSchema = require('../schemas/ticket');
var Ticket = mongoose.model('Ticket', ticketSchema, "tickets");
module.exports = Ticket;
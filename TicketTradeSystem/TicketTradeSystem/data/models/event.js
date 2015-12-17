var mongoose = require('mongoose');
var ticketSchema = require('../schemas/event');
var Ticket = mongoose.model('Event', eventSchema, "events");
module.exports = Event;
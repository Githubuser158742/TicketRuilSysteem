var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    eventid: {type: String, required: true},
    price: {type: Number},
    amount: {type: Number},
    userid: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

module.exports = ticketSchema;
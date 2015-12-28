var mongoose = require('mongoose'), Schema = mongoose.Schema;
var ticketSchema = new mongoose.Schema({
    _event: {type: Schema.ObjectId, ref: 'Event'},
    _user: {type: Schema.ObjectId, ref: 'User'},
    price: {type: Number},
    amount: {type: Number},
    createdOn: { type: Date, default: Date.now }
});

module.exports = ticketSchema;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    title: String,
    owner: String,
    price: Number,
    category: String
});

module.exports = mongoose.model('Ticket', ticketSchema);
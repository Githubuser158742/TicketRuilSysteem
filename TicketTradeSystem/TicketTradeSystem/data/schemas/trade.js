var mongoose = require('mongoose'), Schema = mongoose.Schema;
var tradeSchema = new mongoose.Schema({
    _ticket: {type: Schema.ObjectId, ref: 'Ticket'},
    _user: {type: Schema.ObjectId, ref: 'User'},
    amount: {type: Number},
    createdOn: {type: Data, default: Date.now}
});

module.exports = tradeSchema;
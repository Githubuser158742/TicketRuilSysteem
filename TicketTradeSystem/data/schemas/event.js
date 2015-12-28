var mongoose = require('mongoose'), Schema = mongoose.Schema;
var eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    date: {type: Date, required: true},
    time: {type: String},
    location: {type: String},
    city: {type: String},
    price: {type: Number},
    pictureUrl: {type: String},
    tags: [],
    createdOn: {type: Date, default: Date.now},
    userId: {type: String},
    tickets: [{ type: Schema.ObjectId, ref: 'Ticket' }],
    eventCancelled: { type: Boolean, default: false }
});

module.exports = eventSchema;
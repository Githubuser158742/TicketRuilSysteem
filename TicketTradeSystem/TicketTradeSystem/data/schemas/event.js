var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name              : { type: String, required: true },
    description       : { type: String },
    date              : { type: String, required: true },
    time              : { type: String },
    location          : { type: String },
    city              : { type: String },
    price             : { type: Number },
    pictureUrl        : { type: String },
    tags              : { type: String },
    createdOn         : {type: Date, default: Date.now},
    userId            : { type: String }
});

module.exports = eventSchema;
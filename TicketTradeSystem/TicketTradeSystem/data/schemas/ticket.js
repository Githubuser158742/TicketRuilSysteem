var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: { type: Number },
    userid:{type:String,required:true},
    createdOn: {type: Date, default: Date.now}
});

module.exports = ticketSchema;
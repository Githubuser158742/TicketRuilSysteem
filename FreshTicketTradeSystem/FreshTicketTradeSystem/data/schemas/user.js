var mongoose = require('mongoose');
var emailRegExp = /.+\@.+\..+/;
var schema = mongoose.Schema;

var UserSchema = new schema({
    username: { type: String, unique: true },
    email: {
        type: String,
        required: true,
        match: emailRegExp
        },
    password: String,
    createdOn: { type: Date, 'default': Date.now }
});

//var ticketSchema = new schema({
//    ticketName: String,
//    price: Number,
//    description: String,
//    createdOn: { type: Date, 'default': Date.now }
//});

//var TicketSchema = new mongoose.Schema({
//    name : { type: String, unique: true },
//    price : { type: Number, min: 0 },
//    user : [UserSchema]
//})

//module.exports = TicketSchema;
module.exports = UserSchema;
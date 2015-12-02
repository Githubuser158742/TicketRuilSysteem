var mongoose = require('mongoose');
var emailRegExp = /.+\@.+\..+/;

var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: { type: String, index: true },
    profession: String,
    email: {
        type: String,
        required: false,
        match: emailRegExp
    },
    gender: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        enum: ['M', 'F']
    },
    createdOn: { type: Date, 'default': Date.now }
});

//var TicketSchema = new mongoose.Schema({
//    name : { type: String, unique: true },
//    price : { type: Number, min: 0 },
//    user : [UserSchema]
//})

//module.exports = TicketSchema;
module.exports = UserSchema;
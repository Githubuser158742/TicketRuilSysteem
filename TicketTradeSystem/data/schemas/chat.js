var mongoose = require('mongoose');
var chatSchema = new mongoose.Schema({
    nick: String,
    message: String,
    room: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = chatSchema;

var mongoose = require('mongoose');
var tradeSchema = require('../schemas/trade');
var Trade = mongoose.model('Trade', tradeSchema, "trades");
module.exports = Trade;
"use strict";

var tradesRepo = (function () {
var Trade = require('./trade.js');
    var getAllTrades = function (next) {
        Trade.find({})
        .populate('_user')
        .populate({
            path: '_ticket',
            populate : {
                path: '_event',
                model: 'Event'
            }
        })
        .exec(function (err, docs) {
               if (err) {
                   console.log(err);
                   next(err, null);
            }
            var options = { path: '_ticket._user', model: 'User' };
            Trade.populate(docs, options, function(err, trades) {
                next(null, trades);
            });
           });
       },
        getTradesByIdUser = function (id, next) {
            Trade.find({ _user: id }).sort('createdOn').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        createTrade = function (trade, next) {
            var trade = new Trade({
                amount: trade.body.amount,
                createdOn: new Date(),
                _ticket: trade.params.id,
                _user: trade._passport.session.user
            });
            Trade.create(trade, function (err) {
                if (err) {
                    return next(err);
                }
                next(trade);
            });           
        };
    return {
        model: Trade,
        getAllTrades: getAllTrades,
        getTradesByIdUser: getTradesByIdUser,
        createTrade: createTrade
    };
}());

module.exports = tradesRepo;
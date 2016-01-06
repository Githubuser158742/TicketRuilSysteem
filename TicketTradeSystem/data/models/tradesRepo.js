/*jshint -W004 */
var tradesRepo = (function () {
    "use strict";
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
        getTradesByIdSeller = function (id, next) {
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
                Trade.populate(docs, options, function (err, trades) {
                    var trades2 = [];
                    trades.forEach(function (trade) {
                        if (trade._ticket._user._id == id) { 
                            trades2.push(trade);
                        }
                    });
                    console.log(trades);
                    console.log("-------------");
                    console.log(trades2);
                    next(null, trades2);
                });
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
        getTradesByIdSeller: getTradesByIdSeller,
        createTrade: createTrade
    };
}());

module.exports = tradesRepo;
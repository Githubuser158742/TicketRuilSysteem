"use strict";
var express = require('express');
var router = express.Router();

//middleware
var isAuthenticated = require('./middleware/isAuthenticated.js');

var tradesRepo = require('../data/models/tradesRepo');

router.get('/', isAuthenticated,function (req, res) {
    tradesRepo.getAllTrades(function (err, trades) {
        if (err) {
            res.status(500).send('server error - trades');
            res.end();
        }
        console.log(trades);
        res.render('trades/index', { title: 'Trades', tradeslist: trades });
    });
});

module.exports = router;
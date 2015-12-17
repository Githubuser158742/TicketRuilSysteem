﻿//#!/usr/bin/env node
//www op github
var debug = require('debug')('TicketTradeSystem');
var app = require('../app');
var config = require('../config/config');

app.set('port', process.env.PORT || 3000);

var DBService = require('../data/connectDBService.js');
var connectDB = DBService(config.MONGODBURL,require('mongoose'));

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
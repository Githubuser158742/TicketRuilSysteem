﻿var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var http = require('http');
var routes = require('./routes/index');
var tickets = require('./routes/tickets');
var events = require('./routes/events');
var profile = require('./routes/profile');
var trades = require('./routes/trades');
var attachAuthenticationStatus = require('./routes/middleware/attachAuthenticationStatus.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport
app.use(session({
    secret: 'ticketing',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);
app.use(flash());
app.use(attachAuthenticationStatus);

// routes

app.use('/', routes);
app.use('/profile', profile);
app.use('/tickets', tickets);
app.use('/events', events);
app.use('/trades', trades);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("----- ERROR 404: NOT FOUND -----");
    console.log(req);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

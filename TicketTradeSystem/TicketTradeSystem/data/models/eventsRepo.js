"use strict";
//var mongoose = require('mongoose');

var eventsRepo = (function () {
    var Event = require('./event.js');
    var getAllEvents = function (next) {
            Event.find({eventCancelled:false}).sort('name').exec(function (err, events) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, events);
            });
        },
        getEventsByCity = function (search, next) {
            Event.find({city: search}).sort('name').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        getEventByID = function (search, next) {
            Event.findOne({_id: search}, function (err, event) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, event);
            });
        },
        getEventsByIdUser = function (id, next) {
            Event.find({userId: id}).sort('name').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        createEvent = function (event, next) {
            event.creationDate = new Date();
            Event.create(event, function (err) {
                if (err) {
                    return next(err);
                }
                next(event);
            });
        };
    return {
        model: Event,
        getAllEvents: getAllEvents,
        getEventsByCity: getEventsByCity,
        getEventByID: getEventByID,
        getEventsByIdUser: getEventsByIdUser,
        createEvent: createEvent
    };
}());

module.exports = eventsRepo;
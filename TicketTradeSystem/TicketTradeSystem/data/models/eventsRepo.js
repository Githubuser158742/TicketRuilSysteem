"use strict";
//var mongoose = require('mongoose');

var eventsRepo = (function () {
    var Event = require('./event.js');
    var getAllEvents = function (next) {
            Event.find({eventCancelled:false}).populate('tickets').sort('date').exec(function (err, events) {
                if (err) {
                    console.log(err);
                    next(err, null);
            }
            console.log(events);
                next(null, events);
            });
        },
        search = function (search, next) { 
            Event.find({ name: new RegExp(search, "i"), eventCancelled: false }).populate('tickets').sort('date').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        getEventsByCity = function (search, next) {
            Event.find({city: search}).populate('tickets').sort('date').exec(function (err, docs) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, docs);
            });
        },
        getEventByID = function (search, next) {
            Event.findOne({_id: search}.populate('tickets'), function (err, event) {
                if (err) {
                    console.log(err);
                    next(err, null);
                }
                next(null, event);
            });
        },
        getEventsByIdUser = function (id, next) {
            Event.find({userId: id}).populate('tickets').sort('date').exec(function (err, docs) {
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
        search: search,
        getAllEvents: getAllEvents,
        getEventsByCity: getEventsByCity,
        getEventByID: getEventByID,
        getEventsByIdUser: getEventsByIdUser,
        createEvent: createEvent
    };
}());

module.exports = eventsRepo;
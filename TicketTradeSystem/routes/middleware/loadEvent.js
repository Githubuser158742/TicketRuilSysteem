"use strict";
var Event = require('../../data/models/event');

function loadEvent(req, res, next) {
    Event.findById({_id: req.params.id}, function (err, event) {
        if (err) {
            return next(err);
        }
        if (!event) {
            return res.send('Not found', 404);
        }
        req.event = event;
        next();
    });
}

module.exports = loadEvent;
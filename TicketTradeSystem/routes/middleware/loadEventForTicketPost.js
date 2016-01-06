var Event = require('../../data/models/event');

function loadEventForTicketPost(req, res, next) {
    "use strict";
    Event.findById({_id: req.body.eventid}, function (err, event) {
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

module.exports = loadEventForTicketPost;
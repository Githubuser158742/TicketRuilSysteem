var chatsRepo = (function () {
    "use strict";
    var Chat = require('./chat.js');
    var getChatByEvent = function (event, next) {
        Chat.find({room: event}).sort('createdOn').exec(function (err, docs) {
            if (err) {
                console.log(err);
                next(err, null);
            }
            next(null, docs);
        });
    };
    return {
        model: Chat,
        getChatByEvent: getChatByEvent
    };
}());

module.exports = chatsRepo;
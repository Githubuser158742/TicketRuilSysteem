var emitter = new (require('events').EventEmitter)();
var User = require("./data/models/user.js");
var router = require("./routes/index.js");

module.exports = function (io , mongoose) {
    
    io.sockets.on('connection', function (socket) {
        console.log("sockets connected")
            
        //socket.on('clientmessage', function (data) {                                       
        //});
        
        router.emitter.on('routermessage', function (user) {
            console.log("welkom " + user.local.firstname);
            socket.emit("message", "Welkom " + user.local.firstname);
        });

        socket.on('message', function (content) {
            socket.emit('serverMessage', JSON.stringify(obj));
            socket.broadcast.emit('serverMessage', JSON.stringify(obj));
        });

        //socket.on('newUser', function (user) {
        //    var user = JSON.parse(user);
        //    usersRepo.createUser(user , function (next) {
        //        //1. error handling   (nog extern plaatsen)      
        //        if (next.errors && next.name === 'ValidationError') {
        //            var errString = Object.keys(next.errors).map(function (errField) {
        //                return next.errors[errField].message;
        //            }).join('<br />\n');
        //            socket.emit("message", errString);
        //        } else if (next.errors) {
        //            next(new Error(next.message));
        //        } else {
        //            //2. indien geen errors
        //            //2.1. socket communicatie
        //            socket.emit("message", "Welkom " + user.username + " als nieuwe gebruiker.");
        //            socket.broadcast.emit("message", "Nieuwe  gebruiker " + user.username + " is toegevoegd");
                    
        //            //2.2. redirect ( geen req of res beschikbaar)
        //            socket.emit('creation_success');;
        //            return
        //        }
        //    });
        //});
    });
};
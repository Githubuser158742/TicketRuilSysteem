var Chat = require('./data/models/chat.js');

module.exports = function (io) {

    var users = {};

    io.sockets.on('connection', function (socket) {
        
        socket.on('disconnect', function () {
            if (io.nsps["/"].adapter.rooms[socket.room]) {
                io.sockets.in(socket.room).emit('nick', Object.keys(io.nsps["/"].adapter.rooms[socket.room]).length);
            }
            else {
                console.log(socket.room + " is empty");
            }
        });
        
        socket.on('join', function (room) {
            socket.join(room);
            socket.room = room;
        });
        
        socket.on('nick', function (nick) {
            socket.nick = nick;
            io.sockets.in(socket.room).emit('nick', Object.keys(io.nsps["/"].adapter.rooms[socket.room]).length);
        });
        
        socket.on('chatroom', function (data) {
            var newMessage = new Chat({message: data.message, nick: socket.nick, room: socket.room});
            newMessage.save(function (err) {
                if(err) throw err;
            });
            io.sockets.in(socket.room).emit('chatroom', {message: data.message, nick: socket.nick});
        });
    });
};
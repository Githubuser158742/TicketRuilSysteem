module.exports = function (io) {

    var allClients = [];

    io.sockets.on('connection', function (socket) {

        socket.on('disconnect', function () {
<<<<<<< HEAD
            if (io.nsps["/"].adapter.rooms[socket.room]) {
                io.sockets.in(socket.room).emit('nick', Object.keys(io.nsps["/"].adapter.rooms[socket.room]).length);
            }
            else {
                console.log(socket.room + " is empty");
            }
=======
            console.log('Someone has disconnected from the chat.');
            console.log(socket);
            //io.sockets.in(socket.room).emit('nick', Object.keys(io.nsps["/"].adapter.rooms[socket.room]).length);
>>>>>>> origin/master
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
            var payload = {
                message: data.message,
                nick: socket.nick,
            };
            io.sockets.in(socket.room).emit('chatroom', payload);
        });
    });
};
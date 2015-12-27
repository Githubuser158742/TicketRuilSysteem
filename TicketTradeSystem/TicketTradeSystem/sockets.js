module.exports = function (io) {

    var allClients = [];

    io.sockets.on('connection', function (socket) {
        socket.on('disconnect', function () {
            console.log('Got disconnect!');
            allClients.splice(allClients.indexOf(socket.nick), 1);
            socket.emit('nick', allClients);
            socket.broadcast.emit('nick', allClients);
        });
        
        socket.on('join', function (room) {
            socket.join(room);
            socket.room = room;
            console.log('joining room ' + socket.room);
        });
        
        socket.on('nick', function (nick) {
            socket.nick = nick;
            allClients.push(socket.nick);
            socket.emit('nick', allClients);
            socket.broadcast.emit('nick', allClients);
        });
        
        socket.on('chatroom', function (data) {
            var nick = socket.nick;
            var room = socket.room;
            var payload = {
                message: data.message,
                nick: nick,
            };
            io.sockets.in(room).emit('chatroom', payload);
        });
    });
};
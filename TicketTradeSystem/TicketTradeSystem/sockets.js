module.exports = function (io) {

    var allClients = [];

    io.sockets.on('connection', function (socket) {
        socket.on('disconnect', function () {
            console.log('Got disconnect!');
            allClients.splice(allClients.indexOf(socket.nick), 1);
            socket.emit('nick', allClients);
            socket.broadcast.emit('nick', allClients);
        });

        socket.on('nick', function (nick) {
            socket.nick = nick;
            allClients.push(socket.nick);
            socket.emit('nick', allClients);
            socket.broadcast.emit('nick', allClients);
        });

        socket.on('chatroom', function (data) {
            var nick = socket.nick;
            var payload = {
                message: data.message,
                nick: nick
            };
            socket.emit('chatroom', payload);
            socket.broadcast.emit('chatroom', payload);
        });
    });
};
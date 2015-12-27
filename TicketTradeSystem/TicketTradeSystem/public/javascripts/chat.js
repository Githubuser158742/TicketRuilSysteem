document.addEventListener("DOMContentLoaded", function () {
    var socket = io.connect();
        
    socket.on('connect', function () {
        socket.emit('join', room);
    });

    //socket.on('nick', function (data) {
    //    document.getElementById("Clients").value = "";
    //    data.forEach(function (entry) {
    //        document.getElementById("Clients").value = document.getElementById("Clients").value + entry + '\n';
    //    });
    //});
    
    socket.on('nick', function (data) {
        document.getElementById("Clients").value = data + " people are connected to " + roomName;
    });
    
    socket.on('chatroom', function (data) {
        var msg = data.nick + ': ' + data.message;
        document.getElementById("Text").value = document.getElementById("Text").value + msg + '\n';
    });

    socket.emit('nick', nickname);
    document.getElementById("chat").addEventListener("click", function () {
        socket.emit('chatroom', {
            message: document.getElementById("input").value
        });
    }, false);
}, false);
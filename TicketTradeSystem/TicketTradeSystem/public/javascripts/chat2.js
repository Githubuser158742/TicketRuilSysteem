document.addEventListener("DOMContentLoaded", function () {
    console.log('init');
    var socket = io.connect();
    socket.on('nick', function (data) {
        console.log("connect");
        document.getElementById("Clients").value = "";
        data.forEach(function (entry) {
            console.log(entry);
            document.getElementById("Clients").value = document.getElementById("Clients").value + entry + '\n';
        });
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
document.addEventListener("DOMContentLoaded", function () {
    var socket = io.connect();
    socket.on('nick', function (data) {
        document.getElementById("Clients").value = "";
        data.forEach(function (entry) {
            document.getElementById("Clients").value = document.getElementById("Clients").value + entry + '\n';
        });
    });
    
    socket.on('chatroom', function (data) {
        var msg = data.nick + ': ' + data.message;
        document.getElementById("Text").value = document.getElementById("Text").value + msg + '\n';
    });
    
    socket.emit('subscribe', room);

    socket.emit('nick', nickname);
    document.getElementById("chat").addEventListener("click", function () {
        socket.emit('chatroom', {
            message: document.getElementById("input").value
        });
    }, false);

    //if(onkeydown==true && keyboardEvent.keyCode === 13){
    //    socket.emit('chatroom', {
    //        message: document.getElementById("input").value
    //    });
//}
}, false);  
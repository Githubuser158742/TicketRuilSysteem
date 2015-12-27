console.log("chat.js loaded");

var client = {};
client.chat = (function (txtInput, txtMessages) {
    var connection = window.location.origin,
        socket = io.connect(connection);
    
    var lastMsg;
    
    socket.on("serverMessage", function (json) {
        showMessage(JSON.parse(json));
    })
    
    var lastMsg;
    function showMessage(obj) {
        var messages = document.getElementById(txtMessages),      
            newMsg = document.createElement("div");
        
        newMsg.appendChild(document.createTextNode(obj.id + " said: " + obj.content));
        newMsg.style.color = obj.color;
        
        messages.insertBefore(newMsg, lastMsg)
        lastMsg = newMsg;
    }
    
    var onkeydown = function (keyboardEvent) {
        var inpClient = document.getElementById(txtInput);
        if (keyboardEvent.keyCode === 13) {
            socket.emit('message', inpClient.value);
            inpClient.value = '';
            return false;
        } else {
            return true;
        }
    };
    
    var addHandlers = function () {
        inpClient.addEventListener("keydown", onkeydown);
    }
    
    var start = function () {
        document.addEventListener("DOMContentLoaded", function (event) {
            console.log("DOMContentLoaded and parsed");
            addHandlers();
        });
    }
    
    return {
        start: start(),
        addHandlers: addHandlers
    }

})('inpClient', 'messages');

client.chat.start;
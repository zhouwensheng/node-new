var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    // 监听客户端发送的 chat 事件
    socket.on('chat', function (chatinfo) {
        // 向除了当前 socket 外的所有 socket 发送聊天信息
        console.log(1)
        socket.broadcast.emit('chat', chatinfo);
    });
    socket.on('chat2', function (chatinfo) {
        console.log(2)
        // 向除了当前 socket 外的所有 socket 发送聊天信息
        socket.broadcast.emit('chat2', chatinfo);
    });
    socket.on('chat3', function (chatinfo) {
        console.log(3)
        // 向除了当前 socket 外的所有 socket 发送聊天信息
        socket.broadcast.emit('chat3', chatinfo);
    });
    socket.on('chat4', function (chatinfo) {
        console.log(4)
        // 向除了当前 socket 外的所有 socket 发送聊天信息
        socket.broadcast.emit('chat4', chatinfo);
    });
    socket.on('chat5', function (chatinfo) {
        console.log(5)
        // 向除了当前 socket 外的所有 socket 发送聊天信息
        socket.broadcast.emit('chat5', chatinfo);
    });
});
server.listen(808);
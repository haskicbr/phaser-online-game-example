var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var allPlayers = {};

io.on('connection', function (socket) {

    var handshakeData = socket.request;

    var user = handshakeData._query.user;
    
    console.log(handshakeData._query.user);

    allPlayers[user] = {

    };

    io.emit('load-player', allPlayers);

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {

        delete allPlayers[user];

        io.emit('remove-player', {msg : 'пользователь ' + user + ' отключился...', user : user});
    });

    socket.on('move', function (params) {

        allPlayers[ params.index].offsetLeft = params.offsetLeft;
        allPlayers[ params.index].offsetTop  = params.offsetTop;

        io.emit('move', {
            direction   : params.direction,
            index       : params.index,
            offsetLeft  : params.offsetLeft,
            offsetTop   : params.offsetTop
        });
    });

    socket.on('add-player', function(params) {
        allPlayers.push(params);
    });
    
    socket.on('damage', function(params) {
        io.emit('damage', params);
    });
});


http.listen(777, function(){
  console.log('listening on *:777');
});

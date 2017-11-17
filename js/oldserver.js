var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ROT = require('rot-js');


app.use(express.static(__dirname)); // Current directory is root

// var Players = [];

var Game = {
    screenW: 80,
    screenH: 25,
    mapW: 8,
    mapH: 8,
}


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    var id = socket.id;
    var ip = socket.request.connection.remoteAddress;
    var player = new Player('jw', 'addy', id, ip)
    console.log("Client connected with id %s and ip %s".format(id, ip));
    //Players.push(new Player('jw', 'addy', id, ip));

    io.emit('welcome', "You are now connected.");
    console.log("Player id is %s".format(player.id));
    //console.log(Players[0].sendData);

    socket.on('info', function(data){
      console.log(data);
      player.nick = data.split(',')[0];
      player.addy = data.split(',')[1];
      io.emit('display', JSON.stringify(player.sendData));
    })

    socket.on('key', function(key) {
      var dir = null;
      if (dir) {
        console.log(dir);
        var moveResult = player.tryMove(dir);
        //console.log(moveResult);
        socket.emit('display', JSON.stringify(moveResult[0]));
        socket.emit('move_message', moveResult[1]);
      }
    })
});


http.listen(8001, function(){
    console.log('listening on *:8001');
});

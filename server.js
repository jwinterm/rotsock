var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ROT = require('rot-js');

var Map = require('./serverjs/map.js');
var Player = require('./serverjs/player.js');
var Glyph = require('./serverjs/glyph.js');

app.use(express.static(__dirname)); // Current directory is root

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


var Game = {
    screenW: 80,
    screenH: 25,
    Players: [],
};

var map = Map.createArena(10, 10);
map.consoleDisplay();

function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
    console.log(array[i]);
    if(array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

io.on('connection', function(socket){
    var id = socket.id;
    var ip = socket.request.connection.remoteAddress;
    Game.Players.push(Player.createPlayer('jw', 'addy', id, ip));
    console.log("Client connected with id %s and ip %s".format(id, ip));
    //Players.push(new Player('jw', 'addy', id, ip));

    socket.on('info', function(data){
      console.log(data);
      var idx = findWithAttr(Game.Players, 'id', socket.id);
      console.log(id, socket.id, idx)
      Game.Players[idx].nick = data.split(',')[0];
      Game.Players[idx].addy = data.split(',')[1];
    })
});

function pushMap() {
  for (player in Game.Players) {
    io.to(player.id).emit("display", JSON.stringify(map));
  }
}
// setTimeout(pushMap, 1000);

http.listen(8001, function(){
    console.log('listening on *:8001');
});


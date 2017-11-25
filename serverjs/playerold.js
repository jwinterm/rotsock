


function Player (nick, addy, id, ip) {
  // Setup the bookkeeping stuff
  this.nick = nick || "Anon";
  this.addy = addy || "MLaMWLvFJMai3czhrK6peenVT2S2hFgmUi";
  this.id = id;
  this.ip = ip;
  this.starttime = Date.now();

  // Setup the full map
  this.map = new ROT.Map.Arena(Game.mapW, Game.mapH);
  // this.map = new ROT.Map.Rogue(Game.mapW, Game.mapH);
  this.mapData = {};
  this.fovData = {};
  this.sendData = {};
  this.mapgen = function(map, mapData) {
    var mapCallback = function(x, y, value) {
      mapData[x+','+y] = value;
    }
    map.create(mapCallback);
  }
  this.mapgen(this.map, this.mapData);
  //console.log(this.mapData);

  // Create the escape, orbs, and enemies
  this.entities = {};

  // Setup the player initial position
  while (true) {
    var x = Math.floor(ROT.RNG.getUniform()*Game.mapW);
    var y = Math.floor(ROT.RNG.getUniform()*Game.mapH);
    if (this.mapData[x+','+y] == 0) {
      this.player_x = x;
      this.player_y = y;
      break;
    }
  }

  // Set the entities
  while (true) {
    var x = Math.floor(ROT.RNG.getUniform()*Game.mapW);
    var y = Math.floor(ROT.RNG.getUniform()*Game.mapH);
    if (this.mapData[x+','+y] == 0
    && !(this.player_x == x && this.player_y == y )) {
      this.escape = x+','+y;
      console.log("This escape is: " + this.escape);
      break;
    }
  }

  // Create list to store orbs
  for (i=0; i<8; i++) {
    while (true) {
      var x = Math.floor(ROT.RNG.getUniform()*Game.mapW);
      var y = Math.floor(ROT.RNG.getUniform()*Game.mapH);
      if (this.mapData[x+','+y] == 0
      && !(this.player_x == x && this.player_y == y )) {
        this.escape = x+','+y;
        break;
      }
    }
  }
  // this.entities['2,2'] = 'o'

  // Setup the FOV and portion of the map to send to Client
  this.fovcalc = function(player_x, player_y, mapData, fovData, entities) {
    /* input callback */
    var lightPasses = function(x, y) {
      var key = x+','+y;
      if (key in mapData) {
        // console.log(key, mapData[key], mapData[key] == 0);
        return (mapData[key] === 0);
       }
      return false;
    }
    var fov = new ROT.FOV.PreciseShadowcasting(lightPasses);
    /* output callback */
    fov.compute(player_x, player_y, 7, function(x, y, r, visibility) {
      // console.log(x, y, r, visibility);
      var key = x+','+y;
      var ch = (r ? "" : "@");
      if (r == 0) {ch = '@'}
      else if (mapData[key] == 0) {ch = '.'}
      else if (mapData[key] == 1) {ch = '#'}
      var color = ROT.Color.interpolate([242, 255, 92], [30, 30, 60], (r/7)*visibility);
      fovData[key] = {glyph: ch, color: color};
      if (key == this.escape) {
        fovData[key] = {glyph: '<', color: ROT.Color.fromString("fff")}
      }
      // display.draw(x, y, ch, "#fff", color);
      console.log(key, this.escape, fovData[key]);
    });
  }
  this.fovcalc(this.player_x, this.player_y, this.mapData,
    this.fovData, this.entities);

  this.fovToSend = function (player_x, player_y, fovData, sendData) {
    var keys = Object.keys(fovData);
    var shift_x = 20-player_x;
    var shift_y = 10-player_y;
    for (var i = 0; i < keys.length; i++) {
      var x = parseInt(keys[i].split(',')[0]);
      var y = parseInt(keys[i].split(',')[1]);
      // console.log(fovData[x+','+y]);
      sendData[(x+shift_x)+','+(y+shift_y)] = fovData[x+','+y];
    }
    // console.log(sendData);
  }
  this.fovToSend(this.player_x, this.player_y, this.fovData, this.sendData);
  //console.log(this.mapData);

  this.tryMove = function (dir) {
    var delta_x = dir[0];
    var delta_y = dir[1];
    var new_x = this.player_x + delta_x;
    var new_y = this.player_y + delta_y;
    if (this.mapData[new_x+','+new_y] == 0) {
      this.fovData = {};
      this.sendData = {};
      this.player_x = new_x;
      this.player_y = new_y;
      this.fovcalc(this.player_x, this.player_y, this.mapData, this.fovData, this.entities);
      this.fovToSend(this.player_x, this.player_y, this.fovData, this.sendData);
      console.log(this.fovToSend);
      var sendMessage = "Player has moved %s".format(dir);
    }
    else {var sendMessage = "Can't move there!"}
    return [this.sendData, sendMessage];
  }
}


// var playerLookup = function (players, id) {
//   for (var i = 0; i < players.length; i++) {
//     if (players[i].id == id) {
//       return players[i];
//     }
//   }
// }


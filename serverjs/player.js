// Player.js
// ============

  
function Player(nick, addy, id, ip) {
  // Setup the bookkeeping stuff
  this._nick = nick || "Anon";
  this._addy = addy || "MLaMWLvFJMai3czhrK6peenVT2S2hFgmUi";
  this._id = id;
  this._ip = ip;
  this._jointime = Date.now();
  this._x = 0;
  this._y = 0;
  return this;
};

Player.prototype.getNick = function() {
    return this._nick;
}

Player.prototype.processInput = function(key) { 
  if (key == "VK_K" || key == "VK_NUMPAD8" || key == "VK_UP") {
    dir = ROT.DIRS["8"][0];
  }
  else if (key == "VK_U" || key == "VK_NUMPAD9") {
    dir = ROT.DIRS["8"][1];
  }
  else if (key == "VK_L" || key == "VK_NUMPAD6" || key == "VK_RIGHT") {
    dir = ROT.DIRS["8"][2];
  }
  else if (key == "VK_N" || key == "VK_NUMPAD3") {
    dir = ROT.DIRS["8"][3];
  }
  else if (key == "VK_J" || key == "VK_NUMPAD2" || key == "VK_DOWN") {
    dir = ROT.DIRS["8"][4];
  }
  else if (key == "VK_B" || key == "VK_NUMPAD1") {
    dir = ROT.DIRS["8"][5];
  }
  else if (key == "VK_H" || key == "VK_NUMPAD4" || key == "VK_LEFT") {
    dir = ROT.DIRS["8"][6];
  }
  else if (key == "VK_Y" || key == "VK_NUMPAD7") {
    dir = ROT.DIRS["8"][7];
  }
  else {
    dir = null;
  }
  return dir;
}

module.exports = {
  Player,
};



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Create our Mixins namespace
Mixins = {};

// Define our Moveable mixin
Mixins.Moveable = {
    name: 'Moveable',
    tryMove: function(x, y, map) {
        var tile = map.getTile(x, y);
        // Check if we can walk on the tile
        // and if so simply walk onto it
        if (tile.isWalkable()) {
            // Update the entity's position
            this._x = x;
            this._y = y;
            return true;
        // Check if the tile is diggable, and
        // if so try to dig it
        } else if (tile.isDiggable()) {
            map.dig(x, y);
            return true;
        }
        return false;
    }
}
// Main player's actor mixin
Mixins.PlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act: function() {      
    }
}

// Player template
PlayerTemplate = {
    character: '@',
    foreground: 'white',
    background: 'black',
    mixins: [Mixins.Moveable, Mixins.PlayerActor],
}

module.exports = {
  Mixins,
  PlayerTemplate,
};
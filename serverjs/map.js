// map.js
// =========
var ROT = require('rot-js');
var Glyph = require('./glyph.js');
var Tile = require('./tile.js');

var w = 80;
var h = 40;


function Map(tiles) {
    this._tiles = tiles;
    // cache the width and height based
    // on the length of the dimensions of
    // the tiles array
    this._width = tiles.length;
    this._height = tiles[0].length;
};

// Standard getters
Map.prototype.getWidth = function() {
    return this._width;
};
Map.prototype.getHeight = function() {
    return this._height;
};

// Gets the tile for a given coordinate set
Map.prototype.getTile = function(x, y) {
    // Make sure we are inside the bounds. If we aren't, return
    // null tile.
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return Tile.nullTile;
    } else {
        return this._tiles[x][y] || Tile.nullTile;
    }
};

Map.prototype.consoleDisplay = function() {
    for (var x = 0; x < this.getWidth(); x++) {
        for (var y = 0; y < this.getHeight(); y++) {
            console.log(this.getTile(x, y));
        }
        console.log('\n');
    }
}

function createArena(w, h) {
    var tilearray = []
    for (var x = 0; x < w; x++) {
        tilearray.push([]);
        for (var y = 0; y < h; y++) {
            tilearray[x].push(Tile.Tile.nullTile);
        }
    }
    console.log(tilearray);
    var generator = new ROT.Map.Arena(w, h);
    generator.create(function(x, y, v) {
        if (v === 1) {
            tilearray[x][y] = Tile.Tile.floorTile;
        } else {
            tilearray[x][y] = Tile.Tile.wallTile;
        }
    });
    return new Map(tilearray);
}


module.exports = {
  Map,
  createArena,
};

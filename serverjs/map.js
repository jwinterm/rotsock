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
    this._entities = [];
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

Map.prototype.getEntities = function() {
    return this._entities;
}

Map.prototype.getEntityAt = function(x, y){
    // Iterate through all entities searching for one with
    // matching position
    for (var i = 0; i < this._entities.length; i++) {
        if (this._entities[i].getX() == x && this._entities[i].getY() == y) {
            return this._entities[i];
        }
    }
    return false;
}

Map.prototype.addEntity = function(entity) {
    // Make sure the entity's position is within bounds
    if (entity.getX() < 0 || entity.getX() >= this._width ||
        entity.getY() < 0 || entity.getY() >= this._height) {
        throw new Error('Adding entity out of bounds.');
    }
    // Update the entity's map
    entity.setMap(this);
    // Add the entity to the list of entities
    this._entities.push(entity);
    // Check if this entity is an actor, and if so add
    // them to the scheduler
    //if (entity.hasMixin('Actor')) {
    //   this._scheduler.add(entity, true);
    //}
}

Map.prototype.addEntityAtRandomPosition = function(entity) {
    var position = this.getRandomFloorPosition();
    entity.setX(position.x);
    entity.setY(position.y);
    this.addEntity(entity);
}

Map.prototype.consoleDisplay = function() {
    for (var x = 0; x < this.getWidth(); x++) {
        var printString = '';
        for (var y = 0; y < this.getHeight(); y++) {
            if (this.getEntityAt(x, y)) {
                printString += this.getEntityAt(x, y).getChar();
            } else {
                printString += this.getTile(x, y).getChar();
            }
        }
        console.log(printString);
    }
}

Map.prototype.dig = function(x, y) {
    // If the tile is diggable, update it to a floor
    if (this.getTile(x, y).isDiggable()) {
        this._tiles[x][y] = Tile.Tile.floorTile;
    }
}

Map.prototype.getRandomFloorPosition = function() {
    // Randomly generate a tile which is a floor
    var x, y;
    do {
        x = Math.floor(Math.random() * this._width);
        y = Math.floor(Math.random() * this._width);
    } while(this.getTile(x, y) != Tile.Tile.floorTile ||
            this.getEntityAt(x, y));
    return {x: x, y: y};
}

function createArena(w, h) {
    var tilearray = []
    for (var x = 0; x < w; x++) {
        tilearray.push([]);
        for (var y = 0; y < h; y++) {
            tilearray[x].push(Tile.Tile.nullTile);
        }
    }
    //console.log(tilearray);
    var generator = new ROT.Map.Arena(w, h);
    generator.create(function(x, y, v) {
        if (v === 0) {
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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Glyph = require('./glyph.js');

Tile = function(properties) {
    properties = properties || {};
    // Call the Glyph constructor with our properties
    Glyph.Glyph.call(this, properties);
    // Set up the properties. We use false by default.
    this._walkable = properties['walkable'] || false;
    this._diggable = properties['diggable'] || false;
    this._blocksLight = (properties['blocksLight'] !== undefined) ?
        properties['blocksLight'] : true;
};
// Make tiles inherit all the functionality from glyphs
Tile.extend(Glyph.Glyph);

// Standard getters
Tile.prototype.isWalkable = function() {
    return this._walkable;
}
Tile.prototype.isDiggable = function() {
    return this._diggable;
}
Tile.prototype.isBlocksLight = function() {
    return this._blocksLight;
}

Tile.nullTile = new Tile({})
Tile.floorTile = new Tile({
    character: '.',
    walkable: true
});
Tile.wallTile = new Tile({
    character: '#',
    foreground: 'goldenrod',
    diggable: true
});

module.exports = {
  Tile,
};
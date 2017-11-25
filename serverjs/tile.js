/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Glyph = require('./glyph.js');

Tile = function(glyph) {
    this._glyph = glyph;
};

Tile.prototype.getGlyph = function() {
    return this._glyph;
};

Tile.nullTile = new Tile(new Glyph.Glyph());
Tile.floorTile = new Tile(new Glyph.Glyph('.'));
Tile.wallTile = new Tile(new Glyph.Glyph('#', 'goldenrod'));


module.exports = {
  Tile,
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Glyph = function(properties) {
    // Instantiate properties to default if they weren't passed
    properties = properties || {};
    this._char = properties['character'] || ' ';
    this._foreground = properties['foreground'] || 'white';
    this._background = properties['background'] || 'black';
};

// Create standard getters for glyphs
Glyph.prototype.getChar = function(){ 
    return this._char; 
}
Glyph.prototype.getBackground = function(){
    return this._background;
}
Glyph.prototype.getForeground = function(){ 
    return this._foreground; 
}

module.exports = {
  Glyph,
};

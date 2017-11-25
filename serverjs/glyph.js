/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Glyph = function(chr, foreground, background) {
    // Instantiate properties to default if they weren't passed
    this._char = chr || ' ';
    this._foreground = foreground || 'white';
    this._background = background || 'black';
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

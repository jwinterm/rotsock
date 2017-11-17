var Game = {
	_display: null,
  _map: null,
  _screenWidth: 80,
  _screenHeight: 25,
  _mapWidth: 8,
  _mapHeight: 8,

  init: function() {
      this._display = new ROT.Display({width: this._screenWidth,
                                       height: this._screenHeight});
		  this._display.drawText(1,1, "%c{yellow}Welcome to the Dungeon of Myr.");
			this._display.drawText(1,2, "%c{cyan}You have been cast into the dungeon for questioning");
			this._display.drawText(1,3, "%c{blue}the word of the high priest Maxspell.");
			this._display.drawText(1,4, "%c{red}If you escape, it may be with untold riches,");
			this._display.drawText(1,5, "%c{pink}so enter your Myriadcoin address above.");
			this._display.drawText(1,6, "Press the [Enter] button to start!");

			this._map = [];

      var game = this; // So that we don't lose this
  },

  getDisplay: function() {
      return this._display;
  },

  getScreenWidth: function() {
      return this._screenWidth;
  },

  getScreenHeight: function() {
      return this._screenHeight;
  },

	clearDisplay: function() {
		for (var i = 0; i < this._screenWidth; i++) {
			for (var j = 0; j < this._screenHeight; j++) {
				this._display.draw(i, j, '', '#000', '#000')
			}
		}
	}

};

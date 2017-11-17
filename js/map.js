// map.js
// =========
var ROT = require('rot-js');

var w = 10;
var h = 10;
var maparray = [];
for(i = 0; i < w; i++) {
 maparray.push([]);
} 

function createArena(w, h) {
  return new ROT.Map.Arena(w, h);
}

function printCallback(x, y, value) {
  console.log(x, y, value);
}

function arrayCallback(x, y, value) {
  maparray[x][y] = value;
  console.log(x, y, value);
}


module.exports = {
  maparray,
  createArena,
  printCallback,
  arrayCallback,
};

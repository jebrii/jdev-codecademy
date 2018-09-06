'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require('./board.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
  function Game(numRows, numCols, numBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numRows, numCols, numBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, colIndex) {
      var result = this._board.flipTile(rowIndex, colIndex);
      dbg('result: ' + result);
      /*
      if (result === 0) {
        Array([-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]).forEach((tile) => this._board.flipTile(rowIndex + tile[0], colIndex + tile[1]));
      }
      */
      this._board.print();
      if (result === 'B') {
        console.log('There\'s a bomb at ' + rowIndex + ', ' + colIndex + '!');
        console.log('GAME OVER.');
        //      return false;
      } else if (!this._board.hasSafeTiles()) {
        console.log('YOU WIN!');
        //      return false;
      }
      //    return true;
    }
  }]);

  return Game;
}();
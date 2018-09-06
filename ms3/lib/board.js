'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numRows, numCols, numBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numBombs;
    this._numberOfTiles = numRows * numCols;
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols);
    this._bombBoard = Board.generateBombBoard(numRows, numCols, numBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, colIndex) {
      if (this._playerBoard[rowIndex][colIndex] !== ' ') {
        dbg('flipTile: Already flipped at (' + rowIndex + ', ' + colIndex + ')!');
        return;
      } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
        dbg('flipTile: There\'s a bomb at (' + rowIndex + ', ' + colIndex + ')!');
        this._playerBoard[rowIndex][colIndex] = 'B';
        return 'B';
      } else {
        dbg('flipTile: The tile at (' + rowIndex + ', ' + colIndex + ') has not been flipped. Checking for adjacent bombs.');
        this._playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
        this._numberOfTiles--;
        return this._playerBoard[rowIndex][colIndex];
      }
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, colIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfCols = this._bombBoard[0].length;
      var adjacentBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColIndex = colIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColIndex > 0 && neighborColIndex < numberOfCols) {

          dbg('-> Checking offset at index ' + neighborRowIndex + ', ' + neighborColIndex);

          if (_this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
            dbg('-> -> I found a bomb at index ' + neighborRowIndex + ', ' + neighborColIndex);
            adjacentBombs++;
          } else {
            dbg('-> -> No bomb here');
          }
        } else {
          dbg('-> Tile at index ' + neighborRowIndex + ', ' + neighborColIndex + ' is not valid.');
        }
      });
      return adjacentBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles > this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log('\nCurrent board configuration:');
      console.log(this.playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
      console.log('\n');
      dbg('Remaining safe tiles: ' + (this._numberOfTiles - this._numberOfBombs) + ';');
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }, {
    key: 'numberOfTiles',
    get: function get() {
      return this._numberOfTiles;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numRows, numCols) {
      /*
      if (numRows <= 2 || numRows > 54) {
        throw 'Rows must be greater than 2 and fewer than 55.';
      }
      if (numCols <= 2 || numCols > 15) {
        throw 'Columns must be greater than 2 and fewer than 16.';
      }
      dbg(`Creating player board with ${numRows} rows and ${numCols} columns.`);
      */
      var board = [];
      for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numRows, numCols, numBombs) {
      if (numRows <= 2 || numRows > 54) {
        throw 'Rows must be greater than 2 and fewer than 55.';
      }
      if (numCols <= 2 || numCols > 15) {
        throw 'Columns must be greater than 2 and fewer than 16.';
      }
      if (numBombs < 1 || numBombs >= numRows * numCols) {
        throw 'Number of Bombs must be greater than 0 and fewer than total number of squares';
      }
      //  dbg(`Creating player board with ${numRows} rows and ${numCols} columns.`);
      var board = [];
      for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
          row.push(' ');
        }
        board.push(row);
      }

      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numBombs) {
        var randomRowIndex = Math.floor(Math.random() * numRows);
        var randomColIndex = Math.floor(Math.random() * numCols);
        if (board[randomRowIndex][randomColIndex] !== 'B') {
          board[randomRowIndex][randomColIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }

      return board;
    }
  }]);

  return Board;
}();
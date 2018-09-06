// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import Board from './board.js';

class Game {
  constructor(numRows, numCols, numBombs) {
    this._board = new Board(numRows, numCols, numBombs);
  }
  playMove(rowIndex, colIndex) {
    const result = this._board.flipTile(rowIndex, colIndex);
    /*
    if (result === 0) {
      Array([-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]).forEach((tile) => this._board.flipTile(rowIndex + tile[0], colIndex + tile[1]));
    }
    */
    this._board.print();
    if (result === 'B') {
      console.log(`There's a bomb at ${rowIndex}, ${colIndex}!`);
      console.log('GAME OVER.');
//      return false;
    } else if (!this._board.hasSafeTiles()) {
      console.log('YOU WIN!');
//      return false;
    }
//    return true;
  }
}

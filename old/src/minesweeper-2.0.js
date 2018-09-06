const dbg = (msg) => {
  const debugMode = true;
  if (debugMode) { console.log(msg); }
};

class Game {
  constructor(numRows, numCols, numBombs) {
    this._board = new Board(numRows, numCols, numBombs);
  }
  playMove(rowIndex, colIndex) {
    const result = this._board.flipTile(rowIndex, colIndex);
    dbg(`result: ${result}`);
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

class Board {
  constructor(numRows, numCols, numBombs) {
    this._numberOfBombs = numBombs;
    this._numberOfTiles = numRows * numCols;
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols);
    this._bombBoard = Board.generateBombBoard(numRows, numCols, numBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get numberOfTiles() {
    return this._numberOfTiles;
  }

  flipTile(rowIndex, colIndex) {
    if (this._playerBoard[rowIndex][colIndex] !== ' ') {
      dbg(`flipTile: Already flipped at (${rowIndex}, ${colIndex})!`);
      return;
    } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
      dbg(`flipTile: There's a bomb at (${rowIndex}, ${colIndex})!`)
      this._playerBoard[rowIndex][colIndex] = 'B';
      return 'B';
    } else {
      dbg(`flipTile: The tile at (${rowIndex}, ${colIndex}) has not been flipped. Checking for adjacent bombs.`);
      this._playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
      this._numberOfTiles--;
      return this._playerBoard[rowIndex][colIndex];
    }
  }

  getNumberOfNeighborBombs(rowIndex, colIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfCols = this._bombBoard[0].length;
    let adjacentBombs = 0;

    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColIndex = colIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColIndex > 0 && neighborColIndex < numberOfCols) {

        dbg(`-> Checking offset at index ${neighborRowIndex}, ${neighborColIndex}`);

        if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
          dbg(`-> -> I found a bomb at index ${neighborRowIndex}, ${neighborColIndex}`);
          adjacentBombs++;
        } else {
          dbg('-> -> No bomb here');
        }
      } else {
        dbg(`-> Tile at index ${neighborRowIndex}, ${neighborColIndex} is not valid.`);
      }
    });
    return adjacentBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles > this._numberOfBombs;
  }

  print() {
    console.log('\nCurrent board configuration:');
    console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
    console.log('\n');
    dbg(`Remaining safe tiles: ${this._numberOfTiles - this._numberOfBombs};`)
  }

  static generatePlayerBoard(numRows, numCols) {
    /*
    if (numRows <= 2 || numRows > 54) {
      throw 'Rows must be greater than 2 and fewer than 55.';
    }
    if (numCols <= 2 || numCols > 15) {
      throw 'Columns must be greater than 2 and fewer than 16.';
    }
    dbg(`Creating player board with ${numRows} rows and ${numCols} columns.`);
    */
    const board = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numRows, numCols, numBombs) {
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
    const board = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push(' ');
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numBombs) {
      let randomRowIndex = Math.floor(Math.random() * numRows);
      let randomColIndex = Math.floor(Math.random() * numCols);
      if (board[randomRowIndex][randomColIndex] !== 'B') {
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  };
}


// NEW CODE
const g = new Game(3,3,8);
g.playMove(1,1);

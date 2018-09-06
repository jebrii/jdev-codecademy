export class Board {
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
      console.log("Tile already flipped!");
      return;
    } else if (this._bombBoard[rowIndex][colIndex] === 'B') {
      this._playerBoard[rowIndex][colIndex] = 'B';
      return 'B';
    } else {
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
        if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
          adjacentBombs++;
        }
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
  }

  static generatePlayerBoard(numRows, numCols) {
    /*
    if (numRows <= 2 || numRows > 54) {
      throw 'Rows must be greater than 2 and fewer than 55.';
    }
    if (numCols <= 2 || numCols > 15) {
      throw 'Columns must be greater than 2 and fewer than 16.';
    }
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

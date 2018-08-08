const debug = true;

const debugMsg = (text, debugFlag = false) => {
  if (debug) {
    if (debugFlag) {
      console.log('DEBBUG: ' + text);
    } else {
      console.log(text);
    }
  }
};

const generatePlayerBoard = (numRows, numCols) => {
  if (numRows <= 2 || numRows > 54) {
    throw 'Rows must be greater than 2 and fewer than 55.';
  }
  if (numCols <= 2 || numCols > 15) {
    throw 'Columns must be greater than 2 and fewer than 16.';
  }
//  debugMsg(`Creating player board with ${numRows} rows and ${numCols} columns.`);
  const board = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numRows, numCols, numBombs) => {
  if (numRows <= 2 || numRows > 54) {
    throw 'Rows must be greater than 2 and fewer than 55.';
  }
  if (numCols <= 2 || numCols > 15) {
    throw 'Columns must be greater than 2 and fewer than 16.';
  }
  if (numBombs < 1 || numBombs >= numRows * numCols) {
    throw 'Number of Bombs must be greater than 0 and fewer than total number of squares';
  }
  //  debugMsg(`Creating player board with ${numRows} rows and ${numCols} columns.`);
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

const printBoard = (board) => {
  console.log('\nCurrent board configuration:');
  console.log(board.map(row => row.join(' | ')).join('\n'));
  console.log('\n');
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, colIndex) => {
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
  const numberOfRows = bombBoard.length;
  const numberOfCols = bombBoard[0].length;
  let adjacentBombs = 0;

  neighborOffsets.forEach((offset) => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColIndex = colIndex + offset[1];

    debugMsg(numberOfRows + " rows and " + numberOfCols + " columns.");
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColIndex >= 0 && neighborColIndex < numberOfCols) {

      debugMsg(`Checking offset at index ${neighborRowIndex}, ${neighborColIndex}`);

      if (bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
        debugMsg(`-> I found a bomb at index ${neighborRowIndex}, ${neighborColIndex}`);
        adjacentBombs++;
      } else {
        debugMsg('-> No bomb here');
      }
    } else {
      debugMsg(`Tile at index ${neighborRowIndex}, ${neighborColIndex} is not valid.`);
    }
  });
  return adjacentBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
  if (playerBoard[rowIndex][colIndex] !== ' ') {
    debugMsg('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][colIndex] === 'B') {
    playerBoard[rowIndex][colIndex] = 'B';
    debugMsg(`There's a bomb at ${rowIndex}, ${colIndex}!`);
    return;
  } else {
    debugMsg(`The tile at ${rowIndex}, ${colIndex} has not been flipped. Checking for adjacent bombs.`);
    playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, colIndex);
  }
  printBoard(playerBoard);
};

const initGame = (numRows = 12, numCols = 12, numBombs = 24) => {
  const playerBoard = generatePlayerBoard(numRows, numCols);
  const bombBoard = generateBombBoard(numRows, numCols, numBombs);
  console.log('Player board:');
  printBoard(playerBoard);
  console.log('Bomb board:');
  printBoard(bombBoard);

  flipTile(playerBoard, bombBoard, 0, 0);

  flipTile(playerBoard, bombBoard, 2, 2);


};

initGame(3,3,6);


// NEW CODE

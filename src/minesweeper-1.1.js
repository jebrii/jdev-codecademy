const printBoard = (board) => {
  console.log('Current Board: ');
  board.forEach(function(element) {
    console.log(element.join(' | '));
  });
};

const board = [
  [ ' ', ' ', ' ' ],
  [ ' ', ' ', ' ' ],
  [ ' ', ' ', ' ' ]
];

printBoard(board);

board[0][1] = '1';
board[2][2] = 'B';


printBoard(board);

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];

  for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];

    for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      const column = " ";
      row.push(column);
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let bombBoard = [];

  for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];

    for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      const column = null;
      row.push(column);
    }
    bombBoard.push(row);
  }

  let numberOfBombsPlaced = 0;
  while(numberOfBombsPlaced < numberOfBombs){
    //Can accidentally place a bomb in the same place
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    bombBoard[randomRowIndex][randomColumnIndex] = "B";
    numberOfBombsPlaced++;
  }
  return bombBoard;
}

const printBoard = board => board.map(row => row.join(' | ')).join('\n');

const playerBoard = generatePlayerBoard(3,4);
const bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
console.log(printBoard(playerBoard));

console.log('Bomb Board: ');
console.log(printBoard(bombBoard));

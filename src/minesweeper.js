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
    if(bombBoard[randomRowIndex][randomColumnIndex] !== "B"){
      bombBoard[randomRowIndex][randomColumnIndex] = "B";
      numberOfBombsPlaced++;
    }
  }
  return bombBoard;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    let neighborRowIndex = rowIndex + offset[0];
    let neighborColumnIndex = columnIndex + offset[1];
    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
      if(bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
        numberOfBombs++;
      }
    }
  })
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] != ' '){
    console.log('This tile has already been flipped!');
    return;
  }else if(bombBoard[rowIndex][columnIndex] === 'B'){
    playerBoard[rowIndex][columnIndex] = 'B';
  }else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}

const printBoard = board => board.map(row => row.join(' | ')).join('\n');

const playerBoard = generatePlayerBoard(3,4);
const bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
console.log(printBoard(playerBoard));

console.log('Bomb Board: ');
console.log(printBoard(bombBoard));

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
console.log(printBoard(playerBoard));

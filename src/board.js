export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;

    this._numberOfTiles = numberOfRows * numberOfColumns;

    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  flipTile(rowIndex, columnIndex) {
    if(this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    }
    if(this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
      let neighborRowIndex = rowIndex + offset[0];
      let neighborColumnIndex = columnIndex + offset[1];
      if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  get playerBoard(){
    return this._playerBoard;
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
}

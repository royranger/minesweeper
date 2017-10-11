export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get bombBoard() {
    return this._bombBoard;
  }

  get numberOfBombs() {
    return this._numberOfBombs;
  }

  get numberOfTiles() {
    return this._numberOfTiles;
  }

  //Method for user to flip a tile
  flipTile(rowIndex, columnIndex) {
    if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    }
    else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  // Method to count how many bombs are adjacent to a given tile
  getNumberOfNeighbourBombs (rowIndex, columnIndex) {
    const neighbourOffsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0], [1, 1]
    ];
    const numberOfRows = this.bombBoard.length;
    const numberOfColumns = this.bombBoard[0].length;
    let numberOfBombs = 0;

    neighbourOffsets.forEach(offset => {
      const neighbourRowIndex = rowIndex + offset[0];
      const neighbourColumnIndex = columnIndex + offset[1];
      if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns ) {
        if (this.bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
          numberOfBombs++;

        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return (this.numberOfTiles !== this.numberOfBombs);
  }

  print()  {
    console.log(this.playerBoard.map(row =>
    row.join('|')).join('\n'));
  }

  // Function to make an array that will be the board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let k = 0; k < numberOfColumns; k++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  // Function to make an array with randomly dispersed bombs
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let k = 0; k < numberOfColumns; k++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }

    }
    return board;
  }

}

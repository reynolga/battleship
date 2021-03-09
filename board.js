const Ship = require('./ship.js');
const Move = require('./move.js');
const BoardShipPlacerHelper = require('./boardShipPlacerHelper.js');

class Board {
  constructor(numRows, numCols)
  {
    this.numRows = numRows;
    this.numCols = numCols;
    this.shipList = [];   // List of game ships
    this.moveList = [];   // { Position = [x,y] Hit = '', 'x', 'o'
  }
  
  initializeShips(shipList)
  {
    this.shipList = shipList.map((ship) => ship.deepCopy());
    this.placeShipsAtRandom();    
  }

  isMoveInBoard(x,y) { return x < numRows && y < numCols; } //0 - based index use less than

  hasMoveBeenPlayed(move){
    let playedMove = this.moveList.filter(({x,y}) => { return move.X === x && move.Y === y })
    return playedMove.length > 1; //Then the move has been played.
  }

  isAnyShipInBoardPosition(x,y) { 
    const shipsInPosition = this.shipList.filter((ship) => { return ship.isShipInPosition([x,y])});
    return shipsInPosition.length > 0;
  }

  isAnyShipsInBoardPositions(posList){
    
    for(const [x,y] of posList) {      
      if(this.isAnyShipInBoardPosition(x,y)) {return true;}
    }
    return false;
  }

  shotsFired(attackPos){
    let isHit = false;

    for(const ship of this.shipList)
    {
      if(ship.isShipInPosition(attackPos))
      {
        ship.fireShotAtBoat(attackPos);
        isHit = true;
      }
    }
  
    return isHit;
  }

  areAllShipsSunk() {
    const numSunkShips = this.shipList.filter((ship) => { return ship.isShipSunk()});
    return numSunkShips.length == this.shipList.length;
  }

  placeShipsAtRandom() {  
    for(const ship of this.shipList) {
      let shipPlaced = false; 
      let failSafeCounter = 0;

      while(!shipPlaced){
        let direction = BoardShipPlacerHelper.generateRandomDirection();        
        const [startX, startY] = BoardShipPlacerHelper.getStartCoordinates(direction, ship.shipLength, this.numRows, this.numCols);
        let shipCoordinates = BoardShipPlacerHelper.generateCoordinates(startX, startY, ship.shipLength, direction);
        let isAlreadyOccupied = this.isAnyShipsInBoardPositions(shipCoordinates);

        if(!isAlreadyOccupied) {
          ship.positionArray = [...shipCoordinates];
          shipPlaced = true;
        }
        
        if(failSafeCounter > (this.numRows * this.numCols)) {
          console.error("Could not place ship");
          break;
        }
        failSafeCounter++;
      }  
    }
  }
  
  addMove(move){
    this.moveList.push(move);
  }

  deepCopy(){
    const board = new Board(this.numRows, this.numCols);
    board.shipList = this.shipList.map((ship) => ship.deepCopy());
    board.moveList = this.moveList.map((move) => move.deepCopy());
    return board; 
  }

  printDivider() {  console.log('_'.repeat(5*(this.numCols-1)-1));  }
  
  printHeader() { 
    this.printDivider();
    //Print header
    let row = this.formatGrid(' ');
    for(let j = 0; j < this.numCols; j++){ 
      row += ` ${j} |`;      
    }
    console.log(row);
    this.printDivider();
  }

  printBoard()
  {
    const emptySpace = this.formatGrid(' ');
    this.printHeader();

    let row = emptySpace;
    for(let i = 0; i < this.numRows; i++)
    {
      //Print Row Column
      row = this.formatGrid(i);

      for(let j = 0; j < this.numCols; j++){
        let hit = this.getGridItemString(i,j);
        row += hit;
      }

      console.log(row);
      this.printDivider(emptySpace);
    }
  }
  
  formatGrid(input) { return ` ${input} |`;}

  getGridItemString(x,y){
    let index = this.moveList.findIndex((move) => { return move.X === x && move.Y === y });
    
    let stringResult = '';

    if(index === -1) {        return this.formatGrid(' ');}
    if(index >= 0) { 
      if(this.moveList[index].hit) { return this.formatGrid('X'); } 
      else {                         return this.formatGrid('O'); } 
    }  
    else{ return formatGrid(' ');}
  }
}

module.exports = Board;
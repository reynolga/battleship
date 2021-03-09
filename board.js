const Ship = require('./ship.js');
const Move = require('./move.js');
const BoardShipPlacerHelper = require('./boardShipPlacerHelper.js');
const BoardPrinter = require('./boardPrinter.js');

class Board {
  constructor(numRows, numCols)
  {
    this.numRows = numRows;
    this.numCols = numCols;
    this.shipList = [];   // List of game ships
    this.moveList = [];   // { Position = [x,y] Hit = '', 'x', 'o'
    this.boardPrinter = new BoardPrinter(numRows, numCols);
  }
  
  initializeShips(shipList)
  {
    this.shipList = shipList.map((ship) => ship.deepCopy());
    this.placeShipsAtRandom();    
  }

  isMoveInBoard(x,y) { return x < numRows && y < numCols; } //0 - based index use less than

  hasMoveBeenPlayed(move){
    let playedMove = this.moveList.filter(({x,y}) => { return move.X === x && move.Y === y })
    return playedMove.length === 1; //Then the move has been played.
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
        break; //Only 1 boat can be hit
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

   printBoard()
   {
    this.boardPrinter.printBoard(this.moveList);
   }
  

  generateListOfRandomMoves()
  {
    return BoardShipPlacerHelper.generateListOfRandomMoves(this.numRows, this.numCols);
  }
}

module.exports = Board;
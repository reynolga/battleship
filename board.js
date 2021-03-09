const Ship = require('./ship.js');
const Move = require('./move.js');

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

    for(const ship of this.shipList)
    {
        //console.log(`${ship.shipName} has ${ship.hits.length} of ${ship.positionArray.length} hits`)
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
        let direction = this.generateRandomDirection();        
        const [startX, startY] = this.getStartCoordinates(direction, ship.shipLength);
        let shipCoordinates = this.generateCoordinates(startX, startY, ship.shipLength, direction);
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

  getStartCoordinates(direction, shipLength){
    if(direction === 'horizontal')
    {
      return [this.getRandomInteger(0, this.numRows - shipLength), this.getRandomInteger(0, this.numCols)];
    }
    else {
      return [this.getRandomInteger(0, this.numRows), this.getRandomInteger(0, this.numCols - shipLength)];
    }
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  generateRandomDirection() {  
    let x = (Math.floor(Math.random() * 2) == 0);
    if(x){
        return 'horizontal';
    }else{
        return 'vertical';
    }
  }

  generateCoordinates(posX, posY, shipLength, direction) //startPosition is [x,y]
  {
    let coordinates = [];
    
    if(direction == 'horizontal') {                       //horizontal, increment x
      for(let i = posX; i < posX + shipLength; i++)
      {
        coordinates.push([i, posY]);
      }
    }else {                                               //vertical, increment y
      for(let i = posY; i < posY + shipLength; i++)
      {
        coordinates.push([posX, i]);
      }
    }
    
    return coordinates;
  }

  generateListOfRandomMoves(){
    const randomMoves = [];

    Array.prototype.swap = function (x,y) {
      var b = this[x];
      this[x] = this[y];
      this[y] = b;
      return this;
    }

    //Create ordered list 
    for(let i = 0; i < this.numRows; i++){
      for(let j = 0; j < this.numCols; j++){
        randomMoves.push([i,j]);
      }
    }

    //Shuffle the order.
    let totalNumbers = this.numRows * this.numCols;
    for(let r = 0; r < (totalNumbers); r++){
      let tempIndex = this.getRandomInteger(0, totalNumbers);
      randomMoves.swap(r, tempIndex);      
    }

    return randomMoves;
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
  
  printHeader(emptySpace) { 
    this.printDivider();
    //Print header
    let row = emptySpace;
    for(let j = 0; j < this.numCols; j++){ 
      row += ` ${j} |`;      
    }
    console.log(row);
    this.printDivider();
  }

  printBoard()
  {
    const emptySpace = '   |';
    this.printHeader(emptySpace);

    let row = emptySpace;
    for(let i = 0; i < this.numRows; i++)
    {
      //Print Row Column
      row = ` ${i} |`;

      for(let j = 0; j < this.numCols; j++){
        let hit = this.getGridItemString(i,j, emptySpace);
        row += hit;
      }

      console.log(row);
      this.printDivider(emptySpace);
    }
  }
  
  formatGrid(input) { return ` ${input} |`;}

  getGridItemString(x,y, emptySpace){
    let index = this.moveList.findIndex((move) => { return move.X === x && move.Y === y });
    
    let stringResult = '';

    if(index === -1) {        return emptySpace;}
    if(index > 0) { 
      if(this.moveList[index].hit) { return this.formatGrid('X'); } 
      else {                         return this.formatGrid('O'); } 
    }  
    else{ return emptySpace;}
  }
}

module.exports = Board;
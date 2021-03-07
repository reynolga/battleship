import Ship from './ship.js';
import Move from './move.js';

export default class Board {
  constructor(numRows, numCols)
  {
    this.numRows = numRows;
    this.numCols = numCols;
    this.shipList = [];   // List of game ships
    this.moveList = [];   // { Position = [x,y] Hit = '', 'x', 'o'
  }
  
  initializeShips(shipList)
  {
    this.shipList = Json.fromJson(Json.stringify(shipList)); //Need to copy the data. Don't want a reference
    placeShipsAtRandom();
  }

  isMoveInBoard(x,y) { return x < numRows && y < numCols; } //0 - based index use less than

  hasMoveBeenPlayed(move){
    let playedMove = this.moveList.filter(({x,y}) => { return move.posX === x && move.posy === y })
    return playedMove.length > 1; //Then the move has been played.
  }

  isAnyShipInBoardPosition(x,y) { 
    const numOfShipsInPosition = this.shipList.reduce(({x,y}) => { return ship.isShipInPosition[x,y]});
    return numOfShipsInPosition > 0;
  }

  isAnyShipsInBoardPositions(posList){
    
    for(pos of posList) {
      const [x,y] = pos;
      if(isAnyShipInBoardPosition(x,y)) {return true;}
    }
    return false;
  }

  isGameOver() {
    const numSunkShips = this.shipList.reduce((ship) => { return ship.isShipSunk()});
    return numSunkShips == this.shipList.length;
  }

  placeShipsAtRandom() {  
    for(ship of this.shipList) {
      let shipPlaced = false; 
      let failSafeCounter = 0;

      while(!shipPlaced)
        const direction = generateRandomDirection();        
        const [startX, startY] = getStartCoordinates(direction, ship.shipLength);
        let shipCoordinates = generateCoordinates(startX, startY, ship.length, direction);
        let isAlreadyOccupied = !isAnyShipsInBoardPositions(shipCoordinates);

        if(!isAlreadyOccupied) {
          ship.positionArray = shipCoordinates;
          shipPlaced = true;
        }
        
        if(failSafeCounter > (this.numRows * this.numCols)) {
          console.error("Could not place ship");
          break;
        }
        failSafeCounter++;
    }  
  }

  getStartCoordinates(direction, shipLength){
    if(direction === 'horizontal')
    {
      return [getRandomInteger(0, this.numRows - shipLength), getRandomInteger(0, this.numCols)];
    }
    else {
      return [getRandomInteger(0, this.numRows), getRandomInteger(0, this.numCols - shipLength)];
    }
  }

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  generateRandomDirection() {  
    x = (Math.floor(Math.random() * 2) == 0);
    if(x){
        return 'horizontal';
    }else{
        return 'vertical';
    }
    return '';
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
      for(let i = posY; posY < posY + shipLength; i++)
      {
        coordinates.push(posX, i);
      }
    }
    
    return coordinates;
  }

}
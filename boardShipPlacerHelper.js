class BoardShipPlacerHelper {

  static getStartCoordinates(direction, shipLength, boardRows, boardCols){
    if(direction === 'horizontal')
    {
      return [this.getRandomInteger(0, boardRows - shipLength), this.getRandomInteger(0, boardCols)];
    }
    else {
      return [this.getRandomInteger(0, boardRows), this.getRandomInteger(0, boardCols - shipLength)];
    }
  }

  static generateRandomDirection() {  
    let x = (Math.floor(Math.random() * 2) == 0);
    if(x){
        return 'horizontal';
    }else{
        return 'vertical';
    }
  }

  static generateCoordinates(posX, posY, shipLength, direction) //startPosition is [x,y]
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


  static generateListOfRandomMoves(rows, cols){
    const randomMoves = [];

    Array.prototype.swap = function (x,y) {
      var b = this[x];
      this[x] = this[y];
      this[y] = b;
      return this;
    }

    //Create ordered list 
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < cols; j++){
        randomMoves.push([i,j]);
      }
    }

    //Shuffle the order.
    let totalNumbers = rows * cols;
    for(let r = 0; r < (totalNumbers); r++){
      let tempIndex = this.getRandomInteger(0, totalNumbers);
      randomMoves.swap(r, tempIndex);      
    }

    return randomMoves;
  }

  static getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


}

module.exports = BoardShipPlacerHelper;
const readlineSync = require('readline-sync');
const Board = require('./board.js');
const Move = require('./move.js');

class HumanPlayer {
  constructor(playerName, boardPrototype, gameShipList, gameCommands) {
    this.playerName = playerName;
    this.board = boardPrototype.deepCopy();
    this.gameCommands = gameCommands;
    this.initialize(gameShipList);
  }

  initialize(shipList) {
    this.board.initializeShips(shipList);
  }

  getAttackPosition() {
    //get input
    let validMove = false;
    let counter = 0;
    const maxNumOfTries = 10;
    let [attackX, attackY] = [undefined, undefined];
    this.board.printBoard();

    while(!validMove){
      let input = readlineSync.question('Fire a shot at a enemy boat with coordinates like \'1,2\' or press \'q\' to quit: ');
      
      //Check for game command, like 'q' for quit
      if(this.gameCommands.includes(input)) {return input; }
      
      [attackX, attackY] = this.parseInput(input);

      if(isNaN(attackX) || isNaN(attackY)) { 
        console.log(`${input} is not valid. Please try again with coordinates like \'6,3\'`);
      } else if (!this.board.isMoveInBoard(attackX, attackY)){
        console.log(`${input} is not valid. Please try again with coordinates like \'6,3\'`);
      } else if(this.board.hasMoveBeenPlayed(attackX, attackY)) {
        console.log('Move has already been played. Try again.');
      } else {
        validMove = true;
      }
        
      if(counter > maxNumOfTries) { break;}      
      counter++;
    }

    return [attackX, attackY];
  }
 
  parseInput(input) {

    //Convert 1,2 => [1, 2]
    let aInput = input.split(',');  
    let [attackX, attackY] = [parseInt(aInput[0]), parseInt(aInput[1])];
    
    if(attackX == undefined) { attackX == NaN;}
    if(attackY == undefined) { attackY == NaN;}

    return [attackX, attackY];
  }

  fireShots(coordinates){
    return this.board.shotsFired(coordinates);
  }

  movePlayed(move){
    this.board.addMove(move); 
  }

  areAllShipsSunk(){
    return this.board.areAllShipsSunk()
  }

  printBoard(){
    return this.board.printBoard();
  }
}

module.exports = HumanPlayer;
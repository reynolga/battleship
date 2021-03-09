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

    this.board.printBoard();

    while(!validMove){
      let input = readlineSync.question('Fire a shot at a enemy boat with coordinates like \'1,2\' or press \'q\' to quit: ');
      
      //Check for game command, like 'q' for quit
      if(this.gameCommands.includes(input)) {return input; }
      
      let [attackX, attackY] = this.parseInput(input);

      if(!isNaN(attackX) && !isNaN(attackY)) {
        if(!this.board.hasMoveBeenPlayed([attackX, attackY])) { 
          return [attackX, attackY];
        }
        else { console.log('Move has already been played. Try again.')}
      }

      if(counter > maxNumOfTries) { break;}
      console.log(`${input} is not valid. Please try again with coordinates like \'6,3\'`);
      counter++;
    }

    return [undefined, undefined];
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

  areAllShipsSunk()
  {
    return this.board.areAllShipsSunk()
  }
}

module.exports = HumanPlayer;
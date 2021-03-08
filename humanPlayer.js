const readlineSync = require('readline-sync');

class HumanPlayer {
  constructor(playerName, boardPrototype, gameShipList, gameCommands) {
      this.playerName = playerName;
      this.board = Json.fromJson(Json.stringify(boardPrototype)); //Make a copy of the boardPrototype
      this.gameCommands = gameCommands;
      initialize(gameShipList);
  }

  initialize(shipList) {
      this.board.initializeShips(shipList);
  }

  takeTurn() {
    //get input
    let validMove = false;
    let counter = 0;
    const maxNumOfTries = 10;

    while(!validMove){
    let input = readlineSync.question('Fire a shot at a enemy boat with coordinates like \'1,2\' or press \'q\' to quit: ');
    
    //Check for game command, like 'q' for quit
    if(this.gameCommands.has(input)) {return input; }
    
    let [attackX, attackY] = parseInput(input);

    if((attackX != NaN || 
       attackY != Nan || 
       !this.board.hasMoveBeenPlayed([attackX, attackY]))) { //try again
        return [attackX, attackY];
    }

    if(counter > maxNumOfTries) { break;}
    counter++;
  }

    return [undefined, undefined];
  }
 
  parseInput(input) {

    //Convert 1,2 => [1, 2]
    let aInput = input.split(',');  
    let [attackX, attackY] = [parseInt(aInput[0]), parseInt(aInput[1])];
    return [attackX, attackY];
  }

  fireShots(coordinates){
    return this.board.shotsFired(coordinates);
  }

  movePlayed(move){
    this.moveList.add(move); 
  }
}

module.exports = HumanPlayer;
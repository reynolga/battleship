const readlineSync = require('readline-sync');

export default class HumanPlayer {
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

    let aInput = input.match(/[^\d()]+|[\d.]+/g);  
    let [attackX, attackY] = [parseInt(aInput[0]), parseInt(aInput[2])];
       
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
  
}
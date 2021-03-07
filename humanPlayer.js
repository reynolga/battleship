export default class HumanPlayer {
  constructor(playerName, boardPrototype, gameShipList) {
      this.playerName = playerName;
      this.board = Json.fromJson(Json.stringify(boardPrototype)); //Make a copy of the boardPrototype
      
      initialize(gameShipList);
  }

  initialize(shipList) {
      this.board.initializeShips(shipList);
  }

  takeTurn() {
    //get input
   

  }
  
};
import HumanPlayer from './humanPlayer.js';

export default class ComputerPlayer extends HumanPlayer {  
  constructor(playerName, boardPrototype, gameShipList, gameMoves) {
    super(playerName, boardPrototype, gameShipList);
    this.gameMoves = new Set(gameMoves).values();
  }

  takeTurn() {
    //Give next move automatically
    return this.gameMoves.next().value;
  }

}
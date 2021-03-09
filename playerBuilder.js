const HumanPlayer = require('./humanPlayer.js');
const ComputerPlayer = require('./computerPlayer.js');

class PlayerBuilder {
  constructor(){}

  buildPlayerList(playerList, boardPrototype, gameShipList, gameCommands){

    let battleShipPlayerList = [];
    
    for(const player of playerList){
      if(player.isHuman === true)
      {
        battleShipPlayerList.push(new HumanPlayer(player.playerName, boardPrototype, gameShipList, gameCommands));
      }
      else{
        battleShipPlayerList.push(new ComputerPlayer(player.playerName, boardPrototype, gameShipList, boardPrototype.generateListOfRandomMoves(), gameCommands));
      }
    }
    return battleShipPlayerList;
  }

}

module.exports = PlayerBuilder;
const Ship = require('./ship.js');
const Move = require('./move.js');
const HumanPlayer = require('./humanPlayer.js');
const ComputerPlayer = require('./computerPlayer.js');
const Board = require('./board.js');
const ShipBuilder = require('./shipBuilder.js');
const PlayerBuilder = require('./playerBuilder.js');
const readlineSync = require('readline-sync');

class BattleShip {

  constructor(){}

  playGame(playerList) {
    
    const boardPrototype = new Board(10, 10);
    const gameShipList = new ShipBuilder().buildGameShips();
    const gameCommands = ['Q', 'q', 'Y', 'y', 'N', 'n'];
    const battleShipPlayerList = new PlayerBuilder().buildPlayerList(playerList, boardPrototype, gameShipList, gameCommands);

    let input = readlineSync.question('Welcome to battleShip, press \'y\' to start: ');    

    if(input == 'y' || input == 'Y'){
      let currentPlayer = battleShipPlayerList[0];
      let nextPlayer = battleShipPlayerList[0];
      let gameOver = false;

      while(!gameOver){
        currentPlayer = nextPlayer;
        nextPlayer = this.getNextPlayer(currentPlayer, battleShipPlayerList);

        if(nextPlayer == undefined) { console.error('Could not find next player'); break;}
        let attackPos = currentPlayer.getAttackPosition();
    
        if(attackPos === undefined) { console.error('Undefined move'); break;}
        if(gameCommands.includes(attackPos)) { break;}

        let isHit = nextPlayer.fireShots(attackPos);
        let gameMove = new Move(attackPos[0], attackPos[1], isHit);   

        currentPlayer.movePlayed(gameMove);
       
        console.log(`${currentPlayer.playerName} attacked position (${gameMove.X}, ${gameMove.Y}) of ${nextPlayer.playerName}. It was a ${isHit ? 'Hit' : 'Miss'}`);        

        if(nextPlayer.areAllShipsSunk()) { 
          console.log(`${currentPlayer.playerName} is the Winner!`);
          currentPlayer.printBoard();
          gameOver = true;
        }
        
      }
    }

    console.log('Thank you for playing today :)');
  }
  

  getNextPlayer(currentPlayer, playerList){
    let currentIndex = playerList.findIndex((player) => {return player === currentPlayer});

    if(currentIndex === playerList.length-1)
    {
      const firstPlayer = playerList[0];
      return firstPlayer;
    }
    else{
      const nextPlayer = playerList[currentIndex+1];
      return nextPlayer;
    } 
  }
}

module.exports = BattleShip;








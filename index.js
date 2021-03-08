const Ship = require('./ship.js');
const Move = require('./move.js');
const HumanPlayer = require('./humanPlayer.js');
const Board = require('./board.js');
const ShipBuilder = require('./shipBuilder.js');

const readlineSync = require('readline-sync');

const boardPrototype = Board(10, 10);
const gameShipList = ShipBuilder().buildGameShips();
const gameCommands = ['Q', 'q', 'Y', 'y', 'N', 'n'];

const player1 = HumanPlayer('Player1', boardPrototype, gameShipList, gameCommands);
const player2 = ComputerPlayer('Player2', boardPrototype, gameShipList, boardPrototype.generateListOfRandomMoves(), gameCommands);

const playerList = [player1, player2];

let input = readlineSync.question('Welcome to battleShip, press \'y\' to start: ');
let currentPlayer = playerList[0];
let nextPlayer = playerList[0];

if(input == 'y' || input == 'Y')
{
  let gameOver = false; //
  while(!gameOver)
  {
    [currentPlayer, nextPlayer] = [nextPlayer, getNextPlayer(currentPlayer)];

    if(nextPlayer == undefined) { console.error('Could not find next player'); break;}
    let attackPos = currentPlayer.takeTurn();

    if(gameCommands.has(attackPos)) { break;}

    let isHit = nextPlayer.fireShots(attackPos);
    let gameMove = Move(attackPos[0], attackPos[1], isHit);
    let [x,y] = [attackPos];

    console.log(`Player ${currentPlayer.playerName} attacked position ${x}, ${y} of ${next.playerName}. It was a ${isHit ? 'Hit' : 'Miss'}`);

    player.movePlayed(gameMove);
  }
}

function getNextPlayer(currentPlayer)
{
  let currentIndex = this.playerList.findIndex(player => {return player === currentPlayer});

  if(currentIndex === this.playerList.length-1)
  {
    const firstPlayer = this.playerList[0];
    return firstPlayer;
  }
  else{
    const nextPlayer = this.playerList[currentIndex+1];
    return nextPlayer;
  }

  return undefined;  
}








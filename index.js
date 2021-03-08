const Ship = require('./ship.js');
const Move = require('./move.js');
const HumanPlayer = require('./humanPlayer.js');
const ComputerPlayer = require('./computerPlayer.js');
const Board = require('./board.js');
const ShipBuilder = require('./shipBuilder.js');

const readlineSync = require('readline-sync');

const boardPrototype = new Board(10, 10);
const gameShipList = new ShipBuilder().buildGameShips();
const gameCommands = ['Q', 'q', 'Y', 'y', 'N', 'n'];

const player1 = new ComputerPlayer('Player1', boardPrototype, gameShipList, boardPrototype.generateListOfRandomMoves(), gameCommands);
const player2 = new ComputerPlayer('Player2', boardPrototype, gameShipList, boardPrototype.generateListOfRandomMoves(), gameCommands);

const playerList = [player1, player2];

let input = readlineSync.question('Welcome to battleShip, press \'y\' to start: ');
let currentPlayer = playerList[0];
let nextPlayer = playerList[0];

if(input == 'y' || input == 'Y')
{
  let gameOver = false; //
  while(!gameOver)
  {
    currentPlayer = nextPlayer;
    nextPlayer = getNextPlayer(currentPlayer, playerList);

    if(nextPlayer == undefined) { console.error('Could not find next player'); break;}
    let attackPos = currentPlayer.takeTurn();

    if(gameCommands.includes(attackPos)) { break;}

    let isHit = nextPlayer.fireShots(attackPos);
    let gameMove = new Move(attackPos[0], attackPos[1], isHit);   

    currentPlayer.movePlayed(gameMove);
    if(isHit){
    console.log(`${currentPlayer.playerName} attacked position (${gameMove.X}, ${gameMove.Y}) of ${nextPlayer.playerName}. It was a ${isHit ? 'Hit' : 'Miss'}`);
    }
    gameOver = nextPlayer.areAllShipsSunk();

    if(gameOver) { console.log(`${currentPlayer.playerName} is the Winner!`)}

    //Is winner?
  }
}

function getNextPlayer(currentPlayer, playerList)
{
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

  return undefined;  
}








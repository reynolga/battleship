const BattleShip = require('./battleShip.js');


const battleShip = new BattleShip();

let playerList = [
  {
    isHuman: true,
    playerName: 'Player 1'
  }, 
  {
    isHuman: false,
    playerName: 'Player 2'
  }
]

battleShip.playGame(playerList);



playerList = [
  {
    isHuman: false,
    playerName: 'Han Solo'
  }, 
  {
    isHuman: false,
    playerName: 'Yoda'
  },
  {
    isHuman: false,
    playerName: 'Darth Vader'
  },
  {
    isHuman: false,
    playerName: 'Darth Maul'
  }
]

battleShip.playGame(playerList);
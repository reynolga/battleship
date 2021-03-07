import Ship from './ship.js';
import Move from './move.js';
import HumanPlayer from './humanPlayer.js';
import Board from './board.js';
import ShipBuilder from './shipBuilder.js';

const boardPrototype = Board(10, 10);
const gameShipList = ShipBuilder().buildGameShips();

const player1 = new HumanPlayer('Player1', boardPrototype, gameShipList);






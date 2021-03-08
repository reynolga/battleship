const Ship = require('./ship.js');

class ShipBuilder {
  constructor() {}

  buildGameShips(){
    let destroyer = new Ship('destroyer', 2);
    let submarine = new Ship('submarine', 3);
    let cruiser = new Ship('cruiser', 3);
    let battleship = new Ship('battleship', 4);
    let carrier = new Ship('carrier', 5);

    return [destroyer, submarine, cruiser, battleship, carrier];
  }

}

module.exports = ShipBuilder;
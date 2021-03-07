import Ship from './ship.js';

export default class ShipBuilder {
  constructor() {}

  buildGameShips(){
    let destroyer = Ship('destroyer', 2);
    let submarine = Ship('submarine', 3);
    let cruiser = Ship('cruiser', 3);
    let battleship = Ship('battleship', 4);
    let carrier = Ship('carrier', 5);

    return [destroyer, submarine, cruiser, battleship, carrier];
  }

}
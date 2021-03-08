class Ship {

  constructor(shipName, shipLength){
    this.shipName = shipName; 
    this.positionArray= [];            //Array of boat position [[1,2], [2,2], [2,3]]
    this.hits = [];                    //Array of hits    
    this.shipLength = shipLength;
  }

  isShipInPosition(aPosition) {
    if(aPosition == undefined || aPosition.length != 2 || aPosition == undefined) { 
      console.error(`Wrong or unexpected position array: ${aPosition}`);
      return false;
    }

    let result = this.positionArray.filter((pos) => {return (pos[0]=== aPosition[0] && pos[1] === aPosition[1]);});
    let bIsShipInPosition = result.length > 0;
    return bIsShipInPosition;
  }

  fireShotAtBoat(aPosition)
  {
    if(this.isShipInPosition(aPosition)){
      this.setHit(aPosition);
    }
  }

  setHit(aPosition) { 
    let result = this.hits.find((item) => {return (item[0] === aPosition[0] && item[1] === aPosition[1])});

    if(result === undefined){
      this.hits.push(aPosition);   
      console.log(`Ship hit at ${aPosition}, ${this.hits.length} of ${this.positionArray.length}`);  
    }
  }

  isShipSunk(){
    return this.hits.length == this.positionArray.length;
  }   

  deepCopy(){
    const ship = new Ship(this.shipName, this.shipLength);
    ship.positionArray = [...this.positionArray];
    ship.hits = [...this.hits];
    this.positionArray= [];            //Array of boat position [[1,2], [2,2], [2,3]]
     
    return ship;
  }

  };

  module.exports = Ship;


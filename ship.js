export default class Ship {

  constructor(shipName, shipLength){
    this.shipName = shipName; 
    this.positionArray= [];            //Array of boat position [[1,2], [2,2], [2,3]]
    this.hits = [];                    //Array of hits    
    this.shipLength = shipLength;
  }

  isShipInPosition(aPosition) {
    if(aPosition.length != 2 || aPosition == Undefined) { 
      console.error(`Wrong or unexpected position array: ${aPosition}`);
      return false;
    }

    let result = this.positionArray.filter(([pos1, pos2]) => {return pos1=== aPosition[0] && pos2 === aPosition[1]});
    let bIsShipInPosition = result.length > 0;
    return bIsShipInPosition;
  }

  fireShotAtBoat(aPosition)
  {
    if(isShipInPosition(aPosition)){
      setHit(aPosition);
    }
  }

  setHit(aPosition) {    
    this.hits.push(aPosition);     
  }

  isShipSunk(){
    return this.hits.length == this.positionArray.length;
  }   

  };


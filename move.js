
class Move {
  constructor(posX, posY, hit)
  {
    this.posX = posX;
    this.posY = posY;
    this.hit = hit;
  }

  deepCopy()
  {
    return new Move(this.posX, this.posY, this.hit);
  }
}

module.exports = Move;
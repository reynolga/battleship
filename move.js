
class Move {
  constructor(posX, posY, hit)
  {
    this.X = posX;
    this.Y = posY;
    this.hit = hit;
  }

  deepCopy()
  {
    return new Move(this.X, this.Y, this.hit);
  }
}

module.exports = Move;
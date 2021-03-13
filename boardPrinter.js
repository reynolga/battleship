
class BoardPrinter {
  constructor(rows, cols){
    this.numRows = rows;
    this.numCols = cols;
  }

  printDivider() {  console.log('_'.repeat(5*(this.numCols-1)-1));  }
  
  printHeader() { 
    this.printDivider();

    //Print header
    let headerRow = this.formatGridSquare(' ');
    for(let j = 0; j < this.numCols; j++){ 
      headerRow += this.formatGridSquare(j);
    }
    console.log(headerRow);

    this.printDivider();
  }

  printBoard(moveList){
    this.printHeader();

    let row = this.formatGridSquare(' ');;
    for(let i = 0; i < this.numRows; i++)
    {
      //Print Row number
      row = this.formatGridSquare(i);

      for(let j = 0; j < this.numCols; j++){
        let hit = this.getGridItemString(i,j, moveList);
        row += hit;
      }

      console.log(row);
      this.printDivider();
    }
  }
  
  formatGridSquare(input) { return ` ${input} |`;}

  getGridItemString(x,y, moveList){
    let index = moveList.findIndex((move) => { return move.X === x && move.Y === y });
    
    if(index === -1) {          return this.formatGridSquare(' ');}
    else if(index >= 0) { 
      if(moveList[index].hit) { return this.formatGridSquare('X'); } 
      else {                    return this.formatGridSquare('O'); } 
    }  
    else{                       return this.formatGridSquare(' ');}
  }

}

module.exports = BoardPrinter;
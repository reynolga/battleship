
class BoardPrinter {
  constructor(rows, cols){
    this.numRows = rows;
    this.numCols = cols;
  }

  printDivider() {  console.log('_'.repeat(5*(this.numCols-1)-1));  }
  
  printHeader() { 
    this.printDivider();
    //Print header
    let row = this.formatGrid(' ');
    for(let j = 0; j < this.numCols; j++){ 
      row += ` ${j} |`;      
    }
    console.log(row);
    this.printDivider();
  }

  printBoard(moveList)
  {
    const emptySpace = this.formatGrid(' ');
    this.printHeader();

    let row = emptySpace;
    for(let i = 0; i < this.numRows; i++)
    {
      //Print Row Column
      row = this.formatGrid(i);

      for(let j = 0; j < this.numCols; j++){
        let hit = this.getGridItemString(i,j, moveList);
        row += hit;
      }

      console.log(row);
      this.printDivider();
    }
  }
  
  formatGrid(input) { return ` ${input} |`;}

  getGridItemString(x,y, moveList){
    let index = moveList.findIndex((move) => { return move.X === x && move.Y === y });
    
    let stringResult = '';

    if(index === -1) {        return this.formatGrid(' ');}
    else if(index >= 0) { 
      if(moveList[index].hit) { return this.formatGrid('X'); } 
      else {                         return this.formatGrid('O'); } 
    }  
    else{ return formatGrid(' ');}
  }

}

module.exports = BoardPrinter;
import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  
  const randomBool = () => {
    const val = Math.random() <= chanceLightStartsOn
    return val
  }
   
  
  const [board, setBoard] = useState(createBoard());

  
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i=0; i<nrows; i++){
      let row = []
      for (let j=0; j<ncols; j++){
        row.push(randomBool());
      }
      initialBoard.push(row)
    }
    console.log(initialBoard)
    return initialBoard; 
  }

  function hasWon() {

    for (let row of board){
      for (let element of row){
        if (element){
          return false
        }
      }
    }
    return true
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      const newBoard = oldBoard.slice()
      flipCell(y,x, newBoard)
      flipCell(y,x+1, newBoard)
      flipCell(y+1,x, newBoard)
      flipCell(y-1,x, newBoard)
      flipCell(y,x-1, newBoard)
      console.log(newBoard)
      return newBoard
      // TODO: return the copy
    });
  }
  
  // if the game is won, just show a winning msg & render nothing else

  // TODO
  return (
    <div className="board">
      {hasWon() && <p>you won!!</p>}

      {!hasWon() &&
       <table>
          <tbody>
            {board.map((i, idxi) => 
              <tr key = {idxi}>{
                i.map((j,idxj) => <Cell key = {`${idxi}X${idxj}`} isLit = {j} flipCellsAroundMe = {() => flipCellsAround([idxi,idxj])}/>)}
              </tr>)}
          </tbody>
        </table>}
    </div>
  )
  // make table board

  // TODO
}

export default Board;

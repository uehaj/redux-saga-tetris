import * as Board from "./board";

export const PIECE_MIN = 1;
export const PIECE_MAX = 7;

const PIECES = [
  [
    [[0,0,0,0],
     [1,1,1,1],
     [0,0,0,0],
     [0,0,0,0]],
    [[0,0,0],
     [2,2,2],
     [0,0,2]],
    [[0,0,0],
     [3,3,3],
     [3,0,0]],
    [[4,4],
     [4,4]],
    [[0,0,0],
     [0,5,5],
     [5,5,0]],
    [[0,0,0],
     [6,6,6],
     [0,6,0]],
    [[0,0,0],
     [7,7,0],
     [0,7,7]],
  ],
  [
    [[0,0,1,0],
     [0,0,1,0],
     [0,0,1,0],
     [0,0,1,0]],
    [[0,2,0],
     [0,2,0],
     [2,2,0]],
    [[3,3,0],
     [0,3,0],
     [0,3,0]],
    [[4,4],
     [4,4]],
    [[5,0,0],
     [5,5,0],
     [0,5,0]],
    [[0,6,0],
     [6,6,0],
     [0,6,0]],
    [[0,0,7],
     [0,7,7],
     [0,7,0]],
  ],
  [
    [[0,0,0,0],
     [1,1,1,1],
     [0,0,0,0],
     [0,0,0,0]],
    [[0,0,0],
     [2,0,0],
     [2,2,2]],
    [[0,0,0],
     [0,0,3],
     [3,3,3]],
    [[4,4],
     [4,4]],
    [[0,0,0],
     [0,5,5],
     [5,5,0]],
    [[0,0,0],
     [0,6,0],
     [6,6,6]],
    [[0,0,0],
     [7,7,0],
     [0,7,7]],
  ],
  [
    [[0,0,1,0],
     [0,0,1,0],
     [0,0,1,0],
     [0,0,1,0]],
    [[0,2,2],
     [0,2,0],
     [0,2,0]],
    [[0,3,0],
     [0,3,0],
     [0,3,3]],
    [[4,4],
     [4,4]],
    [[5,0,0],
     [5,5,0],
     [0,5,0]],
    [[0,6,0],
     [0,6,6],
     [0,6,0]],
    [[0,0,7],
     [0,7,7],
     [0,7,0]],
  ],
];

function isEmpty(cell) {
  return cell <= 0;
}

export function setPiece(board, xPos, yPos, piece, spin, unset=false) {
  const pieceArray = PIECES[spin][piece];
  let result = board;
  for (let y=0; y<pieceArray.length; y++) {
    for (let x=0; x<pieceArray[y].length; x++) {
      const cellToPut = unset ? 0 : pieceArray[y][x];
      if (!isEmpty(pieceArray[y][x])) {
        result = Board.updateCell(result, xPos+x, yPos+y, cellToPut);
      }
    }
  }
  return result;
}

export function unSetPiece(board, xPos, yPos, piece, spin) {
  return setPiece(board, xPos, yPos, piece, spin, true);
}

/*
 * Wheather you can put a piect onto board position (xPos, yPos)
 * with the spin.
 */
export function canPut(board, xPos, yPos, piece, spin) {
  const pieceArray = PIECES[spin][piece];
  for (let y=0; y<pieceArray.length; y++) {
    for (let x=0; x<pieceArray[y].length; x++) {
      const cell = pieceArray[y][x];
      if (!isEmpty(cell) && !isEmpty(Board.getCell(board, xPos+x, yPos+y))) {
        return false;
      }
    }
  }
  return true;
}

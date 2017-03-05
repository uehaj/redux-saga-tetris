import * as Board from "./board";

export const PIECE_MIN = 1;
export const PIECE_MAX = 7;

const PIECES = [
  [
    [[1,1,1,1]],
    [[2,2,2]
     [0,0,2]],
    [[3,3,3]
     [3,0,0]],
    [[4,4],
     [4,4]],
    [[0,5,5,],
     [5,5,0]],
    [[6,6,6],
     [0,6,0]],
    [[7,7,0],
     [0,7,7]],
  ],
  [
    [[1],
     [1],
     [1],
     [1],],
    [[0,2],
     [0,2],
     [2,2]],
    [[3,3],
     [0,3],
     [0,3]],
    [[4,4],
     [4,4]],
    [[5,0],
     [5,5],
     [0,5]],
    [[0,6],
     [6,6],
     [0,6]],
    [[0,7],
     [7,7],
     [7,0]],
  ],
  [
    [[1,1,1,1]],
    [[2,0,0],
     [2,2,2]],
    [[0,0,3],
     [3,3,3]],
    [[4,4],
     [4,4]],
    [[0,5,5],
     [5,5,0]],
    [[0,6,0],
     [6,6,6]],
    [[7,7,0],
     [0,7,7]],
  ],
  [
    [[1],
     [1],
     [1],
     [1]],
    [[2,2],
     [2,0],
     [2,0]],
    [[3,0],
     [3,0],
     [3,3]],
    [[4,4],
     [4,4]],
    [[5,0],
     [5,5],
     [0,5]],
    [[6,0],
     [6,6],
     [6,0]],
    [[0,7],
     [7,7],
     [7,0]],
  ],
];

export function setPiece(board, xPos, yPos, piece, spin) {
  const pieceArray = PIECES[spin][piece];
  let result = board;
  for (let y=0; y<pieceArray.length; y++) {
    for (let x=0; x<pieceArray[y].length; x++) {
      result = Board.updateCell(result, xPos+x, yPos+y, pieceArray[y][x]);
    }
  }
  return result;
}

export function unSetPiece(board, xPos, yPos, piece, spin) {
  const pieceArray = PIECES[spin][piece];
  let result = board;
  for (let y=0; y<pieceArray.length; y++) {
    for (let x=0; x<pieceArray[y].length; x++) {
      result = Board.updateCell(result, xPos+x, yPos+y, pieceArray[y][x]);
    }
  }
  return result;
}

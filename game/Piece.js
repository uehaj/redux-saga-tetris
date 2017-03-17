import * as pieceUtils from './pieceUtils';
import * as Keys from './keys';

export default class Piece {
  constructor(x, y, piece, spin) {
    this.x = x;
    this.y = y;
    this.piece = (piece + pieceUtils.PIECES_NUM) % pieceUtils.PIECES_NUM;
    this.spin = (spin + pieceUtils.SPINS_NUM) % pieceUtils.SPINS_NUM;
  }

  unsetTo(board) {
    return pieceUtils.unSetPiece(board,
                             this.x, this.y, this.piece, this.spin);
  }

  setTo(board) {
    return pieceUtils.setPiece(board,
                           this.x, this.y, this.piece, this.spin);
  }

  canPut(board) {
    return pieceUtils.canPut(board, this.x, this.y, this.piece, this.spin);
  }

  tryPutTo(board, oldPiece) {
    const unsetBoard = pieceUtils.unSetPiece(board, oldPiece.x, oldPiece.y, oldPiece.piece, oldPiece.spin);
    if (this.canPut(unsetBoard)) {
      const newBoard = pieceUtils.setPiece(unsetBoard, this.x, this.y, this.piece, this.spin);
      return [newBoard, this];
    }
    return [board, oldPiece];
  }

  nextPiece(keyDownActionType) {
    switch (keyDownActionType) {
    case Keys.KEY_ARROW_LEFT:
      return new Piece(this.x-1, this.y, this.piece, this.spin);
    case Keys.KEY_SPC:
    case Keys.KEY_ARROW_DOWN:
      return new Piece(this.x, this.y+1, this.piece, this.spin);
    case Keys.KEY_ARROW_RIGHT:
      return new Piece(this.x+1, this.y, this.piece, this.spin);
    case Keys.KEY_Z:
      return new Piece(this.x, this.y, this.piece, this.spin-1);
    case Keys.KEY_X:
      return new Piece(this.x, this.y, this.piece, this.spin+1);
    default:
      break;
    }
    return this;
  }

  reachedToBottom(board) {
    let [newBoard, piece] = new Piece(this.x, this.y+1, this.piece, this.spin).tryPutTo(board, this);
    return piece === this;
  }
}

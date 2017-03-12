import * as Pieces from './pieces';
import * as Keys from './keys';

export default class Piece {
  constructor(x, y, piece, spin) {
    this.x = x;
    this.y = y;
    this.piece = piece % 7;
    this.spin = spin % 4;
  }

  unsetTo(board) {
    return Pieces.unSetPiece(board,
                             this.x, this.y, this.piece, this.spin);
  }

  setTo(board) {
    return Pieces.setPiece(board,
                           this.x, this.y, this.piece, this.spin);
  }

  tryPutTo(board, oldPiece) {
    const unsetBoard = Pieces.unSetPiece(board, oldPiece.x, oldPiece.y, oldPiece.piece, oldPiece.spin);
    if (Pieces.canPut(unsetBoard, this.x, this.y, this.piece, this.spin)) {
      const newBoard = Pieces.setPiece(unsetBoard, this.x, this.y, this.piece, this.spin);
      return [newBoard, this];
    }
    return [board, oldPiece];
  }

  nextPiece(keyDownActionType) {
    switch (keyDownActionType) {
    case Keys.KEY_H:
    case Keys.KEY_ARROW_LEFT:
      return new Piece(this.x-1, this.y, this.piece, this.spin);
    case Keys.KEY_J:
    case Keys.KEY_ARROW_DOWN:
      return new Piece(this.x, this.y+1, this.piece, this.spin);
    case Keys.KEY_L:
    case Keys.KEY_ARROW_RIGHT:
      return new Piece(this.x+1, this.y, this.piece, this.spin);
    case Keys.KEY_Z:
      return new Piece(this.x, this.y, this.piece, this.spin-1);
    case Keys.KEY_X:
      return new Piece(this.x, this.y, this.piece, this.spin+1);
    case Keys.KEY_C:
      return new Piece(this.x, this.y, this.piece+1, this.spin);
    }
    return this;
  }

  reachedToBottom(board) {
    let [newBoard, piece] = new Piece(this.x, this.y+1, this.piece, this.spin).tryPutTo(board, this);
    return piece === this;
  }
}

import * as Pieces from "../game/pieces";
import * as Board from "../game/board";

describe('pieces', () => {

  it('canPut ok', () => {
    expect(Pieces.canPut(Board.INITIAL_BOARD, 1,0,0,0)).toEqual(true);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 1,1,0,0)).toEqual(true);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 1,19,0,0)).toEqual(true);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 1,20,0,0)).toEqual(true);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 7,20,0,0)).toEqual(true);
  });

  it('canPut ng', () => {
    expect(Pieces.canPut(Board.INITIAL_BOARD, 8,0,0,0)).toEqual(false);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 8,1,0,0)).toEqual(false);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 8,19,0,0)).toEqual(false);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 8,20,0,0)).toEqual(false);
    expect(Pieces.canPut(Board.INITIAL_BOARD, 1,21,0,0)).toEqual(false);
  });

});


/* global describe, expect, it */
import * as Board from '../game/board';

describe('board', () => {
  it('size of INITIAL_BOARD', () => {
    expect(Board.INITIAL_BOARD.length).toBe(23);
    expect(Board.INITIAL_BOARD[0].length).toBe(12);
  });

  it('getCell() is wall', () => {
    expect(Board.getCell(Board.INITIAL_BOARD, 0, 0)).toBe(Board.W);
    expect(Board.getCell(Board.INITIAL_BOARD, 1, 0)).toBe(Board.W);
    expect(Board.getCell(Board.INITIAL_BOARD, 11, 0)).toBe(Board.W);
    expect(Board.getCell(Board.INITIAL_BOARD, 0, 22)).toBe(Board.W);
    expect(Board.getCell(Board.INITIAL_BOARD, 1, 22)).toBe(Board.W);
    expect(Board.getCell(Board.INITIAL_BOARD, 11, 22)).toBe(Board.W);
  });

  it('getCell() is empty', () => {
    expect(Board.getCell(Board.INITIAL_BOARD, 1, 1)).toBe(0);
    expect(Board.getCell(Board.INITIAL_BOARD, 2, 1)).toBe(0);
    expect(Board.getCell(Board.INITIAL_BOARD, 10, 1)).toBe(0);
  });

  it('updateCell() is not empty', () => {
    expect(Board.getCell(Board.updateCell(Board.INITIAL_BOARD, 1, 1, 77), 1, 1)).toBe(77);
    expect(Board.getCell(Board.updateCell(Board.INITIAL_BOARD, 2, 1, 77), 2, 1)).toBe(77);
    expect(Board.getCell(Board.updateCell(Board.INITIAL_BOARD, 10, 1, 77), 10, 1)).toBe(77);
  });
});

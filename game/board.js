import * as Config from './config';

export const W = 255;

export const INITIAL_BOARD = [
  Array(Config.WIDTH + 2).fill(W),
  ...Array(Config.HEIGHT).fill(
    [W, ...Array(Config.WIDTH).fill(0), W],
  ),
  Array(Config.WIDTH + 2).fill(W),
];

export function updateCell(board, x, y, cell) {
  return [
    ...board.slice(0, y),
    [
      ...board[y].slice(0, x),
      cell,
      ...board[y].slice(x + 1, board[y].length),
    ],
    ...board.slice(y + 1, board.length),
  ];
}

export function getCell(board, x, y) {
  return board[y][x];
}

export function isGameOver(board) {
  return !board[1].slice(1, -1).every(elem => elem === 0);
}

export function clearLines(board) {
  let count = 0;
  const result0 = board
    .slice(1, -1)
    .reverse()
    .reduce(
      (prev, curr) => {
        if (curr.slice(1, -1).every(elem => elem !== 0)) {
          count += 1;
          return prev;
        }
        return prev.concat([curr]);
      },
      [])
    .concat(Array(count).fill([W, ...Array(Config.WIDTH).fill(0), W]))
    .reverse()
  ;
  return [Array(Config.WIDTH + 2).fill(W)]
    .concat(result0)
    .concat([Array(Config.WIDTH + 2).fill(W)]);
}


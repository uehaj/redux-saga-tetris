export const W = 255;

export const INITIAL_BOARD = [ // 10x22
  [W,W,W,W,W,W,W,W,W,W,W,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,0,0,0,0,0,0,0,0,0,0,W],
  [W,W,W,W,W,W,W,W,W,W,W,W],
];

export function updateCell(board, x, y, cell) {
  return [
    ...board.slice(0, y),
    [
      ...board[y].slice(0, x),
      cell,
      ...board[y].slice(x+1, board[y].length),
    ],
    ...board.slice(y + 1, board.length)
  ];
}

export function getCell(board, x, y) {
  return board[y][x];
}

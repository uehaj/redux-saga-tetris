import { delay } from 'redux-saga';
import { race, take, put, call, fork, join, select, cancel, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';
import * as Keys from './game/keys';
import * as Board from './game/board';
import * as Pieces from './game/pieces';
import Router from 'next/router';

let x;
let y;
let piece;
let spin;
let nextX;
let nextY;
let nextPiece;
let nextSpin;

function* timeTick() {
  while (true) {
    yield delay(1000);
    yield put(Actions.uiKeyDown(Keys.KEY_ARROW_DOWN));
  }
}

function* buttonClicked() {
  console.log("hoge");
}

function* keyLogger(key, action) {
  console.log("key=", key, "action=", action);
}

function canPut(board, x, y, piece, spin,
                nextX, nextY, nextPiece, nextSpin) {
  const newBoard = Pieces.unSetPiece(board, x, y, piece, spin);
  return Pieces.canPut(newBoard, nextX, nextY, nextPiece, nextSpin);
}

function* movePiece(board,
                    x, y, piece, spin,
                    nextX, nextY, nextPiece, nextSpin) {

  const cleared = Pieces.unSetPiece(board,
                                    x, y, piece, spin);
  const newBoard = Pieces.setPiece(cleared,
                                   nextX, nextY, nextPiece, nextSpin);
  yield put(Actions.setBoard(newBoard));

}

function* pieceFall() {
  x = 3;
  y = 1;
  piece = Math.floor(Math.random() * 7);
  spin = 0;
  nextX = x;
  nextY = y;
  nextPiece = piece;
  nextSpin = spin;
  let board = yield select((state => state.board));
  yield* movePiece(board,
                   x, y, piece, spin,
                   nextX, nextY, nextPiece, nextSpin);
  do {
    const keyDown = yield take(Types.UI_KEY_DOWN);
    switch (keyDown.payload) {
    case Keys.KEY_H:
    case Keys.KEY_ARROW_LEFT:
      nextX--;
      break;
    case Keys.KEY_J:
    case Keys.KEY_ARROW_DOWN:
      nextY++;
      break;
    case Keys.KEY_L:
    case Keys.KEY_ARROW_RIGHT:
      nextX++;
      break;
    case Keys.KEY_Z:
      nextSpin = (nextSpin+3) % 4;
      break;
    case Keys.KEY_X:
      nextSpin = (nextSpin+1) % 4;
      break;
    case Keys.KEY_C:
      nextPiece = (nextPiece+1) % 7;
      break;
    case Keys.KEY_Q:
      yield put(Actions.sysGameQuit());
      return;
    }
    board = yield select((state => state.board));
    if (x != nextX ||
        y != nextY ||
        piece != nextPiece ||
        spin != nextSpin) {
      if (!canPut(board,
                  x, y, piece, spin,
                  nextX, nextY, nextPiece, nextSpin)) {
        nextX = x;
        nextY = y;
        nextPiece = piece;
        nextSpin = spin;
        continue;
      }

      yield* movePiece(board,
                       x, y, piece, spin,
                       nextX, nextY, nextPiece, nextSpin);

      x = nextX;
      y = nextY;
      piece = nextPiece;
      spin = nextSpin;
    }
  } while (canPut(board,
                  x, y, piece, spin,
                  x, y+1, piece, spin));
}

function* game() {
  yield call(() => Promise.resolve(Router.push('/game')));
  yield put(Actions.setBoard(Board.INITIAL_BOARD));
  let timeTickTask;
  try {
    timeTickTask = yield fork(timeTick);
    for (let i=0; i<10; i++) {
      yield* pieceFall();
    }
  } finally {
    yield cancel(timeTickTask);
  }
}

export default function* rootSaga() {
//  yield call(() => Promise.resolve(Router.push('/')));
  while (true) {
    let keyDown;
    do {
      keyDown = yield take(Types.UI_KEY_DOWN);
    } while (keyDown.payload != Keys.KEY_S); // Wait untill 's'
    yield put(Actions.sysGameStart());
    yield put(Actions.setGameRunning(true));
    yield fork(game);
    yield take(Types.SYS_GAME_QUIT);
    yield put(Actions.setGameRunning(false));
    yield call(() => Promise.resolve(Router.push('/')));
  }
}

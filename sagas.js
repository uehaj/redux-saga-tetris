import { delay } from 'redux-saga';
import { race, take, put, call, fork, join, select, cancel, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';
import * as Keys from './game/keys';
import * as Board from './game/board';
import Piece from './game/Piece';
import Router from 'next/router';

function* timeTick() {
  while (true) {
    yield delay(1000);
    yield put(Actions.uiKeyDown(Keys.KEY_ARROW_DOWN));
    yield put(Actions.sysTimeTick());
  }
}

function* updateBoard(updater) {
  let board = yield select((state => state.board));
  const newBoard = updater(board);
  yield put(Actions.setBoard(newBoard));
}

function* pieceFall() {
  let piece = new Piece(3, 1, Math.floor(Math.random() * 7), 0);
  yield* updateBoard(board => piece.setTo(board));

  let board = yield select((state => state.board));
  while (!piece.reachedToBottom(board)) {
    const {keyDown, timeTick} = yield race({
      keyDown: take(Types.UI_KEY_DOWN),
      timeTick: take(Types.SYS_TIME_TICK),
    });
    if (keyDown && keyDown.payload === Keys.KEY_QUIT) {
      yield put(Actions.sysGameQuit());
    }
    const nextPiece = piece.nextPiece((keyDown && keyDown.payload) || Keys.KEY_ARROW_DOWN);
    if (nextPiece !== piece) {
      let [newBoard, newPiece] = nextPiece.tryPutTo(board, piece);
      yield put(Actions.setBoard(newBoard));
      piece = newPiece;
    }
    board = yield select((state => state.board));
  }
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
  yield call(() => Promise.resolve(Router.push('/')));
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

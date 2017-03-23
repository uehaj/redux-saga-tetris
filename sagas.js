/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import { delay } from 'redux-saga';
import { race, take, put, call, fork, select, cancel } from 'redux-saga/effects';
import Router from 'next/router';
import 'seedrandom';
import * as Config from './game/config';
import * as Actions from './actions';
import * as Types from './types';
import * as Keys from './game/keys';
import * as Board from './game/board';
import Piece from './game/Piece';

// show modal dialog and get user response(Ok/Cancel) synchronously
function* gameOver() {
  yield put(Actions.setModal({ show: true, title: 'GAME OVER' }));
  const answer = yield race({
    ok: take(Types.UI_MODAL_OK),
    cancel: take(Types.UI_MODAL_CANCEL),
  });
  yield put(Actions.setModal({ show: false }));
  return answer;
}

function* timeTickGenerator() {
  let tick = 0;
  while (true) {
    yield delay(100);
    yield put(Actions.sysTimeTick(tick));
    tick += 1;
  }
}

// 落下しおわっても左右の操作や回転を許す「固定時間」の処理。
function* slackTimeChecker() {
  let tick = 10;
  while (true) {
    const { keyDown, timeTick } = yield race({
      keyDown: take(Types.UI_KEY_DOWN),
      timeTick: take(Types.SYS_TIME_TICK),
    });
    if (tick === 0 || (keyDown && keyDown.payload === Keys.KEY_ARROW_DOWN)) {
      // 固定時間中に↓を押したとき、もしくは
      // 固定時間終了時には、このpieceは底に落下したことが確定。
      yield put(Actions.sysFixDownPiece());
      return;
    }
    if (timeTick) {
      tick -= 1;
    }
  }
}

function* pieceFall() {
  let piece = new Piece(3, 1, Math.floor(Math.random() * 7), 0);
  let board = yield select((state => state.board));
  if (!piece.canPut(board)) {
    // トップ位置に置けなければゲームオーバー
    yield put(Actions.sysGameOver());
    return;
  }
  yield put(Actions.setCurrentPiece(piece));

  let stcTask = null;
  while (true) {
    const { keyDown, fixDown, timeTick } = yield race({
      keyDown: take(Types.UI_KEY_DOWN),
      fixDown: take(Types.SYS_FIX_DOWN_PIECE),
      timeTick: take(Types.SYS_TIME_TICK),
    });
    if (fixDown) { // this piece is fall to bottom or other piece, and fixed
      board = piece.setTo(board);
      yield put(Actions.setBoard(board));
      break;
    }
    if (piece.reachedToBottom(board)) {
      if (stcTask === null) {
        stcTask = yield fork(slackTimeChecker);
      }
    } else if (stcTask !== null) {
      // 固定時間中の操作で底から脱却したときは固定時間を抜ける
      yield cancel(stcTask);
      stcTask = null;
    }
    if (keyDown && keyDown.payload === Keys.KEY_Q) {
      yield put(Actions.sysGameQuit());
    }
    if (keyDown || (timeTick && timeTick.payload % 10 === 0)) {
      // calcurate next piece position & spin
      const nextPiece = piece.nextPiece((keyDown && keyDown.payload) || Keys.KEY_ARROW_DOWN);
      if (nextPiece.canPut(board)) {
        piece = nextPiece;
        yield put(Actions.setCurrentPiece(piece));
      }
    }
  }
}

function* game() {
  yield call(() => Promise.resolve(Router.push('/game')));
  yield put(Actions.setBoard(Board.INITIAL_BOARD));
  let timeTickGeneratorTask;
  try {
    timeTickGeneratorTask = yield fork(timeTickGenerator);
    while (yield select(state => state.gameRunning)) {
      yield* pieceFall();
    }
  } finally {
    yield cancel(timeTickGeneratorTask);
  }
}

export default function* rootSaga() {
  if (Config.PREDICTABLE_RANDOM) {
    Math.seedrandom('tetris');
  }
  yield call(() => Promise.resolve(Router.push('/')));
  while (true) {
    while ((yield take(Types.UI_KEY_DOWN)).payload !== Keys.KEY_S) {
      /* do nothinng */
    }
    // ゲーム開始
    yield put(Actions.sysGameStart());
    yield put(Actions.setGameRunning(true));
    yield fork(game);
    // ゲームオーバー、もしくはQで終了
    const gameResult = yield race({
      quit: take(Types.SYS_GAME_QUIT),
      over: take(Types.SYS_GAME_OVER),
    });
    yield put(Actions.setGameRunning(false));
    if (gameResult.over) {
      // ゲームオーバー画面(確認ダイアログ)表示
      yield* gameOver();
    }
    yield call(() => Promise.resolve(Router.push('/')));
  }
}

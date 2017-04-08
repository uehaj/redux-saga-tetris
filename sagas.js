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

const TICK = 100; // 100ms
const SLACK_TIME = 5; // 500ms

// show modal dialog synchronously
export function* showModal({ title, cancelable = false }) {
  yield put(Actions.setModal({ show: true, title, cancelable }));
  let answer;
  do {
    answer = yield race({
      ok: take(Types.UI_MODAL_OK),
      cancel: take(Types.UI_MODAL_CANCEL),
      keyDown: take(Types.UI_KEY_DOWN),
    });
  } while (!answer.ok
           && !answer.cancel
           && !(answer.keyDown && answer.keyDown.payload === Keys.KEY_ENTER)
           && !(cancelable && answer.keyDown && answer.keyDown.payload === Keys.KEY_ESC));
  yield put(Actions.setModal({ show: false }));
  return answer;
}

export function* gameOver() {
  yield* showModal({ title: 'GAME OVER' });
}

export function* gameQuit() {
  const answer = yield* showModal({ title: 'QUIT THE GAME?', cancelable: true });
  if (answer.ok || answer.keyDown.payload === Keys.KEY_ENTER) {
    yield put(Actions.sysGameQuit());
  }
}

// pause when 'P' key down
export function* pauseChecker() {
  while (true) {
    yield take(Types.SYS_GAME_PAUSE);
    yield* showModal({ title: 'PAUSE' });
//    yield put(Actions.setModal({ show: true, title: 'PAUSE' }));
//    yield take(Types.UI_MODAL_OK);
//    yield put(Actions.setModal({ show: false }));
  }
}

export function* timeTickGenerator() {
  let tick = 0;
  while (true) {
    yield call(delay, TICK);
    yield put(Actions.sysTimeTick(tick));
    tick += 1;
  }
}

// 落下しおわっても左右の操作や回転を許す「固定時間」の処理。
export function* slackTimeChecker() {
  let slackTime = SLACK_TIME;
  while (true) {
    const { keyDown, timeTick } = yield race({
      keyDown: take(Types.UI_KEY_DOWN),
      timeTick: take(Types.SYS_TIME_TICK),
    });
    if (slackTime === 0 || (keyDown && keyDown.payload === Keys.KEY_ARROW_DOWN)) {
      // 固定時間中に↓を押したとき、もしくは
      // 固定時間終了時には、このpieceは底に落下したことが確定。
      yield put(Actions.sysFixDownPiece());
      return;
    }
    if (timeTick) {
      slackTime -= 1;
    }
  }
}

export function* pieceFall() {
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
      const [newBoard, clearedLines] = Board.clearLines(board);
      board = newBoard;
      yield put(Actions.setBoard(board));
      // line clear bonus
      yield put(Actions.addScore(Config.LINES_SCORE[clearedLines]));
      break;
    }
    // 固定時間処理タスクを起動
    if (piece.reachedToBottom(board)) {
      if (stcTask === null) {
        stcTask = yield fork(slackTimeChecker);
      }
    } else if (stcTask !== null) {
      // 固定時間中の操作で底から脱却したときは固定時間を抜ける
      yield cancel(stcTask);
      stcTask = null;
    }
    if (keyDown) {
      if (keyDown.payload === Keys.KEY_Q) {
        yield* gameQuit();
      } else if (keyDown.payload === Keys.KEY_P) {
        yield put(Actions.sysGamePause());
      }
    }
    if (keyDown || (timeTick && timeTick.payload % 10 === 0)) {
      // calcurate next piece position & spin
      const nextPiece = piece.nextPiece((keyDown && keyDown.payload) || Keys.KEY_ARROW_DOWN);
      if (nextPiece.canPut(board)) {
        if (nextPiece !== piece && keyDown && keyDown.payload ===
            Keys.KEY_ARROW_DOWN) {
          yield put(Actions.addScore(1));
        }
        piece = nextPiece;
        yield put(Actions.setCurrentPiece(piece));
      }
    }
  }
}

export function* game() {
  yield call(() => Promise.resolve(Router.push('/game')));
  yield put(Actions.setBoard(Board.INITIAL_BOARD));
  yield put(Actions.setScore(0));
  let timeTickGeneratorTask;
  let pauseCheckerTask;
  try {
    timeTickGeneratorTask = yield fork(timeTickGenerator);
    pauseCheckerTask = yield fork(pauseChecker);
    while (yield select(state => state.gameRunning)) {
      yield* pieceFall();
    }
  } finally {
    yield cancel(timeTickGeneratorTask);
    yield cancel(pauseCheckerTask);
  }
}

export default function* rootSaga() {
  if (Config.PREDICTABLE_RANDOM) {
    Math.seedrandom('sagaris');
  }
  yield call(() => Promise.resolve(Router.push('/')));
  while (true) {
    while ((yield take(Types.UI_KEY_DOWN)).payload !== Keys.KEY_S) {
      /* do nothinng */
    }
    // ゲーム開始
    yield put(Actions.setGameRunning(true));
    yield fork(game);
    // ゲームオーバー、もしくはQ押下で終了
    const gameResult = yield race({
      over: take(Types.SYS_GAME_OVER),
      quit: take(Types.SYS_GAME_QUIT),
    });
    yield put(Actions.setGameRunning(false));
    if (gameResult.over) {
      // ゲームオーバー画面(確認ダイアログ)表示
      yield* gameOver();
    }
    yield call(() => Promise.resolve(Router.push('/')));
  }
}

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
  while (true) {
    yield delay(100);
    yield put(Actions.sysTimeTick());
  }
}

function* pieceFall() {
  let piece = new Piece(3, 1, Math.floor(Math.random() * 7), 0);
  let board = yield select((state => state.board));
  if (!piece.canPut(board)) {
    yield put(Actions.sysGameOver());
    return;
  }
  board = piece.setTo(board);
  yield put(Actions.setBoard(board));

  let tick = 0;
  let slackTime = false;
  let slackCounter = 0;
  while (true) {
    const { keyDown, timeTick } = yield race({
      keyDown: take(Types.UI_KEY_DOWN),
      timeTick: take(Types.SYS_TIME_TICK),
    });
    if (piece.reachedToBottom(board)) {
      if (slackTime === false) {
        // 落下しおわっても左右の操作や回転を許す「固定時間」の処理。
        slackTime = true;
        slackCounter = 10;
      } else if (slackCounter === 0) {
        // 固定時間終了、このpieceは底に落下したことが確定。
        break;
      } else {
        slackCounter -= 1;
        if (keyDown && keyDown.payload === Keys.KEY_ARROW_DOWN) {
          // 固定時間時間中に下を押したときは固定時間を解除。
          slackCounter = 0;
        }
      }
    } else {
      slackTime = false;
    }
    if (keyDown && keyDown.payload === Keys.KEY_Q) {
      yield put(Actions.sysGameQuit());
    }
    if (timeTick) {
      tick += 1;
    }
    if (keyDown || tick % 10 === 0) {
      // next piece position & spin (still candidate)
      const nextPiece = piece.nextPiece((keyDown && keyDown.payload) || Keys.KEY_ARROW_DOWN);
      if (nextPiece !== piece) {
        const [newBoard, newPiece] = nextPiece.tryPutTo(board, piece);
        yield put(Actions.setBoard(newBoard));
        piece = newPiece;
      }
      board = yield select(state => state.board);
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
    yield put(Actions.sysGameStart());
    yield put(Actions.setGameRunning(true));
    yield fork(game);
    const gameResult = yield race({
      quit: take(Types.SYS_GAME_QUIT),
      over: take(Types.SYS_GAME_OVER),
    });
    yield put(Actions.setGameRunning(false));
    if (gameResult.over) {
      yield* gameOver();
    }
    yield call(() => Promise.resolve(Router.push('/')));
  }
}

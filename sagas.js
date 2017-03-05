import { delay } from 'redux-saga';
import { race, take, put, call, fork, join, cancel, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';
import * as Keys from './game/keys';
import * as Board from './game/board';

let x = 3;
let y = 0;
let spin = 0;

function* timeTick() {
  while (true) {
    yield delay(1000);
    y++;
    yield put(Actions.setPiece({x, y, piece:0, spin}));
  }
}

function* buttonClicked() {
  console.log("hoge");
}

function* keyLogger(key, action) {
  console.log("key=", key, "action=", action);
}

function* game() {
  while (true) {
    const keyDown = yield take(Types.UI_KEYDOWN);
    console.log(keyDown);
    switch (keyDown.payload) {
    case Keys.KEY_H:
      x--;
      break;
    case Keys.KEY_J:
      y++;
      break;
    case Keys.KEY_K:
      y--;
      break;
    case Keys.KEY_L:
      x++;
      break;
    case Keys.KEY_SPC:
      spin = (spin+1) % 4;
      break;
    }
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield fork(timeTick);
  yield fork(game);
//  yield takeLatest(Types.UI_BUTTON_CLICKED, buttonClicked);
//  yield takeLatest(Types.UI_KEYDOWN, keyLogger);
}

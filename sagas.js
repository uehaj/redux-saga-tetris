import { delay } from 'redux-saga';
import { race, take, put, call, fork, join, cancel, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';
import * as Keys from './game/keys';
import * as Board from './game/board';

function* timeTick() {
  while (true) {
    yield delay(1000);
    yield put(Actions.uiButtonClicked());
  }
}

function* buttonClicked() {
  console.log("hoge");
}

function* keyLogger(key, action) {
  console.log("key=", key, "action=", action);
}

function* game() {
  let x = 0;
  let y = 0;
  while (true) {
    const keyDown = yield take(Types.UI_KEYDOWN);
    console.log(keyDown);
    switch (keyDown.payload) {
    case Keys.KEY_H:
      x--;
      yield put(Actions.setBoard({x, y, cell:1}));
      break;
    case Keys.KEY_J:
      y++;
      yield put(Actions.setBoard({x, y, cell:1}));
      break;
    case Keys.KEY_K:
      y--;
      yield put(Actions.setBoard({x, y, cell:1}));
      break;
    case Keys.KEY_L:
      x++;
      yield put(Actions.setBoard({x, y, cell:1}));
      break;
    }
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  //  yield fork(timeTick);
  yield put(Actions.initialize(Board.initialBoard));
  yield fork(game);
//  yield takeLatest(Types.UI_BUTTON_CLICKED, buttonClicked);
//  yield takeLatest(Types.UI_KEYDOWN, keyLogger);
}

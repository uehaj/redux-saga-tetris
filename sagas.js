import { delay } from 'redux-saga';
import { race, take, put, call, fork, join, cancel, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';

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

// single entry point to start all Sagas at once
export default function* rootSaga() {
//  yield fork(timeTick);
  yield takeLatest(Types.UI_BUTTON_CLICKED, buttonClicked);
  yield takeLatest(Types.UI_KEYDOWN, keyLogger);
}

import { delay } from 'redux-saga';
import { race, take, put, call, fork, join, cancel, takeEvery, takeLatest } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Types from './types';

function* buttonClicked() {
  console.log("hoge");
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield takeLatest(Types.UI_BUTTON_CLICKED, buttonClicked);
}

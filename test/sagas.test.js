/* global describe, expect, it */
import { delay } from 'redux-saga';
import { race, take, put, call, fork, select, cancel } from 'redux-saga/effects';
import rootSaga, * as Sagas from '../sagas';
import * as Types from '../types';
import * as Keys from '../game/keys';
import * as Actions from '../actions';

describe('Sagas', () => {
  it('gameOver runs', () => {
    const gameOver = Sagas.gameOver();
    expect(gameOver.next().value).toEqual(
      put(Actions.setModal({ show: true, title: 'GAME OVER' })),
    );
    expect(gameOver.next().value).toEqual(
      take(Types.UI_MODAL_OK),
    );
    expect(gameOver.next().value).toEqual(
      put(Actions.setModal({ show: false })),
    );
    expect(gameOver.next().done).toBe(true);
  });

  it('timeTickGenerator runs', () => {
    const timeTickGenerator = Sagas.timeTickGenerator();
    for (let i = 0; i < 10; i += 1) {
      expect(timeTickGenerator.next().value).toEqual(call(delay, 100));
      expect(timeTickGenerator.next().value).toEqual(put(Actions.sysTimeTick(i)));
    }
  });

  it('slackTimeChecker runs over with timeTick', () => {
    const slackTimeChecker = Sagas.slackTimeChecker();
    const keyDown = { payload: 1 };
    for (let i = 0; i < 6; i += 1) {
      expect(slackTimeChecker.next({ timeTick: true, keyDown }).value).toEqual(
        race({
          keyDown: take(Types.UI_KEY_DOWN),
          timeTick: take(Types.SYS_TIME_TICK),
        }));
    }
    expect(slackTimeChecker.next({ timeTick: true, keyDown }).value).toEqual(
      put(Actions.sysFixDownPiece()));
    expect(slackTimeChecker.next().done).toBe(true);
  });

  it('slackTimeChecker runs over with keyDown', () => {
    const slackTimeChecker = Sagas.slackTimeChecker();
    const keyDown = { payload: 1 };
    for (let i = 0; i < 3; i += 1) {
      expect(slackTimeChecker.next({ timeTick: true, keyDown }).value).toEqual(
        race({
          keyDown: take(Types.UI_KEY_DOWN),
          timeTick: take(Types.SYS_TIME_TICK),
        }));
    }
    const keyDownArrowDown = { payload: Keys.KEY_ARROW_DOWN };
    expect(slackTimeChecker.next({ timeTick: true, keyDown: keyDownArrowDown }).value).toEqual(
      put(Actions.sysFixDownPiece()));
    expect(slackTimeChecker.next().done).toBe(true);
  });
});

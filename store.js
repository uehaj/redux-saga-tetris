import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import * as Types from './types';
import * as Board from './game/board';
import * as Pieces from './game/pieces';

export const initStore = (initialState) => {
//  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
//  const logger = createLogger({sagaMonitor});
//  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware, logger));
  return store;
}

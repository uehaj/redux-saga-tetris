import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import * as Types from './types';
import rootSaga from './sagas';
import * as Board from './game/board.js';

const initialState = {
  board: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.INITIALIZE: {
      return { board: action.payload };
    };
    case Types.UI_BUTTON_CLICKED: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    };
  case Types.SET_BOARD: {
    const {x, y, cell} = action.payload;
    return {
      ...state,
      board: Board.setBoard(state.board, x, y, cell)
    };
  };
    default: return state;
  }
};

export const initStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware, logger));
  sagaMiddleware.run(rootSaga);
  return store;
}

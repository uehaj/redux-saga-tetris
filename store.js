import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import * as Types from './types';
import rootSaga from './sagas';
import * as Board from './game/board';
import * as Pieces from './game/pieces';

const initialState = {
  board: Board.INITIAL_BOARD
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UI_BUTTON_CLICKED: {
      return state;
    };
  case Types.UPDATE_CELL: {
    const { x, y, cell } = action.payload;
    return {
      ...state,
      board: Board.updateCell(state.board, x, y, cell)
    };
  };
  case Types.SET_PIECE: {
    const { x, y, piece, spin } = action.payload;
    return {
      ...state,
      board: Pieces.setPiece(state.board, x, y, piece, spin)
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

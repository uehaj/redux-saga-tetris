import * as Types from './types';
import * as Board from './game/board';

const initialState = {
  board: Board.INITIAL_BOARD,
  modal: {
    show: false,
  },
  score: 0,
  highScore: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.UI_BUTTON_CLICKED:
      return state;
    case Types.UPDATE_CELL: {
      const { x, y, cell } = action.payload;
      return {
        ...state,
        board: Board.updateCell(state.board, x, y, cell),
      };
    }
    case Types.SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case Types.SET_CURRENT_PIECE:
      return {
        ...state,
        currentPiece: action.payload,
      };
    case Types.SET_GAME_RUNNING:
      return {
        ...state,
        gameRunning: action.payload,
      };
    case Types.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case Types.SET_SCORE:
      return {
        ...state,
        score: action.payload,
        highScore: Math.max(action.payload, state.highScore),
      };
    case Types.ADD_SCORE:
      return {
        ...state,
        score: state.score + action.payload,
        highScore: Math.max(state.score + action.payload, state.highScore),
      };
    default:
      return state;
  }
};

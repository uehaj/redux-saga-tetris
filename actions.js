import { createAction } from 'redux-actions';
import * as Types from './types';

export const uiButtonClicked = createAction(Types.UI_BUTTON_CLICKED);
export const uiKeyDown = createAction(Types.UI_KEYDOWN);
export const updateCell = createAction(Types.UPDATE_CELL);
export const setPiece = createAction(Types.SET_PIECE);

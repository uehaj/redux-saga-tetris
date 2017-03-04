import { createAction } from 'redux-actions';
import * as Types from './types';

export const uiButtonClicked = createAction(Types.UI_BUTTON_CLICKED);
export const uiKeyDown = createAction(Types.UI_KEYDOWN);
export const initialize = createAction(Types.INITIALIZE);
export const setBoard = createAction(Types.SET_BOARD);

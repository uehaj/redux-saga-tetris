import { createAction } from 'redux-actions';
import * as Types from './types';

export const uiButtonClicked = createAction(Types.UI_BUTTON_CLICKED);
export const uiKeyDown = createAction(Types.UI_KEY_DOWN);
export const uiModalOpen = createAction(Types.UI_MODAL_OPEN);
export const uiModalOk = createAction(Types.UI_MODAL_OK);
export const uiModalCancel = createAction(Types.UI_MODAL_CANCEL);

export const sysTimeTick = createAction(Types.SYS_TIME_TICK);
export const sysGameQuit = createAction(Types.SYS_GAME_QUIT);
export const sysGameOver = createAction(Types.SYS_GAME_OVER);
export const sysFixDownPiece = createAction(Types.SYS_FIX_DOWN_PIECE);

export const updateCell = createAction(Types.UPDATE_CELL);
export const setBoard = createAction(Types.SET_BOARD);
export const setCurrentPiece = createAction(Types.SET_CURRENT_PIECE);
export const setGameRunning = createAction(Types.SET_GAME_RUNNING);
export const setModal = createAction(Types.SET_MODAL);

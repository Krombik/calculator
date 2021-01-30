import { ThunkResult } from "types";
import { ActionTypes } from "./type";

export const setDark = (isDark: boolean): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_DARK,
    payload: isDark,
  });
};

export const setOffset = (offset: number): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_OFFSET,
    payload: offset,
  });
};

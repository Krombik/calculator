export enum ActionTypes {
  SET_DARK = "SET_DARK",
  SET_OFFSET = "SET_OFFSET",
}

type SetDark = {
  type: ActionTypes.SET_DARK;
  payload: boolean;
};

type SetOffset = {
  type: ActionTypes.SET_OFFSET;
  payload: number;
};

export type CommonActions = SetDark | SetOffset;

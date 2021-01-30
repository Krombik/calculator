import { ActionTypes, CommonActions } from "./type";

type State = {
  dark: boolean;
  offset: number;
};

const initialState: State = {
  dark: true,
  offset: 20,
};

export default function reducer(
  state = initialState,
  action: CommonActions
): State {
  switch (action.type) {
    case ActionTypes.SET_DARK:
      return {
        ...state,
        dark: action.payload,
      };
    case ActionTypes.SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    default:
      return state;
  }
}

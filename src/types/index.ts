import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { combinedReducer } from "redux/reducer";
import { Actions } from "./actions";
import { Theme } from "@material-ui/core";
import { ThemeProps as GenericThemeProps } from "styled-components/macro";

export type State = ReturnType<typeof combinedReducer>;

export type ThunkResult<R = void> = ThunkAction<R, State, unknown, Actions>;

export type ThunkDispatcher = ThunkDispatch<State, any, Actions>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends {}
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type ThemeProps = GenericThemeProps<Theme>;

type ConcatArrayOfTypes<T extends {}[]> = T[keyof T extends string
  ? keyof T
  : never];

type AddEmptyFields<T extends {}[], K extends {}> = {
  [i in keyof T]: Omit<K, keyof T[i]> & T[i];
};

type ArrayOfFieldKeys<T extends {}[]> = {
  [i in keyof T]: keyof T[i];
};

type FieldKeysFromArray<T extends string[]> = T[keyof T extends string
  ? keyof T
  : never];

export type ConcatTypes<T extends {}[]> = ConcatArrayOfTypes<
  AddEmptyFields<
    T,
    Partial<Record<FieldKeysFromArray<ArrayOfFieldKeys<T>>, undefined>>
  >
>;

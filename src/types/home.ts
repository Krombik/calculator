export enum CalcXYOperations {
  PLUS = "+",
  MINUS = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
  OPEN_PARENTHESIS = "(",
  CLOSING_PARENTHESIS = ")",
}

export enum CalcXOperations {
  PERCENT = "%",
  INVERT = "+-",
}

export type CalcOperations = CalcXOperations | CalcXYOperations;

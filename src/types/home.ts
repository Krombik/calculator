export enum CalcXYOperations {
  PLUS = "+",
  MINUS = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
}

export enum CalcXOperations {
  PERCENT = "%",
  INVERT = "+-",
}

export type CalcHistoryT = (string | CalcXYOperations)[];

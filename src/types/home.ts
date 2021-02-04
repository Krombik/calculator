export enum CalcXYOperations {
  PLUS = "+",
  MINUS = "-",
  MULTIPLY = "*",
  DIVIDE = "/",
  ROOT = "root",
  POW = "^",
  Y_POW = "y^",
  LOG = "log",
}

export enum CalcParenthesis {
  OPEN = "(",
  CLOSING = ")",
}

export enum CalcXOperations {
  PERCENT = "%",
  UNARY_NEGATIVE = "+-",
  POW2 = "^2",
  POW3 = "^3",
  INVERT = "^-1",
  _10POW = "10^",
  _2POW = "2^",
  SQRT = "sqrt",
  CBRT = "cbrt",
  LN = "ln",
  LOG10 = "log10",
  LOG2 = "log2",
  FACTORIAL = "!",
  SIN = "sin",
  COS = "cos",
  TAN = "tan",
  SINH = "sinh",
  COSH = "cosh",
  TANH = "tanh",
  INVERT_SIN = "1/sin",
  INVERT_COS = "1/cos",
  INVERT_TAN = "1/tan",
  INVERT_SINH = "1/sinh",
  INVERT_COSH = "1/cosh",
  INVERT_TANH = "1/tanh",
  EXP = "exp",
}

export enum SpecSymbols {
  DOT = ".",
  EE = "e",
}

export enum SpecNumbers {
  PI = "pi",
  E = "e",
}

export type CalcOperations =
  | CalcXOperations
  | CalcXYOperations
  | CalcParenthesis;

export type CalcItem = CalcOperations | string | CalcItem[];

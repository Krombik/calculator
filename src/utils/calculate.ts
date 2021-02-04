import { isUndefined, toNumber } from "lodash";
import {
  CalcItem,
  CalcOperations,
  CalcParenthesis,
  CalcXOperations,
  CalcXYOperations,
  SpecNumbers,
  SpecSymbols,
} from "types/home";
import factorial from "./factorial";

class Calculate {
  nesting: CalcItem[][] = [];

  items: CalcItem[] = [];

  constructor() {
    this.nesting.push(this.items);
  }

  clear() {
    const newItem: CalcItem[] = [];

    this.items = newItem;

    this.nesting = [newItem];
  }

  getCurrent() {
    return this.nesting[this.nesting.length - 1];
  }

  getItem(index: number) {
    const arr = this.getCurrent();

    return arr[index < 0 ? arr.length + index : index];
  }

  setItem(value: CalcItem, index?: number) {
    const arr = this.getCurrent();

    arr[
      index === undefined ? arr.length : index < 0 ? arr.length + index : index
    ] = value;
  }

  setOperator(operator: CalcOperations) {
    if (operator === CalcParenthesis.OPEN) {
      const newItem: CalcItem[] = [];

      this.getCurrent().push(newItem);

      this.nesting.push(newItem);
    } else if (operator === CalcParenthesis.CLOSING) {
      this.nesting.pop();
    } else {
      const lastItem = this.getItem(-1);

      if (
        isNaN(toNumber(lastItem)) &&
        Object.values<CalcItem>(CalcXYOperations).includes(lastItem)
      ) {
        this.setItem(operator, -1);
      } else {
        this.setItem(operator);
      }
    }
  }

  updateXY(symbol: string) {
    const lastItem = this.getItem(-1);

    let newValue: string | undefined;

    if (symbol === SpecNumbers.PI) {
      newValue = String(Math.PI);
    } else if (symbol === SpecNumbers.E) {
      newValue = String(Math.E);
    }

    if (isNaN(toNumber(lastItem)) || isUndefined(lastItem)) {
      newValue =
        newValue ??
        (!Object.values<string>(SpecSymbols).includes(symbol)
          ? symbol
          : `0${symbol}`);

      this.setItem(newValue);
    } else {
      newValue =
        newValue ??
        (Object.values<string>(SpecSymbols).some(
          (item) => symbol === item && (lastItem as string).includes(item)
        )
          ? (lastItem as string)
          : `${lastItem}${symbol}`);

      this.setItem(newValue, -1);
    }

    return newValue;
  }

  static calculate(items: CalcItem[], preCalculate?: boolean): number {
    if (items.length === 1) return toNumber(items[0]);

    if (items.length === 2) {
      const x = Array.isArray(items[0])
        ? Calculate.calculate(items[0], preCalculate)
        : toNumber(items[0]);

      switch (items[1]) {
        case CalcXOperations.UNARY_NEGATIVE:
          return -x;
        case CalcXOperations.PERCENT:
          return x / 100;
        case CalcXOperations.INVERT:
          return 1 / x;
        case CalcXOperations.POW2:
          return Math.pow(x, 2);
        case CalcXOperations.POW3:
          return Math.pow(x, 3);
        case CalcXOperations.EXP:
          return Math.exp(x);
        case CalcXOperations._2POW:
          return Math.pow(2, x);
        case CalcXOperations._10POW:
          return Math.pow(10, x);
        case CalcXOperations.SQRT:
          return Math.sqrt(x);
        case CalcXOperations.CBRT:
          return Math.cbrt(x);
        case CalcXOperations.SIN:
          return Math.sin(x);
        case CalcXOperations.COS:
          return Math.cos(x);
        case CalcXOperations.TAN:
          return Math.tan(x);
        case CalcXOperations.SINH:
          return Math.sinh(x);
        case CalcXOperations.COSH:
          return Math.cosh(x);
        case CalcXOperations.TANH:
          return Math.tanh(x);
        case CalcXOperations.INVERT_SIN:
          return 1 / Math.sin(x);
        case CalcXOperations.INVERT_COS:
          return 1 / Math.cos(x);
        case CalcXOperations.INVERT_TAN:
          return 1 / Math.tan(x);
        case CalcXOperations.INVERT_SINH:
          return 1 / Math.sinh(x);
        case CalcXOperations.INVERT_COSH:
          return 1 / Math.cosh(x);
        case CalcXOperations.INVERT_TANH:
          return 1 / Math.tanh(x);
        case CalcXOperations.LN:
          return Math.log(x);
        case CalcXOperations.LOG2:
          return Math.log2(x);
        case CalcXOperations.LOG10:
          return Math.log10(x);
        case CalcXOperations.FACTORIAL:
          return x > 0 && Number.isInteger(x) ? factorial(x) : Number.NaN;
        default:
          return x;
      }
    }

    const reverseItems = [...items].reverse();

    const plusMinisIndex =
      items.length -
      1 -
      reverseItems.findIndex(
        (item) =>
          item === CalcXYOperations.PLUS || item === CalcXYOperations.MINUS
      );

    if (plusMinisIndex !== items.length) {
      let x, y: number;

      if (plusMinisIndex !== items.length - 1) {
        x = Calculate.calculate(items.slice(plusMinisIndex + 1), preCalculate);
        if (preCalculate) return x;
        y = Calculate.calculate(items.slice(0, plusMinisIndex), preCalculate);
      } else {
        y = Calculate.calculate(items.slice(0, plusMinisIndex), false);
        if (preCalculate) {
          return y;
        } else {
          x = y;
        }
      }

      switch (items[plusMinisIndex]) {
        case CalcXYOperations.PLUS:
          return x + y;
        case CalcXYOperations.MINUS:
          return x - y;
        default:
          return Number.NaN;
      }
    }

    const value = toNumber(reverseItems[0]);

    let x, y: number;
    let operator: string;

    if (!isNaN(value) || Array.isArray(reverseItems[0])) {
      x = Calculate.calculate(items.slice(0, items.length - 2), preCalculate);
      y = Array.isArray(reverseItems[0])
        ? Calculate.calculate(reverseItems[0], preCalculate)
        : value;
      operator = reverseItems[1] as string;
    } else {
      operator = reverseItems[0] as string;
      x = Calculate.calculate(items.slice(0, items.length - 1), preCalculate);
      if (
        !Object.values<CalcItem>(CalcXYOperations).includes(reverseItems[0])
      ) {
        y = Calculate.calculate(items.slice(items.length - 2), preCalculate);
      } else {
        if (preCalculate) {
          return x;
        } else {
          y = x;
        }
      }
    }

    switch (operator) {
      case CalcXYOperations.MULTIPLY:
        return x * y;
      case CalcXYOperations.DIVIDE:
        return x / y;
      case CalcXYOperations.POW:
        return Math.pow(x, y);
      case CalcXYOperations.Y_POW:
        return Math.pow(y, x);
      case CalcXYOperations.ROOT:
        return x < 0 && (!Number.isInteger(y) || y % 2 === 0)
          ? Number.NaN
          : Math.sign(x) * Math.pow(Math.abs(x), 1 / y);
      case CalcXYOperations.LOG:
        return Math.log(x) / Math.log(y);
      default:
        return Number.NaN;
    }
  }
}

export default Calculate;

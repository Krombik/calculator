import { isNumber } from "lodash";
import React, { MouseEvent, useCallback, useRef, useState, VFC } from "react";
import "styled-components/macro";
import { CalcOperations, CalcXYOperations, CalcXOperations } from "types/home";

type XY = number | Calculate;

class Calculate {
  private _firstParent: Calculate;

  private _parent?: Calculate;

  current?: Calculate;

  operator?: CalcOperations;

  x?: XY;

  y?: XY;

  constructor(parent?: Calculate, operator?: CalcOperations, x?: XY) {
    this.operator = operator;
    this.x = x;
    this._parent = parent;
    this._firstParent = parent?._firstParent || this;
    this._firstParent._setCurrent(this);
  }

  private _setCurrent(current: Calculate) {
    this._firstParent.current = current;
  }

  setOperator(operator: CalcOperations) {
    if (operator === CalcXYOperations.OPEN_PARENTHESIS) {
      const value = this._openParenthesis();
      if (this.y === undefined) {
        this.x = value;
      } else {
        this.y = value;
      }
    } else if (operator === CalcXYOperations.CLOSING_PARENTHESIS) {
      this._closeParenthesis();
    } else if (this.y === undefined) {
      if (Object.values<CalcOperations>(CalcXOperations).includes(operator)) {
        const value = this._openParenthesis(operator, this.x!);
        if (this.operator) {
          this.y = value;
        } else {
          this.x = value;
        }
        value._closeParenthesis();
      } else {
        this.operator = operator;
      }
    } else {
      const self = this._closeParenthesis() || this;
      self.y = self._openParenthesis(operator, self.y!);
    }
    console.log(this._firstParent);
  }

  setXY(value: string) {
    if (this.operator) {
      return (this.y = +`${this.y ?? ""}${value}`);
    } else {
      return (this.x = +`${this.x ?? ""}${value}`);
    }
  }

  private _getXY() {
    const { x, y } = this;

    console.log(x, y);

    const _x = isNumber(x) ? x : x?.calculate() ?? 0;

    const _y = isNumber(y) ? y : y?.calculate(_x) ?? _x;

    return { x: _x, y: _y };
  }

  calculate(prevX?: number): number {
    const { x, y } = this._getXY();

    console.log(this.operator, x, y);

    switch (this.operator) {
      case CalcXYOperations.DIVIDE:
        return x / y;
      case CalcXYOperations.MINUS:
        return x - y;
      case CalcXYOperations.PLUS:
        return x + y;
      case CalcXYOperations.MULTIPLY:
        return x * y;
      case CalcXOperations.INVERT:
        return -x;
      case CalcXOperations.PERCENT:
        return this._parent?.operator === CalcXYOperations.MINUS ||
          this._parent?.operator === CalcXYOperations.PLUS
          ? (x * (prevX ?? x)) / 100
          : x / 100;
      default:
        return x;
    }
  }

  private _openParenthesis(operator?: CalcOperations, x?: XY) {
    return new Calculate(this, operator, x);
  }

  private _closeParenthesis() {
    if (this._parent) this._firstParent._setCurrent(this._parent);
    return this._parent;
  }

  clear() {
    this._firstParent._setCurrent(this._firstParent);
    delete this.x;
    delete this.y;
    delete this.operator;
  }
}

const Home: VFC = () => {
  const historyRef = useRef(new Calculate());

  const [res, setRes] = useState(0);

  const handleEqual = useCallback(
    () => setRes(historyRef.current.calculate()),
    []
  );

  const handleNumber = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    const history = historyRef.current.current!;

    setRes(history.setXY(name));
  }, []);

  const handleOperation = useCallback(
    (e: MouseEvent<HTMLButtonElement & { name: CalcOperations }>) => {
      const history = historyRef.current.current!;

      setRes(history.calculate());

      history.setOperator(e.currentTarget.name);
    },
    []
  );

  const handleClear = useCallback(() => {
    historyRef.current.clear();
    setRes(0);
  }, []);

  return (
    <>
      <div>{String(res)}</div>
      <div>
        <button
          name={CalcXYOperations.OPEN_PARENTHESIS}
          onClick={handleOperation}
        >
          (
        </button>
        <button
          name={CalcXYOperations.CLOSING_PARENTHESIS}
          onClick={handleOperation}
        >
          )
        </button>
        <button onClick={handleClear}>AC</button>
        <button name={CalcXOperations.INVERT} onClick={handleOperation}>
          +-
        </button>
        <button name={CalcXOperations.PERCENT} onClick={handleOperation}>
          %
        </button>
        <button name={CalcXYOperations.DIVIDE} onClick={handleOperation}>
          /
        </button>
        <br />
        <button name="7" onClick={handleNumber}>
          7
        </button>
        <button name="8" onClick={handleNumber}>
          8
        </button>
        <button name="9" onClick={handleNumber}>
          9
        </button>
        <button name={CalcXYOperations.MULTIPLY} onClick={handleOperation}>
          *
        </button>
        <br />
        <button name="4" onClick={handleNumber}>
          4
        </button>
        <button name="5" onClick={handleNumber}>
          5
        </button>
        <button name="6" onClick={handleNumber}>
          6
        </button>
        <button name={CalcXYOperations.MINUS} onClick={handleOperation}>
          -
        </button>
        <br />
        <button name="1" onClick={handleNumber}>
          1
        </button>
        <button name="2" onClick={handleNumber}>
          2
        </button>
        <button name="3" onClick={handleNumber}>
          3
        </button>
        <button name={CalcXYOperations.PLUS} onClick={handleOperation}>
          +
        </button>
        <br />
        <button name="0" onClick={handleNumber}>
          0
        </button>
        <button name="." onClick={handleNumber}>
          .
        </button>
        <button name="=" onClick={handleEqual}>
          =
        </button>
      </div>
    </>
  );
};

export default Home;

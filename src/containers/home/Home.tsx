import React, { MouseEvent, useCallback, useRef, useState, VFC } from "react";
import "styled-components/macro";
import {
  CalcXYOperations,
  CalcXOperations,
  CalcParenthesis,
  CalcOperations,
  SpecSymbols,
  SpecNumbers,
} from "types/home";
import Calculate from "utils/calculate";

const Home: VFC = () => {
  const historyRef = useRef(new Calculate());

  const [res, setRes] = useState<string>("");

  const handleEqual = useCallback(
    () => setRes(String(Calculate.calculate(historyRef.current.items))),
    []
  );

  const handleNumber = useCallback(
    (e: MouseEvent<HTMLButtonElement>) =>
      setRes(historyRef.current.updateXY(e.currentTarget.name)),
    []
  );

  const handleOperation = useCallback(
    (e: MouseEvent<HTMLButtonElement & { name: CalcOperations }>) => {
      const history = historyRef.current;

      history.setOperator(e.currentTarget.name);

      setRes(String(Calculate.calculate(history.items, true)));
    },
    []
  );

  const handleClear = useCallback(() => {
    historyRef.current.clear();
    setRes("");
  }, []);

  return (
    <>
      <div>{String(res) || 0}</div>
      <div>
        <button onClick={handleClear}>AC</button>
        <button name={CalcXOperations.UNARY_NEGATIVE} onClick={handleOperation}>
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
        <button name={SpecSymbols.DOT} onClick={handleNumber}>
          .
        </button>
        <button name={SpecSymbols.EE} onClick={handleNumber}>
          EE
        </button>
        <button name="=" onClick={handleEqual}>
          =
        </button>
        <br />
        <button name={SpecNumbers.PI} onClick={handleNumber}>
          Pi
        </button>
        <button name={SpecNumbers.E} onClick={handleNumber}>
          e
        </button>
        <br />
        <button name={CalcParenthesis.OPEN} onClick={handleOperation}>
          (
        </button>
        <button name={CalcParenthesis.CLOSING} onClick={handleOperation}>
          )
        </button>
        <br />
        <button name={CalcXOperations.POW2} onClick={handleOperation}>
          x^2
        </button>
        <button name={CalcXOperations.POW3} onClick={handleOperation}>
          x^3
        </button>
        <button name={CalcXOperations.SQRT} onClick={handleOperation}>
          sqrt(x)
        </button>
        <button name={CalcXOperations.CBRT} onClick={handleOperation}>
          cbrt(x)
        </button>
        <button name={CalcXOperations.LN} onClick={handleOperation}>
          ln
        </button>
        <button name={CalcXOperations.LOG2} onClick={handleOperation}>
          log2
        </button>
        <button name={CalcXOperations.LOG10} onClick={handleOperation}>
          log10
        </button>
        <button name={CalcXOperations.SIN} onClick={handleOperation}>
          sin(x)
        </button>
        <button name={CalcXOperations.COS} onClick={handleOperation}>
          cos(x)
        </button>
        <button name={CalcXOperations.TAN} onClick={handleOperation}>
          tan(x)
        </button>
        <button name={CalcXOperations.SINH} onClick={handleOperation}>
          sinh(x)
        </button>
        <button name={CalcXOperations.COSH} onClick={handleOperation}>
          cosh(x)
        </button>
        <button name={CalcXOperations.TANH} onClick={handleOperation}>
          tanh(x)
        </button>
        <button name={CalcXOperations.INVERT_SIN} onClick={handleOperation}>
          1/sin(x)
        </button>
        <button name={CalcXOperations.INVERT_COS} onClick={handleOperation}>
          1/cos(x)
        </button>
        <button name={CalcXOperations.INVERT_TAN} onClick={handleOperation}>
          1/tan(x)
        </button>
        <button name={CalcXOperations.INVERT_SINH} onClick={handleOperation}>
          1/sinh(x)
        </button>
        <button name={CalcXOperations.INVERT_COSH} onClick={handleOperation}>
          1/cosh(x)
        </button>
        <button name={CalcXOperations.INVERT_TANH} onClick={handleOperation}>
          1/tanh(x)
        </button>
        <button name={CalcXOperations.FACTORIAL} onClick={handleOperation}>
          x!
        </button>
        <br />
        <button name={CalcXYOperations.POW} onClick={handleOperation}>
          x^y
        </button>
        <button name={CalcXYOperations.Y_POW} onClick={handleOperation}>
          y^x
        </button>
        <button name={CalcXYOperations.POW} onClick={handleOperation}>
          x^y
        </button>
        <button name={CalcXYOperations.ROOT} onClick={handleOperation}>
          y&#8730;x
        </button>
        <button name={CalcXYOperations.LOG} onClick={handleOperation}>
          logy(x)
        </button>
        <br />
      </div>
    </>
  );
};

export default Home;

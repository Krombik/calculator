import React, { MouseEvent, useCallback, useRef, useState, VFC } from "react";
import "styled-components/macro";
import { CalcHistoryT, CalcXYOperations, CalcXOperations } from "types/home";

const strToNumber = <T extends number | undefined>(
  str: string | undefined,
  defaultValue: T
) => (str && !isNaN(+str) ? +str : defaultValue);

const calculate = (history: CalcHistoryT) =>
  history.reduce((acc, x, index) => {
    console.log(acc, x, index);
    switch (x) {
      case CalcXYOperations.DIVIDE:
        return acc / strToNumber(history[index + 1], acc);
      case CalcXYOperations.MINUS:
        return acc - strToNumber(history[index + 1], acc);
      case CalcXYOperations.PLUS:
        return acc + strToNumber(history[index + 1], acc);
      case CalcXYOperations.MULTIPLY:
        return acc * strToNumber(history[index + 1], acc);
      default:
        return acc;
    }
  }, strToNumber(history[0], 0));

const Home: VFC = () => {
  const historyRef = useRef<CalcHistoryT>([]);

  const [res, setRes] = useState(0);

  const handleEqual = useCallback(
    () => setRes(calculate(historyRef.current)),
    []
  );

  const handleNumber = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    const history = historyRef.current;

    const lastItem = history[history.length - 1];

    if (lastItem && !isNaN(+lastItem)) {
      history[history.length - 1] = lastItem + name;
    } else {
      history.push(name);
    }

    setRes(+history[history.length - 1]);
  }, []);

  const handleXYOperation = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (historyRef.current.length > 0) {
      setRes(calculate(historyRef.current));

      historyRef.current.push(e.currentTarget.name);
    }
  }, []);

  const handleXOperation = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const history = historyRef.current;

    const lastItem = history[history.length - 1];

    if (lastItem) {
      const { name } = e.currentTarget;

      let newRes: number | undefined;

      if (name === CalcXOperations.PERCENT) {
        const penultimateItem = history[history.length - 2];

        if (isNaN(+lastItem)) {
          if (
            lastItem === CalcXYOperations.MINUS ||
            lastItem === CalcXYOperations.PLUS
          ) {
            newRes = Math.pow(+penultimateItem, 2) / 100;
          } else {
            newRes = +penultimateItem / 100;
          }

          history.push(String(newRes));
        } else {
          if (penultimateItem) {
            if (
              penultimateItem === CalcXYOperations.MINUS ||
              penultimateItem === CalcXYOperations.PLUS
            ) {
              newRes = Math.pow(+history[history.length - 3], 2) / 100;
            } else {
              newRes = +history[history.length - 3] / 100;
            }
          } else {
            newRes = +lastItem / 100;
          }

          history[history.length - 1] = String(newRes);
        }
      } else if (name === CalcXOperations.INVERT) {
        if (!isNaN(+lastItem)) {
          newRes = -+lastItem;

          history[history.length - 1] = String(newRes);
        }
      }

      if (newRes) setRes(newRes);
    }
  }, []);

  const handleClear = useCallback(() => {
    historyRef.current = [];
    setRes(0);
  }, []);

  console.log(historyRef.current);

  return (
    <>
      <div>{String(res)}</div>
      <div>
        <button onClick={handleClear}>AC</button>
        <button name={CalcXOperations.INVERT} onClick={handleXOperation}>
          +-
        </button>
        <button name={CalcXOperations.PERCENT} onClick={handleXOperation}>
          %
        </button>
        <button name={CalcXYOperations.DIVIDE} onClick={handleXYOperation}>
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
        <button name={CalcXYOperations.MULTIPLY} onClick={handleXYOperation}>
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
        <button name={CalcXYOperations.MINUS} onClick={handleXYOperation}>
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
        <button name={CalcXYOperations.PLUS} onClick={handleXYOperation}>
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

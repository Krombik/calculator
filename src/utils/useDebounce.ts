import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

const useDebounce = <T>(
  value: T,
  delay: number
): [
  debouncedValue: T,
  prevValue: T,
  resetDebouncedValue: Dispatch<SetStateAction<T>>
] => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const prevValue = useRef(debouncedValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedValue !== value) {
        prevValue.current = debouncedValue;
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, prevValue.current, setDebouncedValue];
};

export default useDebounce;

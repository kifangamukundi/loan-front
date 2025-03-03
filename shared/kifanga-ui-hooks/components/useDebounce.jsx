import { useCallback, useRef } from 'react';

const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
};

export default useDebounce;
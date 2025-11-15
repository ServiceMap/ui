import { useCallback, useRef } from "react";

const DEFAULT_TIMEOUT = 250;

type Callback = () => void;
type Timeout = ReturnType<typeof setTimeout>;

export const useDebounce = (timeout = DEFAULT_TIMEOUT) => {
  const timeoutRef = useRef<Timeout>(null);

  return useCallback(
    (callback: Callback) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(callback, timeout);
    },
    [timeout],
  );
};

export default useDebounce;

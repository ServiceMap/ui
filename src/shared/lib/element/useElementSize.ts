import { type RefObject, useLayoutEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export const useElementSize = <T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  size: Size;
} => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.target.getBoundingClientRect();
      setSize({ width, height });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
};

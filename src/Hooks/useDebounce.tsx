import { useEffect, useRef } from "react";

type DebounceOptions = {
  leading?: boolean;
  trailing?: boolean;
};

const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options: DebounceOptions
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default useDebounce;

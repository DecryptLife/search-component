import { useRef } from "react";

const useThrottle = (cb, delay, options) => {
  let isWait = false;
  let lastArgs;

  const timeoutFunc = () => {
    if (lastArgs === null) {
      isWait = false;
    } else {
      cb(...lastArgs);
      lastArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (isWait) {
      lastArgs = args;
      return;
    }

    cb(...args);
    isWait = true;

    setTimeout(timeoutFunc, delay);
  };
};

export default useThrottle;

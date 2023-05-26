import React, { useRef } from 'react';

const useInterval = () => {
  const savedCallback = useRef();
  const tick = () => {
    savedCallback.current();
  };
  return { savedCallback, tick };
};

export default useInterval;

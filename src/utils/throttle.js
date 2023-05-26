const throttle = (func, ms, now) => {
  let throttled = false;

  return (...args) => {
    if (!throttled) {
      throttled = true;
      if (now) {
        func(...args);
      }
      setTimeout(() => {
        if (!now) {
          func(...args);
        }
        throttled = false;
      }, ms);
    }
  };
};
export default throttle;

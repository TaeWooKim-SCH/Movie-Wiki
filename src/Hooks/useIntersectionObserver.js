import { useEffect } from 'react';

const useIntersectionObserver = (callback, options, ref, dependencies = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callback, options, ref, ...dependencies]);
};

export default useIntersectionObserver;

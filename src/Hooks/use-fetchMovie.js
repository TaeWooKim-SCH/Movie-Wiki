import { useCallback } from 'react';

const useFetchMovie = () => {
  const fetchData = useCallback(async (url, callback) => {
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
  }, []);
  return { fetchData };
};

export default useFetchMovie;

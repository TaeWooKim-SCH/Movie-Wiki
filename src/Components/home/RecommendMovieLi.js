import React, { useEffect, useRef, useState } from 'react';
import { CATEGORY, MOVIE_LENGTH_LIMIT } from '../../Assets/ConstantValue';
import MovieCard from '../MovieCard';

function RecommendMovieLi({ category }) {
  const [datas, setDatas] = useState([]);
  const listRef = useRef();

  const fetch = async () => {
    const data = await CATEGORY[category].func;
    const response = await data.json();
    setDatas(response.results.slice(0, MOVIE_LENGTH_LIMIT));
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div ref={listRef} className="flex w-fit overflow-x-hidden">
      {!!datas.length &&
        datas.map(data => <MovieCard movie={data} key={data.div} />)}
    </div>
  );
}

export default RecommendMovieLi;

import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { CATEGORY, MOVIE_LENGTH_LIMIT } from '../../Assets/ConstantValue';
import MovieCard from '../MovieCard';
import ScrollContainer from './ScrollContainer';

function RecommendMovieLi({ category }) {
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await CATEGORY[category].func;
      if (res.ok) {
        const response = await res.clone().json();
        setDatas(response.results.slice(0, MOVIE_LENGTH_LIMIT));
      }
    };
    fetch();
  }, []);

  return (
    <ScrollContainer className="relative">
      {datas &&
        datas.map(data => (
          <li key={uuid()}>
            <MovieCard movie={data} />
          </li>
        ))}
    </ScrollContainer>
  );
}

export default RecommendMovieLi;

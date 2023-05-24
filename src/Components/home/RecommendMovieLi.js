import React, { useEffect, useState } from 'react';
import { CATEGORY, MOVIE_LENGTH_LIMIT } from '../../Assets/ConstantValue';
import MovieCard from '../MovieCard';
import ScrollContainer from './ScrollContainer';

function RecommendMovieLi({ category }) {
  const [datas, setDatas] = useState([]);

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

  // Todo 스크롤 끝나고 모달 켜지는거 막아야함
  return (
    <ScrollContainer>
      {!!datas.length &&
        datas.map(data => (
          <li>
            <MovieCard movie={data} key={data.div} />
          </li>
        ))}
    </ScrollContainer>
  );
}

export default RecommendMovieLi;

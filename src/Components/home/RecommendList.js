import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import movieData from '../../API/movie';
import { API_KEY } from '../../Assets/ConstantValue';
import MovieCard from '../MovieCard';
import RecommendTitle from './RecommendTitle';

function RecommendList() {
  const category = ['TOP 10', '주간', '월간', '최신', '한국'];

  const [data, setData] = useState('');

  useEffect(() => {
    movieData(API_KEY)
      .then(res => res.json())
      .then(res => setData(res.results[2]));
  }, []);

  return (
    <>
      {category.map(title => (
        <>
          <RecommendTitle key={title} category={title} />
          <div className="flex w-fit">
            {data && <MovieCard movie={data} />}
            {data && <MovieCard movie={data} />}
            {data && <MovieCard movie={data} />}
            {data && <MovieCard movie={data} />}
            {data && <MovieCard movie={data} />}
            {data && <MovieCard movie={data} />}
            {data && <MovieCard movie={data} />}
            {data && <MovieCard movie={data} />}
          </div>
        </>
      ))}
    </>
  );
}

export default RecommendList;

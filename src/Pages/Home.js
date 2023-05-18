import React, { useEffect, useState } from 'react';
import movieData from '../API/movie';
import { API_KEY } from '../Assets/ConstantValue';
import MovieCard from '../Components/MovieCard';

export default function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    movieData(API_KEY)
      .then(res => res.json())
      .then(res => setData(res.results[2]));
  }, []);

  return (
    <section id="home" className="ml-56">
      <header>엄청나게 큰 이미지가 들어갈거임</header>
      <div>
        <p>인기 영화</p>
        <div>scroll 가능한 movie Card 5개 리스트</div>
      </div>
      {/* {data && <MovieCard movie={data} />} */}
    </section>
  );
}

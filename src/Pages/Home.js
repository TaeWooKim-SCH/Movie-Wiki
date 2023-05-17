import React, { useState, useEffect } from 'react';
import MovieCard from '../Components/MovieCard';
import movieData from '../API/movie';
// import Navbar from '../Components/Navbar';

export default function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    movieData(process.env.REACT_APP_TMDB_API_KEY)
      .then(res => res.json())
      .then(res => setData(res.results[0]));
  }, []);

  return (
    <section id="home" className="ml-56 bg-backgroundNormal">
      <h1>Home</h1>
      <h2>Home</h2>
      {data && <MovieCard movie={data} />}
    </section>
  );
}

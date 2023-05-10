import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './Components/MovieCard';

function App() {
  const API = process.env.REACT_APP_TMDB_API_KEY;
  const [test, setTest] = useState('');
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API}&language=ko-KR`,
    )
      .then(response => response.json())
      .then(response => setTest(response))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <div className="flex flex-wrap justify-around bg-black">
        {test &&
          test.results.map(e => {
            return <MovieCard key={e.id} movie={e} />;
          })}
      </div>
    </div>
  );
}

export default App;

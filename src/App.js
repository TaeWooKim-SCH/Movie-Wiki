import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './Components/MovieCard';
import movieData from './API/movie';

const API = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const [test, setTest] = useState('');
  useEffect(() => {
    movieData(API)
      .then(response => response.json())
      .then(response => setTest(response))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <div className="h-full w-full flex flex-wrap justify-around bg-backgroundNormal">
        {test &&
          test.results.map(e => {
            return <MovieCard key={e.id} movie={e} />;
          })}
      </div>
    </div>
  );
}

export default App;

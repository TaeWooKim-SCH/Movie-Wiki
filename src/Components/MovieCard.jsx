import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

const TEXT_LENGTH_LIMIT = 12;
const STORY_LENGTH_LIMIT = 80;

function MovieCard({ movie }) {
  const movieStory = movie.overview;
  const moviePoster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  const date = movie.release_date.slice(0, 4);
  const starPoint = movie.vote_average;

  const textLengthOverCut = (text, len) => {
    if (len === TEXT_LENGTH_LIMIT) {
      if (text.length >= TEXT_LENGTH_LIMIT)
        return `${text.substr(0, TEXT_LENGTH_LIMIT)}...`;

      return text;
    }

    if (text.length >= STORY_LENGTH_LIMIT)
      return `${text.substr(0, STORY_LENGTH_LIMIT)}...`;

    return text;
  };

  const [isMouseOn, setIsMouseOn] = useState(false);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowStory(isMouseOn);
    }, 100);
  }, [isMouseOn]);

  return (
    <Card
      onMouseEnter={() => setIsMouseOn(true)}
      onMouseLeave={() => setIsMouseOn(false)}
    >
      <div className="h-52 relative">
        {showStory && (
          <div className="w-full h-full top-0 left-0 absolute z-10 text-white flex justify-center items-center">
            {textLengthOverCut(movieStory, STORY_LENGTH_LIMIT)}
          </div>
        )}
        <CardPoster
          className={`${isMouseOn ? 'scale-105 blur-sm' : 'scale-100'}`}
          src={moviePoster}
          alt="포스터"
        />
      </div>
      <div className="h-12 flex flex-col">
        <div className="text-white">
          {textLengthOverCut(movie.title, TEXT_LENGTH_LIMIT)}
        </div>
        <div className="flex justify-between">
          <div className="text-white">{date}</div>
          <div className="text-red-500 mr-2">⭐️ {starPoint}</div>
        </div>
      </div>
    </Card>
  );
}

const Card = tw.div`
  flex
  flex-col
  w-44
  h-64
  m-5
  bg-black
  shadow-2xl
  shadow-gray-700
`;

const CardPoster = tw.img`
  top-0
  left-0
  w-full
  h-full
  absolute
  ease-in
  duration-100 
`;

export default MovieCard;

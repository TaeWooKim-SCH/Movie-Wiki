import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { IoStarSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import {
  TEXT_LENGTH_LIMIT,
  STORY_LENGTH_LIMIT,
  YEAR_LENGTH_LIMIT,
  STAR_POINT_INITIAL_NUMBER,
} from '../Assets/ConstantValue';
import { movieIdActions } from '../Store/movieId-slice';
import useScrollLock from '../Hooks/useScrollLock';

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const [isMouseOn, setIsMouseOn] = useState(false);
  const { lockScroll } = useScrollLock();
  const { title, overview } = movie;
  const moviePoster = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  const date = movie.release_date
    ? movie.release_date.slice(0, YEAR_LENGTH_LIMIT)
    : 'xxxx';
  const starPoint = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : STAR_POINT_INITIAL_NUMBER;
  const cardPosterClassName = isMouseOn && 'scale-105 brightness-40';

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

  const handleMouseEnter = () => {
    setIsMouseOn(true);
  };
  const handleMouseLeave = () => {
    setIsMouseOn(false);
  };

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        lockScroll();
        dispatch(movieIdActions.openModal(movie.id));
      }}
    >
      <div className="relative h-52">
        <CardPoster
          className={`${cardPosterClassName}`}
          src={moviePoster}
          alt="포스터"
        />

        <CardStory className={`${isMouseOn ? 'opacity-100' : 'opacity-0'}`}>
          {textLengthOverCut(overview, STORY_LENGTH_LIMIT)}
        </CardStory>
      </div>
      <div className="flex h-12 flex-col bg-transparent">
        <div className="text-white">
          {textLengthOverCut(title, TEXT_LENGTH_LIMIT)}
        </div>
        <div className="flex justify-between text-sm">
          <div className="text-white">{date}</div>
          <div className="mr-2 flex text-red-500">
            <IoStarSharp className="mr-1 mt-1" />
            {starPoint}
          </div>
        </div>
      </div>
    </Card>
  );
}

const Card = tw.article`
  m-5
  flex
  h-64
  w-44
  cursor-pointer
  flex-col
  text-base
`;

const CardPoster = tw.img`
  absolute
  left-0
  top-0
  h-full
  w-full
  duration-300
  backface-hidden
`;

const CardStory = tw.div`
  absolute
  left-0
  top-0
  z-10
  flex
  h-full
  w-full
  items-center
  justify-center
  p-2
  text-white
  duration-300
`;

export default MovieCard;

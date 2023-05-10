import React, { useState } from 'react';
import { BsBookmarkPlus, BsFillBookmarkPlusFill } from 'react-icons/bs';
import tw from 'tailwind-styled-components';

const BoldP = tw.p`
  font-bold
`;

function MovieInfo({ movieData, creditData }) {
  const cast = creditData.cast.slice(0, 5).map(el => el.name);
  const releaseYear = movieData.release_date.split('-')[0];
  const [isBookmark, setIsBookmart] = useState(false);
  const starPoint = Number(movieData.vote_average).toFixed(1);

  const HandlerBookmark = () => {
    setIsBookmart(!isBookmark);
  };

  return (
    <>
      <h1 className="text-7xl text-white mb-3">{movieData.original_title}</h1>
      {isBookmark ? (
        <BsFillBookmarkPlusFill
          className="my-2"
          size={30}
          color="white"
          onClick={HandlerBookmark}
        />
      ) : (
        <BsBookmarkPlus
          className="my-2"
          size={30}
          color="white"
          onClick={HandlerBookmark}
        />
      )}
      <div className="flex my-3 text-white">
        <div className="flex gap-2 mr-9">
          <BoldP className="mr-2">{releaseYear}</BoldP>
          <BoldP>{movieData.runtime}분</BoldP>
        </div>
        <div>
          <BoldP>{starPoint}</BoldP>
          {/* 별점 svg 추가해야함 */}
        </div>
      </div>
      <div className="flex">
        <p className=" mr-2 text-slate-600">출연</p>
        <ul className="flex text-white">
          {cast.map(el => {
            return (
              <li className="mr-2" key={el}>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MovieInfo;

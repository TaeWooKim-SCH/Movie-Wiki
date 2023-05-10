import React from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const MoviePoster = tw.img`
 w-[183px] h-full border-[0.3px] border-slate-600
`;

const MovieGenres = styled.li`
  display: inline-block;
  list-style: none;
  border: 1px solid white;
  border-radius: 30px;
  margin-right: 10px;
`;

function MovieOverViewVideo({ posterurl, movieData, videoData }) {
  const videopath = videoData.results.find(video => {
    return video.site === 'YouTube';
  });

  return (
    <>
      <div className="border-[0.3px] border-slate-600 my-10" />
      <div className="flex gap-5 text-white ">
        <MoviePoster src={posterurl} alt="moviePoster" />
        <div className="flex justify-between">
          <div className="flex flex-col w-1/2 h-full justify-between">
            <p>{movieData.overview}</p>
            <ul>
              {movieData.genres.map(genre => {
                return (
                  <MovieGenres
                    className="px-[20px] py-[5px] text-xs"
                    key={genre.id}
                  >
                    {genre.name}
                  </MovieGenres>
                );
              })}
            </ul>
          </div>
          <iframe
            width="242"
            height="143"
            src={`https://www.${videopath.site}.com/embed/${videopath.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="self-end"
          />
        </div>
      </div>
    </>
  );
}

export default MovieOverViewVideo;

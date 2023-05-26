import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

function MovieOverViewVideo({ postURL, movieData, videoData }) {
  const [videoPath, setVideoPath] = useState(null);

  useEffect(() => {
    if (videoData.results.length) {
      setVideoPath(
        videoData.results.find(video => {
          return video.site === 'YouTube';
        }),
      );
    }
  }, []);

  return (
    <>
      <div className="my-10 border-[0.3px] border-slate-600" />
      <MovieInfoWrapper>
        <MoviePoster src={postURL} alt="moviePoster" />
        <OverviewWrapper>
          <OverviewDiv>
            <p className="mb-1 break-keep text-sm lg:text-base">
              {movieData.overview}
            </p>
            <ul>
              {movieData.genres.map(genre => {
                return (
                  <MovieGenres
                    className="lg: mb-2 px-[10px] py-[5px] text-xs lg:px-[20px]"
                    key={genre.id}
                  >
                    {genre.name}
                  </MovieGenres>
                );
              })}
            </ul>
          </OverviewDiv>
          {videoPath && (
            <iframe
              width="240rem"
              height="160rem"
              src={`https://www.${videoPath.site}.com/embed/${videoPath.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="hidden self-center md:block"
            />
          )}
        </OverviewWrapper>
      </MovieInfoWrapper>
    </>
  );
}

const MoviePoster = tw.img`
 w-42 h-72 border-[0.3px] border-slate-600
`;

const MovieGenres = styled.li`
  display: inline-block;
  list-style: none;
  border: 1px solid white;
  border-radius: 30px;
  margin-right: 10px;
`;

const MovieInfoWrapper = tw.div`
flex h-fit w-fit gap-5 text-white
`;

const OverviewWrapper = tw.div`
relative flex h-80 w-full justify-between gap-5
`;

const OverviewDiv = tw.div`
flex h-72 flex-col justify-between
`;

export default MovieOverViewVideo;

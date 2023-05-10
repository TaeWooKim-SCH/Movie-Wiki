import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import MovieInfo from './MovieInfo';
import MovieOverViewVideo from './MovieOverViewVideo';
import useFetchMovie from '../Hooks/use-fetchMovie';

const ModalDiv = tw.div`
  w-4/5 h-4/5 relative rounded-md overflow-hidden
`;

const Main = styled.main`
  background-image: url(${props => props.backdrop});
`;

const ShadowDiv = tw.div`
w-full h-full absolute top-0 left-0 bg-black/45 rounded-md p-[55px] pt-[90px]
`;

const BackdropDiv = tw.div`
flex justify-center items-center w-full h-screen bg-black/728
`;

const Button = tw.button`
absolute top-5 right-5 
`;

function ModalOverlay({ movieId = 76600 }) {
  const [movieData, setMovieData] = useState(null);
  const [backdropurl, setBackdropurl] = useState('');
  const [posterurl, setPosterurl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [creditData, setCreditData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const { fetchData: fetchMovieData } = useFetchMovie();
  const { fetchData: fetchVideoData } = useFetchMovie();
  const { fetchData: fetchCreditData } = useFetchMovie();

  useEffect(() => {
    fetchMovieData(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=1fcd5ebc68de73e3c682786dadc576c4&language=ko`,
      data => {
        setMovieData(data);
        setBackdropurl(`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`);
        setPosterurl(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
      },
    );
    fetchVideoData(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1fcd5ebc68de73e3c682786dadc576c4&language=ko`,
      data => {
        setVideoData(data);
      },
    );
    fetchCreditData(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1fcd5ebc68de73e3c682786dadc576c4&language=ko`,
      data => {
        setCreditData(data);
      },
    );
  }, []);

  useEffect(() => {
    if (movieData && videoData && creditData) setIsFetching(false);
  }, [movieData, videoData, creditData]);

  return (
    <ModalDiv>
      {isFetching && <p>...Loading</p>}
      {!isFetching && (
        <Main
          backdrop={backdropurl}
          className="w-full h-full rounded-md text-black bg-no-repeat 
          bg-cover bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          <ShadowDiv>
            <Button className="justify-end" type="button">
              <AiOutlineClose size={21} color="white" />
            </Button>
            <MovieInfo movieData={movieData} creditData={creditData} />
            <MovieOverViewVideo
              posterurl={posterurl}
              movieData={movieData}
              videoData={videoData}
            />
          </ShadowDiv>
        </Main>
      )}
    </ModalDiv>
  );
}

function Backdrop() {
  return (
    <BackdropDiv>
      <ModalOverlay />
    </BackdropDiv>
  );
}

function Overlay() {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('overlay-root'),
      )}
    </>
  );
}

export default Overlay;

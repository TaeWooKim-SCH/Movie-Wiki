import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import useFetchMovie from '../Hooks/useFetchMovie';
import MovieInfo from '../Components/movieDetail/MovieInfo';
import MovieOverViewVideo from '../Components/movieDetail/MovieOverViewVideo';
import {
  creditFetchedData,
  movieDetailFetchedData,
  videoFetchedData,
} from '../API/movie';
import { API_KEY } from '../Assets/ConstantValue';
import { movieIdActions } from '../Store/movieId-slice';
import useScrollLock from '../Hooks/useScrollLock';

function ModalOverlay() {
  const movieId = useSelector(state => state.ID.id);
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState(null);
  const [backdropURL, setbackdropURL] = useState('');
  const [postURL, setpostURL] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [creditData, setCreditData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { fetchData: fetchMovieData } = useFetchMovie();
  const { fetchData: fetchVideoData } = useFetchMovie();
  const { fetchData: fetchCreditData } = useFetchMovie();
  const { openScroll } = useScrollLock();

  useEffect(() => {
    fetchMovieData(movieDetailFetchedData(movieId, API_KEY), data => {
      setMovieData(data);
      setbackdropURL(`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`);
      setpostURL(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
    });
    fetchVideoData(videoFetchedData(movieId, API_KEY), data => {
      setVideoData(data);
    });
    fetchCreditData(creditFetchedData(movieId, API_KEY), data => {
      setCreditData(data);
    });
  }, []);

  useEffect(() => {
    if (movieData !== null && videoData !== null && creditData !== null)
      setIsFetching(false);
  }, [movieData, videoData, creditData]);

  const HandlerModalClose = () => {
    openScroll();
    dispatch(movieIdActions.closeModal());
  };

  return (
    <ModalDiv onClick={e => e.stopPropagation()}>
      {isFetching && <p>...Loading</p>}
      {!isFetching && (
        <Main
          backdrop={backdropURL}
          className="h-full w-full rounded-md bg-gradient-to-r from-cyan-500 
          to-blue-500 bg-cover bg-no-repeat text-black"
        >
          <ShadowDiv>
            <button
              className="absolute right-5 top-5 justify-end"
              type="button"
              onClick={HandlerModalClose}
            >
              <AiOutlineClose size={21} color="white" />
            </button>
            <MovieInfo movieData={movieData} creditData={creditData} />
            <MovieOverViewVideo
              postURL={postURL}
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
  const dispatch = useDispatch();
  const { openScroll } = useScrollLock();
  const HandlerModalClose = () => {
    openScroll();
    dispatch(movieIdActions.closeModal());
  };
  return (
    <BackdropDiv onClick={HandlerModalClose}>
      <ModalOverlay />
    </BackdropDiv>
  );
}

function MovieDetail() {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('overlay-root'),
      )}
    </>
  );
}

const ModalDiv = tw.div`
  w-4/5 h-4/5 relative rounded-md overflow-hidden
`;

const Main = styled.main`
  background-image: url(${props => props.backdrop});
`;

const ShadowDiv = tw.div`
w-full h-full absolute top-0 left-0 bg-black/45 rounded-md p-[3.4rem] 
`;

const BackdropDiv = tw.div`
fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-black/728 z-50
`;

export default MovieDetail;

import React, { useEffect, useReducer, useState } from 'react';
import tw from 'tailwind-styled-components';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import useFetchMovie from '../Hooks/useFetchMovie';
import useScrollLock from '../Hooks/useScrollLock';
import MovieInfo from '../Components/movieDetail/MovieInfo';
import MovieOverViewVideo from '../Components/movieDetail/MovieOverViewVideo';
import {
  creditFetchedData,
  movieDetailFetchedData,
  videoFetchedData,
} from '../API/movie';
import { API_KEY } from '../Assets/ConstantValue';
import { movieIdActions } from '../Store/movieId-slice';
import {
  SET_BACKDROP,
  SET_CREDIT,
  SET_MOVIE,
  SET_POSTER,
  SET_VIDEO,
} from '../Assets/ActionType';

const initialState = {
  backdropURL: './defaultBackdrop.png',
  postURL: './defaultPoster.png',
  videoData: null,
  creditData: null,
  movieData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_BACKDROP:
      return {
        ...state,
        backdropURL: action.payload ? action.payload : initialState.backdropURL,
      };
    case SET_POSTER:
      return {
        ...state,
        postURL: action.payload ? action.payload : initialState.postURL,
      };
    case SET_VIDEO:
      return { ...state, videoData: action.payload };
    case SET_CREDIT:
      return { ...state, creditData: action.payload };
    case SET_MOVIE:
      return { ...state, movieData: action.payload };
    default:
      return state;
  }
};

function ModalOverlay() {
  const movieId = useSelector(state => state.ID.id);
  const dispatch = useDispatch();
  const [state, stateDispatch] = useReducer(reducer, initialState);

  const [isFetching, setIsFetching] = useState(true);
  const { fetchData } = useFetchMovie();
  const { openScroll } = useScrollLock();

  useEffect(() => {
    fetchData(movieDetailFetchedData(movieId, API_KEY), data => {
      stateDispatch({
        type: SET_MOVIE,
        payload: data,
      });
      if (data.backdrop_path) {
        stateDispatch({
          type: SET_BACKDROP,
          payload: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
        });
      }
      if (data.poster_path) {
        stateDispatch({
          type: SET_POSTER,
          payload: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        });
      }
    });
    fetchData(videoFetchedData(movieId, API_KEY), data => {
      stateDispatch({
        type: SET_VIDEO,
        payload: data,
      });
    });
    fetchData(creditFetchedData(movieId, API_KEY), data => {
      stateDispatch({
        type: SET_CREDIT,
        payload: data,
      });
    });
  }, []);

  useEffect(() => {
    if (
      state.movieData !== null &&
      state.videoData !== null &&
      state.creditData !== null
    )
      setIsFetching(false);
  }, [state.movieData, state.videoData, state.creditData]);

  const HandlerModalClose = () => {
    openScroll();
    dispatch(movieIdActions.closeModal());
  };

  return (
    <ModalDiv onClick={e => e.stopPropagation()}>
      {isFetching && <p>...Loading</p>}
      {!isFetching && (
        <Main
          backdrop={state.backdropURL}
          className="h-full w-full rounded-md bg-gradient-to-r from-cyan-500 
          to-blue-500 bg-cover bg-center bg-no-repeat text-black"
        >
          <ShadowDiv>
            <button
              className="absolute right-5 top-5 justify-end"
              type="button"
              onClick={HandlerModalClose}
            >
              <AiOutlineClose size={21} color="white" />
            </button>
            <MovieInfo
              movieData={state.movieData}
              creditData={state.creditData}
            />
            <MovieOverViewVideo
              postURL={state.postURL}
              movieData={state.movieData}
              videoData={state.videoData}
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

  const HandlerESC = e => {
    if (e.key === 'Escape') {
      HandlerModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', HandlerESC);
    return () => {
      window.removeEventListener('keydown', HandlerESC);
    };
  }, []);

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
  w-3/4 h-[40rem] relative rounded-md overflow-hidden
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

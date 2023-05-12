import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import useFetchMovie from '../Hooks/use-fetchMovie';
import MovieInfo from '../Components/MovieInfo';
import MovieOverViewVideo from '../Components/MovieOverViewVideo';
import {
  creditFetchedData,
  movieDetailFetchedData,
  videoFetchedData,
} from '../API/movie';
import { API_KEY } from '../Assets/ConstantValue';

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

// 모달 닫기 버튼 및  backdrop 클릭 시 닫히는 것 movieCard 추가 후 구현 + 별점 svg + 모달 열려있을 때 scroll 금지
function ModalOverlay({ movieId = 16859 }) {
  const [movieData, setMovieData] = useState(null);
  const [backdropURL, setbackdropURL] = useState('');
  const [postURL, setpostURL] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [creditData, setCreditData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const { fetchData: fetchMovieData } = useFetchMovie();
  const { fetchData: fetchVideoData } = useFetchMovie();
  const { fetchData: fetchCreditData } = useFetchMovie();

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

  return (
    <ModalDiv>
      {isFetching && <p>...Loading</p>}
      {!isFetching && (
        <Main
          backdrop={backdropURL}
          className="w-full h-full rounded-md text-black bg-no-repeat 
          bg-cover bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          <ShadowDiv>
            <Button className="justify-end" type="button">
              <AiOutlineClose size={21} color="white" />
            </Button>
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
  return (
    <BackdropDiv>
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

export default MovieDetail;

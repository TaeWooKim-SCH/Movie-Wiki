import React, { useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import 'animate.css';
import {
  BACKDROP_IMG_URL,
  CAROUSEL_DELAY,
  CAROUSEL_LENGTH_LIMIT,
  CATEGORY,
  TRANSITION_TIME,
} from '../../Assets/ConstantValue';

function Carousel() {
  const [imgArr, setImgArr] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef();
  const savedCallback = useRef();
  const transitionStyle = `transform ${TRANSITION_TIME}ms ease 0s`;
  const [slideTransiton, setSlideTransiton] = useState(transitionStyle);

  const replaceSlice = idx => {
    setTimeout(() => {
      setSlideTransiton('');
      setCurrentIndex(idx);
    }, TRANSITION_TIME);
  };

  useEffect(() => {
    if (imgArr) {
      if (currentIndex === imgArr.length - 1) {
        replaceSlice(1);
      } else if (currentIndex === 0) {
        replaceSlice(imgArr.length - 2);
      }

      if (currentIndex === 2) {
        setSlideTransiton(transitionStyle);
      }
    }
  }, [currentIndex]);

  const callback = () => {
    setCurrentIndex((currentIndex + 1) % imgArr.length);
  };

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await CATEGORY['일간'].func;
      if (res.ok) {
        const response = await res.clone().json();
        const movies = response.results.slice(0, CAROUSEL_LENGTH_LIMIT);
        const infiniteMovie = [
          movies[CAROUSEL_LENGTH_LIMIT - 1],
          ...movies,
          movies[0],
        ];
        setImgArr(
          infiniteMovie.map(movie => BACKDROP_IMG_URL + movie.backdrop_path),
        );
      }
    };
    fetch();

    const tick = () => {
      savedCallback.current();
    };
    const timer = setInterval(tick, CAROUSEL_DELAY);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      <Slider
        className="flex"
        currentindex={currentIndex}
        slidetransiton={slideTransiton}
      >
        {imgArr && imgArr.map((el, idx) => <img ref={imgRef} src={el} />)}
      </Slider>
    </div>
  );
}

const Slider = styled.div`
  ${({ slidetransiton }) => css`
    transition: ${slidetransiton};
  `}
  ${({ currentindex }) => css`
    transform: translateX(${-100 * currentindex}%);
  `}
`;

export default Carousel;

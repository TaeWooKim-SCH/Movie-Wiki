import React, { useEffect, useRef, useState } from 'react';
import { css, styled } from 'styled-components';
import { GrNext, GrPrevious } from 'react-icons/gr';
import {
  BACKDROP_IMG_URL,
  CAROUSEL_DELAY,
  CAROUSEL_LENGTH_LIMIT,
  CATEGORY,
} from '../../Assets/ConstantValue';

function Carousel() {
  const [imgArr, setImgArr] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef();
  const savedCallback = useRef();

  const callback = () => {
    setCurrentIndex((currentIndex + 1) % imgArr.length);
  };

  useEffect(() => {
    savedCallback.current = callback;
  });

  const HandlerNextBtn = () => {
    setCurrentIndex((currentIndex + 1) % imgArr.length);
  };

  const HandlerPrevBtn = () => {
    if (currentIndex === 0) {
      setCurrentIndex(imgArr.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await CATEGORY['일간'].func;
      if (res.ok) {
        const response = await res.clone().json();
        const movies = response.results.slice(0, CAROUSEL_LENGTH_LIMIT);
        setImgArr(movies.map(movie => BACKDROP_IMG_URL + movie.backdrop_path));
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
      <Slider className=" flex" currentIndex={currentIndex}>
        {imgArr && imgArr.map(img => <img ref={imgRef} src={img} />)}
      </Slider>
      <div className="flex w-full cursor-pointer justify-between">
        <GrPrevious size={40} onClick={HandlerPrevBtn} />
        <GrNext size={40} onClick={HandlerNextBtn} />
      </div>
    </div>
  );
}

const Slider = styled.div`
  ${({ currentIndex }) => css`
    transform: translateX(${-100 * currentIndex}%);
  `}
`;

export default Carousel;

import React, { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import { CATEGORY, MOVIE_LENGTH_LIMIT } from '../../Assets/ConstantValue';
import MovieCard from '../MovieCard';

const throttle = (func, ms) => {
  let throttled = false;
  return (...args) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, ms);
    }
  };
};

function RecommendMovieLi({ category }) {
  const [datas, setDatas] = useState([]);
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = e => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = e => {
    e.preventDefault();
    setIsDrag(false);
  };

  const onDragMove = e => {
    const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
    scrollRef.current.scrollLeft = startX - e.pageX;
    if (scrollLeft === 0) {
      setStartX(e.pageX);
    } else if (scrollWidth <= clientWidth + scrollLeft) {
      setStartX(e.pageX + scrollLeft);
    }
  };

  const onThrottleDragMove = throttle(onDragMove, 10);

  useEffect(() => {
    const fetch = async () => {
      const res = await CATEGORY[category].func;
      if (res.ok) {
        const response = await res.clone().json();
        setDatas(response.results.slice(0, MOVIE_LENGTH_LIMIT));
      }
    };
    fetch();
  }, []);

  // Todo 스크롤 끝나고 모달 켜지는거 막아야함
  return (
    <ScrollDiv
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      role="presentation"
    >
      {!!datas.length &&
        datas.map(data => (
          <li>
            <MovieCard movie={data} key={data.div} />
          </li>
        ))}
    </ScrollDiv>
  );
}

const ScrollDiv = tw.div`
relative flex overflow-x-scroll scrollbar-hide
`;

export default RecommendMovieLi;

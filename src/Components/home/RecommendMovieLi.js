import React, { useEffect, useRef, useState } from 'react';
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
    setIsDrag(false);
    e.preventDefault();
  };

  const onDragMove = e => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX;
      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const onThrottleDragMove = throttle(onDragMove, 10);

  const onClick = e => {
    e.preventDefault();
  };

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

  return (
    <div>
      <div
        className="flex overflow-x-scroll overscroll-x-none"
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : null}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onClick={isDrag ? onClick : null}
        role="presentation"
      >
        {!!datas.length &&
          datas.map(data => (
            <li>
              <MovieCard movie={data} key={data.div} />
            </li>
          ))}
      </div>
    </div>
  );
}

// const ScrollUL = styled.ul`
//   transform: ${props => props.width};
// `;

export default RecommendMovieLi;

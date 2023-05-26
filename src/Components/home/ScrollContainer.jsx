import React, { useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import throttle from '../../utils/throttle';

function ScrollContainer({ children }) {
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
    if (scrollRef.current) {
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
  return (
    <ScrollUL
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      role="presentation"
    >
      {children}
    </ScrollUL>
  );
}

const ScrollUL = tw.ul`
relative flex cursor-ew-resize overflow-x-scroll pt-5 scrollbar-hide
`;

export default ScrollContainer;

import React, { useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import throttle from '../../utils/throttle';
import Mouse from './Mouse';

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
relative flex overflow-x-scroll scrollbar-hide pt-5
cursor-ew-resize
`;

export default ScrollContainer;

import React from 'react';
import { AiOutlineUpCircle } from 'react-icons/ai';
import throttle from '../utils/throttle';

function TopButton() {
  const handleScrollUp = throttle(
    () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    1000,
    true,
  );
  return (
    <button
      type="button"
      className="fixed bottom-10 right-10 z-20 text-white"
      onClick={handleScrollUp}
    >
      <AiOutlineUpCircle size="48" />
    </button>
  );
}

export default TopButton;

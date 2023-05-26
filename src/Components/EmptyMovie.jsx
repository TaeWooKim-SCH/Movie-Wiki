import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

function EmptyMovie() {
  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <div className="flex items-center justify-around text-gray-500">
        <FaExclamationCircle
          size="32"
          className="mr-2 items-center justify-center"
        />
        <div className="text-3xl">Movie not found.</div>
      </div>
      <div className="text-xl text-gray-300">Please change the tag.</div>
    </div>
  );
}

export default EmptyMovie;

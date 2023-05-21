import React, { useEffect, useState } from 'react';

function Tag({ genre, clickTag, setClickTag }) {
  const [isToggle, setIsToggle] = useState(false);

  const handleTagToggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    if (isToggle) {
      setClickTag([...clickTag, genre]);
      return;
    }
    setClickTag([...clickTag.filter(e => e.name !== genre.name)]);
  }, [isToggle]);

  return (
    <div
      role="checkbox"
      className={`text-sm w-20 border-black border-2 py-1 flex justify-center m-2 rounded-2xl border-white text-white select-none ${
        isToggle ? 'bg-blueWhite border-blueWhite' : ''
      }`}
      onClick={handleTagToggle}
      onKeyPress={() => {}}
      tabIndex={0}
    >
      {genre.name}
    </div>
  );
}

export default Tag;

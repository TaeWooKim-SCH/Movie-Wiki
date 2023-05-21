import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

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
    <StyledTag
      role="checkbox"
      className={`${isToggle ? 'border-blueWhite bg-blueWhite' : ''}`}
      onClick={handleTagToggle}
      onKeyPress={() => {}}
      tabIndex={0}
    >
      {genre.name}
    </StyledTag>
  );
}

const StyledTag = tw.div`
  m-2
  flex
  w-20
  justify-center
  rounded-2xl
  border-2
  border-black
  border-white
  py-1
  text-sm
  text-white
  select-none
`;

export default Tag;

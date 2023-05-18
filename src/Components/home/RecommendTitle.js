import React from 'react';
import tw from 'tailwind-styled-components';
import { CATEGORY } from '../../Assets/ConstantValue';

function RecommendTitle({ category }) {
  return (
    <div className="flex">
      <RecommendColorP className="mr-2">{category}</RecommendColorP>
      <RecommendP>{CATEGORY[category].title}</RecommendP>
      <RecommendP>영화</RecommendP>
    </div>
  );
}

const RecommendP = tw.p`
  text-white text-[3rem] font-bold
`;

const RecommendColorP = tw(RecommendP)`
text-blueWhite
`;

export default RecommendTitle;

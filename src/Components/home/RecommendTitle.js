import React from 'react';
import tw from 'tailwind-styled-components';
import { CATEGORY } from '../../Assets/ConstantValue';
import Mouse from './Mouse';

function RecommendTitle({ category }) {
  return (
    <div className="relative flex">
      <RecommendColorP className="mr-2">{category}</RecommendColorP>
      <RecommendP className="mr-2">{CATEGORY[category].title}</RecommendP>
      <RecommendP>영화</RecommendP>
      <div className="left-50 w-90 absolute top-20 ml-4">
        <Mouse />
      </div>
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

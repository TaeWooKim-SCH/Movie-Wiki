import React from 'react';
import tw from 'tailwind-styled-components';
import { CATEGORY } from '../../Assets/ConstantValue';
import Mouse from './Mouse';

function RecommendTitle({ category }) {
  return (
    <div className="relative flex">
      <RecommendColorP>{category}</RecommendColorP>
      <RecommendP>{CATEGORY[category].title}</RecommendP>
      <RecommendP>영화</RecommendP>
      <MouseWrapper>
        <Mouse />
      </MouseWrapper>
    </div>
  );
}

const RecommendP = tw.p`
text-white text-[3rem] font-bold
`;

const RecommendColorP = tw(RecommendP)`
text-blueWhite mr-2
`;

const MouseWrapper = tw.div`
left-50 w-90 absolute top-20 ml-4
`;

export default RecommendTitle;

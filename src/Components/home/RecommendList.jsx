import React from 'react';
import uuid from 'react-uuid';
import RecommendMovieLi from './RecommendMovieLi';
import RecommendTitle from './RecommendTitle';

function RecommendList() {
  const category = ['TOP 10', '주간', '일간', '상영 중인', '한국'];

  return (
    <>
      {category.map((title, idx) => (
        <div key={uuid()}>
          <RecommendTitle key={uuid()} category={title} />
          <RecommendMovieLi key={uuid()} category={category[idx]} />
        </div>
      ))}
    </>
  );
}

export default React.memo(RecommendList);

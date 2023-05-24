import React from 'react';
import RecommendMovieLi from './RecommendMovieLi';
import RecommendTitle from './RecommendTitle';

function RecommendList() {
  const category = ['TOP 10', '주간', '일간', '상영 중인', '한국'];

  return (
    <>
      {category.map((title, idx) => (
        <>
          <RecommendTitle key={title} category={title} />
          <RecommendMovieLi category={category[idx]} />
        </>
      ))}
    </>
  );
}

export default RecommendList;

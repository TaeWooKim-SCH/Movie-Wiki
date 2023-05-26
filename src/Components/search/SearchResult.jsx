import React from 'react';
import MovieCard from '../MovieCard';

export default function SearchResult({ data, keyword }) {
  return (
    <section>
      <div className="mb-5 text-3xl font-bold text-white">
        {keyword}로 검색한 결과
      </div>
      <section className="flex flex-wrap justify-start">
        {data.map(x => (
          <MovieCard movie={x} key={x.id} />
        ))}
      </section>
    </section>
  );
}

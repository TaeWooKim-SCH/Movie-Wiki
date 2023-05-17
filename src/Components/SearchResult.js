import React from 'react';
import MovieCard from './MovieCard';

export default function SearchResult({ data, keyword }) {
  return (
    <section>
      <div className="text-white font-bold text-2xl">
        {keyword}로 검색한 결과
      </div>
      <section className="flex flex-wrap justify-center">
        {data.map(x => (
          <MovieCard movie={x} key={x.id} />
        ))}
      </section>
    </section>
  );
}

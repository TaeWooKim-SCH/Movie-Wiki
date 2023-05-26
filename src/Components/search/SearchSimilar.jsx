import React, { useEffect, useState, useRef } from 'react';
import MovieCard from '../MovieCard';

export default function SearchSimilar({
  page,
  setPage,
  isLoading,
  setIsLoading,
  genre,
}) {
  const [similar, setSimilar] = useState([]);
  const targetRef = useRef(null);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko&page=${page}&sort_by=popularity.desc&with_genres=${genre}`,
      )
        .then(res => res.json())
        .then(res => {
          setSimilar(prev => prev.concat(res.results));
          setIsLoading(false);
          setPage(prev => prev + 1);
        });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fetchData();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [page]);

  return (
    <section>
      <div className="mb-5 mt-10 text-3xl font-bold text-white">
        이런 영화는 어떠신가요?
      </div>
      <section className="flex flex-wrap justify-start">
        {similar && similar.map(x => <MovieCard movie={x} key={x.id} />)}
      </section>
      <div ref={targetRef} />
      {isLoading && (
        <div className="h-50 text-center text-2xl font-bold text-white">
          로딩중...
        </div>
      )}
    </section>
  );
}

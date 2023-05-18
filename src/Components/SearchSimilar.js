import React, { useEffect, useState, useRef } from 'react';
import MovieCard from './MovieCard';

export default function SearchSimilar({
  page,
  setPage,
  keyword,
  id,
  isLoading,
  setIsLoading,
}) {
  const [similar, setSimilar] = useState([]);
  const targetRef = useRef(null);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=ko&page=${page}`,
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
      <div className="text-2xl font-bold text-white">
        이런 영화는 어떠신가요?
      </div>
      <section className="flex flex-wrap justify-center">
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

// useEffect(() => {
//   if (!keyword) {
//     setSimilar([]);
//     return;
//   }
//   const handleScroll = () => {
//     const { scrollTop } = document.documentElement;
//     const { innerHeight } = window;
//     const { scrollHeight } = document.body;
//     if (scrollTop + innerHeight === scrollHeight) {
//       setPage(prev => prev + 1);
//     }
//   };

//   window.addEventListener('scroll', handleScroll);

//   // eslint-disable-next-line consistent-return
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, []);

// useEffect(() => {
//   if (isLoading) return;
//   setIsLoading(true);
//   fetch(
//     `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=ko&page=${page}`,
//   )
//     .then(res => res.json())
//     .then(newData => {
//       setSimilar(prev => prev.concat(newData.results));
//       setIsLoading(false);
//     });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [page, keyword]);

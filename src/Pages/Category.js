import React, { useEffect, useRef, useState } from 'react';
import { GENRE_LIST } from '../Assets/ConstantValue';
import Tag from '../Components/Tag';
import { movieGenreData } from '../API/movie';
import MovieCard from '../Components/MovieCard';
// import Navbar from '../Components/Navbar';

export default function Category() {
  const [A, setA] = useState([]);
  const [tagList, setTagList] = useState('');
  const [clickTag, setClickTag] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const target = useRef(null);
  const isFirstRender = useRef(true);

  const options = {
    threshold: 1.0,
  };

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    isFirstRender.current = true;
    setPageNum(1);
    setA([]);
    setTagList(() => {
      return clickTag
        .reduce((acc, cur) => `${acc + cur.name},`, '')
        .slice(0, -1);
    });
  }, [clickTag]);

  useEffect(() => {
    console.log(pageNum);

    setIsLoading(true);
    setEnd(false);
    movieGenreData(
      process.env.REACT_APP_TMDB_API_KEY,
      clickTag.map(e => e.id),
      pageNum,
    )
      .then(res => res.json())
      .then(res => {
        if (pageNum === 1) {
          setA(res.results);
          setIsLoading(false);
        } else if (res.results && res.results.length > 0) {
          const newData = res.results.filter(
            newItem => !A.some(oldItem => oldItem.id === newItem.id),
          );
          setA([...A, ...newData]);
        } else {
          console.log('데이터 끝 ');
          setEnd(true);
        }
      });
  }, [clickTag, pageNum]);

  useEffect(() => {
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (isFirstRender.current) {
            isFirstRender.current = false;
          } else {
            setPageNum(prevPageNum => prevPageNum + 1);
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    if (target.current) {
      observer.observe(target.current);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, []);

  return (
    <section id="category" className="ml-56">
      <div className="m-5">
        <div className="flex flex-wrap justify-start border py-5 px-10 border-white rounded-3xl">
          {GENRE_LIST.map(e => (
            <Tag
              genre={e}
              clickTag={clickTag}
              setClickTag={setClickTag}
              key={e.id}
            />
          ))}
        </div>
      </div>
      <div className="text-white text-3xl font-bold mt-10">
        {tagList || '태그를 클릭해주세요.'}
      </div>
      <div className="flex flex-wrap">
        {A && A.map(e => <MovieCard movie={e} key={e.id} />)}
      </div>
      <div id="nextPage" ref={target} />
      {isLoading && (
        <div
          className={`flex justify-center text-3xl font-bold h-52 items-center text-white ${
            end && 'hidden'
          }`}
        >
          로딩중...
        </div>
      )}
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import SearchInput from '../Components/search/SearchInput';
import SearchResult from '../Components/search/SearchResult';
import SearchSimilar from '../Components/search/SearchSimilar';
import TopButton from '../Components/TopButton';

export default function Search() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const inputHandler = e => {
    setInput(e.target.value);
  };

  const searchHandler = () => {
    if (input === keyword) return;
    setKeyword(input);
    setData([]);
    setPage(1);
  };

  useEffect(() => {
    if (!keyword) {
      setData([]);
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}`,
    )
      .then(res => res.json())
      .then(json => {
        if (!json.results.length) {
          setData(json.results);
          setId('');
          setIsLoading(false);
          return;
        }
        setData(json.results);
        setId(json.results[0].id);
        setIsLoading(false);
        setGenre(json.results[0].genre_ids[0]);
      });
  }, [keyword]);

  return (
    <SearchMain id="search">
      <TopButton />
      <SearchInput inputHandler={inputHandler} searchHandler={searchHandler} />
      <section className="max-w-[900px]">
        {!data.length && (
          <div className="text-3xl font-bold text-white">
            검색 결과가 없습니다.
          </div>
        )}
        {data.length && <SearchResult data={data} keyword={keyword} />}
        {data.length && id && (
          <SearchSimilar
            page={page}
            setPage={setPage}
            keyword={keyword}
            id={id}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            genre={genre}
          />
        )}
      </section>
    </SearchMain>
  );
}

const SearchMain = tw.section`
  flex 
  flex-col 
  justify-start 
  items-center
  w-full 
  h-screen 
  pl-56
`;

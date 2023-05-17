import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import SearchInput from '../Components/SearchInput';
import SearchResult from '../Components/SearchResult';
import SearchSimilar from '../Components/SearchSimilar';

export default function Search() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
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
        setData(json.results);
        setId(json.results[0].id);
        setIsLoading(false);
      });
  }, [keyword]);

  return (
    <SearchMain id="search">
      <SearchInput inputHandler={inputHandler} searchHandler={searchHandler} />
      <section>
        {data.length && <SearchResult data={data} keyword={keyword} />}
        {data.length && (
          <SearchSimilar
            page={page}
            setPage={setPage}
            keyword={keyword}
            id={id}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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

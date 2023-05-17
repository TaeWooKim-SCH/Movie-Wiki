import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchInput({ inputHandler, searchHandler }) {
  return (
    <section className="relative fixed pt-5 w-400">
      <input
        className="w-400 h-14 rounded-full pl-5 mb-32"
        placeholder="검색어를 입력해주세요."
        onChange={e => inputHandler(e)}
      />
      <AiOutlineSearch
        className="absolute top-7 right-4 cursor-pointer"
        color="black"
        size="40"
        onClick={searchHandler}
      />
    </section>
  );
}

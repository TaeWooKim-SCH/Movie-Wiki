import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchInput({ inputHandler, searchHandler }) {
  return (
    <section className="w-400 fixed relative pt-5">
      <input
        className="w-400 mb-32 h-14 rounded-full pl-5"
        placeholder="검색어를 입력해주세요."
        onChange={e => inputHandler(e)}
      />
      <AiOutlineSearch
        className="absolute right-4 top-7 cursor-pointer"
        color="black"
        size="40"
        onClick={searchHandler}
      />
    </section>
  );
}

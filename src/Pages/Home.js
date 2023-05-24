import React from 'react';
import Carousel from '../Components/home/Carousel';
import RecommendList from '../Components/home/RecommendList';

export default function Home() {
  return (
    <section id="home" className="ml-56">
      <header className="mb-5 w-full bg-purple-300">
        <Carousel />
      </header>
      <div className="pl-5">
        <RecommendList />
      </div>
    </section>
  );
}

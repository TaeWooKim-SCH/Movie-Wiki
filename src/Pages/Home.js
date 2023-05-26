import React from 'react';
import Carousel from '../Components/home/Carousel';
import RecommendList from '../Components/home/RecommendList';

export default function Home() {
  return (
    <section id="home" className="ml-56">
      <div className="flex justify-center">
        <header className="mb-5 w-1280 bg-purple-300">
          <Carousel />
        </header>
      </div>
      <div className="pl-5">
        <RecommendList />
      </div>
    </section>
  );
}

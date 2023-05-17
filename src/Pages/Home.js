import React, { useEffect, useState } from 'react';
import { API_KEY } from '../Assets/ConstantValue';
import RecommendList from '../Components/home/RecommendList';

export default function Home() {
  return (
    <section id="home" className="ml-56">
      <header className="w-full bg-purple-300">
        엄청나게 큰 이미지가 들어갈거임
      </header>
      <div>
        <RecommendList />
      </div>
    </section>
  );
}

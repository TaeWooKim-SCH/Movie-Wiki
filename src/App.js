import React from 'react';
import './App.css';
import tw from 'tailwind-styled-components';

function App() {
  return (
    <div className="App">
      <Test>1</Test>
    </div>
  );
}

const Test = tw.div`
  font-black
  text-xl
`;

export default App;

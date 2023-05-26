import React from 'react';
import { styled } from 'styled-components';

function Mouse() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex rotate-180">
        <Unu className="unu" />
        <Doi className="doi" />
        <Trei className="trei" />
      </div>
      <MouseDiv className="mouse" />
      <div className="flex">
        <Unu className="unu" />
        <Doi className="doi" />
        <Trei className="trei" />
      </div>
    </div>
  );
}

const Span = styled.span`
  display: block;
  width: 5px;
  height: 5px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(-45deg);

  border-right: 2px solid white;
  border-bottom: 2px solid white;

  @-webkit-keyframes mouse-scroll {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.8;
    }
  }
  @-moz-keyframes mouse-scroll {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  @-o-keyframes mouse-scroll {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.8;
    }
  }
  @keyframes mouse-scroll {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.8;
    }
  }
`;

const Unu = styled(Span)`
  -webkit-animation: mouse-scroll 1s infinite;
  animation: mouse-scroll 1s infinite;
  -moz-animation: mouse-scroll 1s infinite;
  animation: mouse-scroll 1s infinite;

  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  animation-delay: 0.1s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
`;

const Doi = styled(Span)`
  -webkit-animation: mouse-scroll 1s infinite;
  animation: mouse-scroll 1s infinite;
  -moz-animation: mouse-scroll 1s infinite;
  animation: mouse-scroll 1s infinite;

  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  animation-delay: 0.2s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
`;

const Trei = styled(Span)`
  -webkit-animation: mouse-scroll 1s infinite;
  animation: mouse-scroll 1s infinite;
  -moz-animation: mouse-scroll 1s infinite;
  animation: mouse-scroll 1s infinite;

  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  animation-delay: 0.3s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
`;

const MouseDiv = styled.div`
  height: 21px;
  width: 14px;
  border-radius: 10px;
  transform: rotate(90deg);
  border: 2px solid rgba(255, 255, 255, 0.5);
  top: 170px;
`;

export default Mouse;

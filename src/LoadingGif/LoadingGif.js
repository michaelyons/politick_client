import React from 'react';
import gif from '../LoadingGif/gif2.gif';
import './LoadingGif.css';

const Loading = () => {
  return (
    <div>
      <img src={gif} alt="fire loading gif" className="fire-gif" />
    </div>
  );
};

export default Loading;

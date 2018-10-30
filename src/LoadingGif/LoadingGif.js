import React from 'react';
import gif from '../LoadingGif/gif.gif';

const Loading = () => {
  return (
    <div>
      <img src={gif} alt="fire loading gif" className="fire-gif" />
    </div>
  );
};

export default Loading;

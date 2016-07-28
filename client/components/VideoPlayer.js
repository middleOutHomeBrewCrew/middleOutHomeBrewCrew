import React from 'react';
import YouTube from 'react-youtube';

const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1
      }
};


const VideoPlayer = () => {
  return (<div>
            <YouTube videoId={'dGiQaabX3_o'} opts={opts} />
          </div>)
}

export default VideoPlayer;

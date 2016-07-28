import React from 'react';

import Nav from './Nav';
import VideoPlayer from './VideoPlayer';
import ChatBox from './ChatBox';

const App = () => {
  return (<div>
            <Nav />
            <div className='container-fluid'>
              <div className='row'>
              <VideoPlayer />
              </div>
              <div className='row'>
              <ChatBox />
              </div>
            </div>
          </div>)
}

export default App;

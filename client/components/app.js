import React from 'react';

import Nav from './Nav';
import VideoPlayer from './VideoPlayer';
import ChatBox from './ChatBox';

let playerBox = {
  height: '390px',
  width: '100%'
}

const App = () => {
  return (<div>
            <Nav />
            <div className='container-fluid'>
              <div className='row'>
                <div style={playerBox}>
                  <VideoPlayer />
                </div>
              </div>
              <div className='row'>
              <ChatBox />
              </div>
            </div>
          </div>)
}

export default App;

import React from 'react';

import Message from './Message';

import dummyData from '../../dummyData';

let messages = dummyData.data.map(function(data) {
  return <Message user={data.user} text={data.text} time={data.time} />
})

let style = {
  border: '2px solid black'
}

const ChatBox = () => {
  return (
    <div className='container-fluid' style={style}>
      {messages}
    </div>
  )
}

export default ChatBox;

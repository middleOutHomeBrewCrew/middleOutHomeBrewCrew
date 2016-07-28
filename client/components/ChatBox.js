import React from 'react';

import Message from './Message';

import dummyData from '../../dummyData';

let messages = dummyData.data.map(function(data) {
  return <Message user={data.user} text={data.text} time={data.time} />
})

const ChatBox = () => {
  return (
    <div>
      {messages}
    </div>
  )
}

export default ChatBox;

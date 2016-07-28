import React from 'react';

const Message = ({ text, user, time }) => {
  return (<div>
            <div>{user}</div>
            <div>{text}</div>
            <div>{time}</div>
          </div>)
}

export default Message;

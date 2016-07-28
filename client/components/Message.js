import React from 'react';

const Message = ({ text, user, time }) => {
  return (<div className='row center'>
            <div className='col-xs-3' >{user}</div>
            <div className='col-xs-3' >{text}</div>
            <div className='col-xs-3' >{time}</div>
          </div>)
}

export default Message;

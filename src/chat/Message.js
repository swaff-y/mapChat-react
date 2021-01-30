import React from 'react';

const Message = (props) => {
  return(
    <>
      <p className={`chat_message ${props.message.received === false ? "chat_reciever" : ""}`}>
        <span className="chat_name">{props.message.name}</span>
          {props.message.message}
        <span className="chat_timestamp">
          {props.message.timestamp}
        </span>
      </p>
    </>
  )
}

export default Message;

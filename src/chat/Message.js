import React from 'react';

const Message = (props) => {

  console.log("The Message: ",props.message);

  return(
    <>
      <p className={`chat_message ${props.user === props.message.name ? "chat_reciever" : ""}`}>
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

import React from 'react';

const Message = (props) => {

const timeSince = (date) => {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    if(Math.floor(interval) === 1){
      return Math.floor(interval) + " year ago..";
    }
    return Math.floor(interval) + " years ago..";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    if(Math.floor(interval) === 1){
      return Math.floor(interval) + " month ago..";
    }
    return Math.floor(interval) + " months ago..";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    if(Math.floor(interval) === 1){
      return Math.floor(interval) + " day ago..";
    }
    return Math.floor(interval) + " days ago..";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    if(Math.floor(interval) === 1){
      return Math.floor(interval) + " hour ago..";
    }
    return Math.floor(interval) + " hours ago..";
  }
  interval = seconds / 60;
  if (interval > 1) {
    if(Math.floor(interval) === 1){
      return Math.floor(interval) + " minute ago..";
    }
    return Math.floor(interval) + " minutes ago..";
  }
  return " just now..";
}

  return(
    <>
      <p className={`chat_message ${props.user === props.message.name ? "chat_reciever" : ""}`}>
        <span className="chat_name">{props.message.name}</span>
          {props.message.message}
        <span className="chat_timestamp">
          {timeSince(props.message.timestamp)}
        </span>
      </p>
    </>
  )
}

export default Message;

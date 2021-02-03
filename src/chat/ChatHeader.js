import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';

const ChatHeader = (props) => {
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
    <div className="chat_header">
      <Avatar />

      <div className="chat_headerInfo">
        <h3>{props.roomName}</h3>
        <p>Last post was {timeSince(props.roomData.lastTimestamp)}</p>
      </div>

      <div className="chat_headerRight">
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <MoreVert onClick={()=>props.handleToggleThread()}/>
        </IconButton>
      </div>
    </div>
  )
}

export default ChatHeader;

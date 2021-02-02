import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';

const ChatHeader = (props) => {
  // console.log("The checker:", );

  return(
    <div className="chat_header">
      <Avatar />

      <div className="chat_headerInfo">
        <h3>{props.roomName}</h3>
        <p>Last seen at {props.roomData.lastTimestamp}</p>
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

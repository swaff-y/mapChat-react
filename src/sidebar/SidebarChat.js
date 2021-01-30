import React from 'react';
import {Avatar} from '@material-ui/core';
import "./SidebarChat.css"

const SidebarChat = (props) => {
  return(
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  )
}

export default SidebarChat;

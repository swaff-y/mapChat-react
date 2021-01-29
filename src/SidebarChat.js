import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
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

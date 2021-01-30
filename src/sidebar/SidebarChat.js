import React from 'react';
import {Avatar} from '@material-ui/core';
import "./SidebarChat.css"

const SidebarChat = (props) => {

  return(
    <div className="sidebarChat" onClick={()=>props.handleClick(props.room)}>
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ props.room }</h2>
        <p>This is the last message</p>
      </div>
    </div>
  )
}

export default SidebarChat;

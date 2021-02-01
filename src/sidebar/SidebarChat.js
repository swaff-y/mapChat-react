import React from 'react';
import {Avatar} from '@material-ui/core';
import "./SidebarChat.css"

const SidebarChat = (props) => {

  return(
    <div className="sidebarChat" onClick={()=>props.handleClick(props.room.name)}>
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ props.room.name }</h2>
        <p>{props.room.lastMessage}</p>
      </div>
    </div>
  )
}

export default SidebarChat;

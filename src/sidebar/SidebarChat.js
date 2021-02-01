import React, {useEffect,useState} from 'react';
import {Avatar} from '@material-ui/core';
import "./SidebarChat.css"

const SidebarChat = (props) => {
  const [lastMessage, setLastMessage] = useState(props.room.lastMessage)
  useEffect(()=>{
    if(props.roomName === props.room.name && props.lastMessage !== ""){
      setLastMessage(props.lastMessage);
    }
  },[props.lastMessage])

  return(
    <div className="sidebarChat" onClick={()=>props.handleClick(props.room.name)}>
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ props.room.name }</h2>
        <p>{ lastMessage }
        </p>
      </div>
    </div>
  )
}

export default SidebarChat;

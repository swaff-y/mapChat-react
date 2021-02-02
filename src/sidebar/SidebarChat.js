import React, {useEffect,useState} from 'react';
import {Avatar} from '@material-ui/core';
import "./SidebarChat.css"

const SidebarChat = (props) => {
  const [lastMessage, setLastMessage] = useState("")

  useEffect(()=>{
      if(props.room.lastMessage.length <= 15){
        setLastMessage(props.room.lastMessage);
      }else{
        setLastMessage(props.room.lastMessage.substring(0,20) + " ...");
      }
  },[props.room.lastMessage])

  useEffect(()=>{
    if(props.roomName === props.room.name && props.lastMessage !== ""){
      if(props.lastMessage.length <= 15){
        setLastMessage(props.lastMessage);
      }else{
        setLastMessage(props.lastMessage.substring(0,20) + "...");
      }
    }
  },[props.lastMessage])

  const handleClick = () => {
    props.handleClick(props.room.name);
    if(props.toggleChatStatus !== true){
      props.toggleChat();
    }
  }

  return(
    <div className="sidebarChat" onClick={handleClick}>
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

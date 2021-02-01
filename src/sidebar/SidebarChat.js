import React, {useEffect,useState} from 'react';
import {Avatar} from '@material-ui/core';
import "./SidebarChat.css"

const SidebarChat = (props) => {
  const [lastMessage, setLastMessage] = useState(props.room.lastMessage)

  // console.log(props.room.name,"The last message room:->", props.room.lastMessage, "The last message prop:->", props.lastMessage,);

  // console.log("Room comparisons:", props.roomName , props.room.name);
  useEffect(()=>{
    if(props.roomName === props.room.name && props.lastMessage !== ""){
      setLastMessage(props.lastMessage);
      // console.log("the last message", lastMessage);
    }
  },[props.lastMessage])
      // console.log("the last message", lastMessage);
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

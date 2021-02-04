import React, {useEffect, useState} from 'react';
import {Avatar} from '@material-ui/core';
import './Chat.css';

const Participant = ({participant, mapClick}) => {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(()=>{
    if(participant.lastMessage.length <= 15){
      setLastMessage(participant.lastMessage);
    }else{
      setLastMessage(participant.lastMessage.substring(0,20) + " ...");
    }
  },[participant.lastMessage])

  console.log("map click:", mapClick, "name:", participant.name);

  return(
    <div className={`sidebarChat ${mapClick === participant.name ? "chat_selected" : "" }`}>
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ participant.name }</h2>
        <p>{ lastMessage }</p>
      </div>
    </div>
  )
}

export default Participant;

import React, {useEffect, useState} from 'react';
import {Avatar} from '@material-ui/core';

const Participant = ({participant}) => {
  const [lastMessage, setLastMessage] = useState("");

  useEffect(()=>{
    if(participant.lastMessage.length <= 15){
      setLastMessage(participant.lastMessage);
    }else{
      setLastMessage(participant.lastMessage.substring(0,20) + " ...");
    }
  },[participant.lastMessage])

  return(
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ participant.name }</h2>
        <p>{ lastMessage }</p>
      </div>
    </div>
  )
}

export default Participant;

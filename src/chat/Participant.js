import React, {useEffect, useState} from 'react';
import {Avatar} from '@material-ui/core';

const Participant = (props) => {

  const [lastMessage, setLastMessage] = useState(props.participant.lastMessage)
  useEffect(()=>{
    if(props.user === props.participant.name && props.lastMessage !== ""){
      setLastMessage(props.lastMessage);
    }
  },[props.lastMessage])

  return(
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>{ props.participant.name}</h2>
        <p>{ lastMessage }</p>
      </div>
    </div>
  )
}

export default Participant;

import React, {useEffect, useState} from 'react';
import Participant from './Participant'
import api from '../api';

const ChatParticipants = (props) => {

  const [participants, setParticipants] = useState([]);

  useEffect(()=>{
    api.get(`room/${props.roomName}`)
    .then(res=>{
      setParticipants(res.data.participants)
    })
    .catch(err=>{
      console.warn(err)
    })
  },[props.roomName])

  return(
    <div className="chat_participants">
      {
        participants.map((participant,index) => <Participant key={index} participant={participant} mapClick={props.mapClick} /> )
      }
    </div>
  )
}

export default ChatParticipants;

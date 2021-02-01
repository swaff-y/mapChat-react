import React, {useEffect, useState} from 'react';
import Participant from './Participant'

const ChatParticipants = (props) => {

  const [participants, setParticipants] = useState([]);

  useEffect(()=>{
    props.rooms.forEach((room)=>{
      if(room.name === props.roomName){
        setParticipants(room.participants)
      }
    })
  },[props.roomName]);

  // console.log("participants:", participants);

  return(
    <div className="chat_participants">
      {
        participants.map((participant,index) => <Participant key={index} participant={participant} user={props.user} lastMessage={props.lastMessage}/> )
      }
    </div>
  )
}

export default ChatParticipants;

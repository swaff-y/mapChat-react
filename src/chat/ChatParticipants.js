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
        participants.map((participant) => <Participant participantName={participant.name}/> )
      }
    </div>
  )
}

export default ChatParticipants;

import React, {useEffect, useState} from 'react';
import Participant from './Participant'

const ChatParticipants = (props) => {
  return(
    <div className="chat_participants">
      <Participant />
      <Participant />
      <Participant />
    </div>
  )
}

export default ChatParticipants;

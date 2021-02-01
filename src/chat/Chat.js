import React, { useState } from 'react';
import ChatHeader from './ChatHeader'
import ChatThread from './ChatThread'
import ChatParticipants from './ChatParticipants'
import "./Chat.css"


const Chat = (props) => {
  const [toggleThread, setToggleThread] = useState(true);

  const handleToggleThread = () => {
    if(toggleThread === false){
      setToggleThread(true);
    }else if(toggleThread === true){
      setToggleThread(false);
    }
  }

  return(
    <>

      <ChatHeader handleToggleThread={handleToggleThread} roomName={props.roomName} rooms={props.rooms}/>

      {
        toggleThread === true ? <ChatThread messages={props.messages} roomName={props.roomName} user={props.user}/> : <ChatParticipants rooms={props.rooms} roomName={props.roomName}/>
      }

    </>
  ); // return
}; //Function

export default Chat;

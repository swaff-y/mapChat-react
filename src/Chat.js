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
    <div className="chat">

      <ChatHeader handleToggleThread={handleToggleThread}/>

      {
        toggleThread === true ? <ChatThread messages={props.messages} /> : <ChatParticipants />
      }


    </div>
  ); // return
}; //Function

export default Chat;

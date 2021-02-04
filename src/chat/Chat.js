import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader'
import ChatThread from './ChatThread'
import ChatParticipants from './ChatParticipants'
import "./Chat.css"
import api from '../api';


const Chat = (props) => {
  const [toggleThread, setToggleThread] = useState(true);
  const [roomData, setRoomData] = useState([]);


  useEffect(()=>{
    api.get(`room/${props.roomName}`)
    .then(res=>{
      setRoomData(res.data)
    })
    .catch(err=>{
      console.warn(err)
    })
  },[props.messages])

  const handleToggleThread = () => {
    if(toggleThread === false){
      setToggleThread(true);
    }else if(toggleThread === true){
      setToggleThread(false);
    }
  }

  return(
    <>

      <ChatHeader handleToggleThread={handleToggleThread} roomName={props.roomName} roomData={roomData} latitude={props.latitude} longitude={props.longitude}/>

      {
        toggleThread === true ? <ChatThread messages={props.messages} roomName={props.roomName} user={props.user}/> : <ChatParticipants roomName={props.roomName} />
      }

    </>
  ); // return
}; //Function

export default Chat;

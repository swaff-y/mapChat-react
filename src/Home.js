import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import api from './api';
import './App.css';
import SideBar from './sidebar/SideBar';
import SkinnySidebar from './sidebar/SkinnySidebar';
import Chat from './chat/Chat';
import MapContainer from './map/MapContainer';

// const FAKE_SIDEBAR_ROOMS = ["SEI40","Hunting","Fishing","Safari","Crime","Company-XYZ-reps"];
const FAKE_USER = "Swaff-y";

const Home = (props) => {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [toggleChat, setToggleChat] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [locations, setLocations] = useState([]);
  const [roomName, setRoomName] = useState(props.match.params.name);
  const [user, setUser] = useState(FAKE_USER);
  const [lastMessage, setLastMessage] = useState("");

  console.log("Whats in messages: ", messages);

  useEffect(() => {
    //get messages
    api.get(`/messages/sync/${roomName}`)
    .then(res => {
       // console.log("The message data",res.data);
      setMessages(res.data);
    })
    .catch(err=>{
      console.warn(err)
    })
  },[rooms]);

  useEffect(() => {
    //Get rooms
    api.get(`/rooms/sync/${FAKE_USER}`)
    .then(res => {
       // console.log("The room data",res.data);
      setRooms(res.data);
    })
    .catch(err=>{
      console.warn(err)
    })

  },[props.match.params.name]);

  useEffect(()=>{
    const pusher = new Pusher('1bf1ac863ab88a3d0532', {
       cluster: 'ap4'
     });
     const channel = pusher.subscribe('messages');
     channel.bind('inserted', (newMessage) => {
       // alert(JSON.stringify(newMessage));
       // if()
       setMessages([...messages, newMessage]);
       setLastMessage(newMessage.message);
     });
     return () => {
       channel.unbind_all();
       channel.unsubscribe();
     };
  },[messages]);

  const handleToggleChat = () => {
    if(toggleChat === false){
      setToggleChat(true);
    }else if(toggleChat === true){
      setToggleChat(false);
    }
  }

  const handleToggleSidebar= () => {
    if(toggleSidebar === false){
      setToggleSidebar(true);
    }else if(toggleSidebar === true){
      setToggleSidebar(false);
      setToggleChat(false);
    }
  }

  const handleRoomChange = (name) => {
    props.history.push(`/room/${name}`);
    setRoomName(name);
  }

  // console.log("Match-left: ", messages[0].room, "Match-right: ", roomName);

  return (
    <div className="app">
      <div className="app_body">
        {
          toggleSidebar === true ? <SideBar toggleChat={handleToggleChat} toggleSidebar={handleToggleSidebar} chatRooms={rooms} handleClick={handleRoomChange}  lastMessage={lastMessage} roomName={roomName}/> : <SkinnySidebar toggleSidebar={handleToggleSidebar}/>
        }
        <div className="chat">
          {
            toggleChat === true ? <Chat messages={messages} roomName={roomName} user={user} rooms={rooms}/> : <MapContainer locations={locations} width={toggleSidebar} />
          }
        </div>
      </div>
    </div>
  );
}

export default Home;

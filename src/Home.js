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
  const [user, setUser] = useState(props.match.params.user);
  const [lastMessage, setLastMessage] = useState("");
  const [points, setPoints] = useState([]);
  const [sortedCoOrds, setSortedCoOrds] = useState({});


  useEffect(() => {
    //get messages
    api.get(`/messages/sync/${roomName}`)
    .then(res => {
      setMessages(res.data);
      res.data.forEach((message,index)=>{
        sortedCoOrds[message.name] = { latitude: message.latitude, longitude: message.longitude, msg: message.message, room: roomName };
      })
    })
    .catch(err=>{
      console.warn(err)
    })
  },[]);

  useEffect(() => {
    //Get rooms
    api.get(`/rooms/sync/${user}`)
    .then(res => {
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
       setMessages([...messages, newMessage]);
       setLastMessage(newMessage.message);
       messages.forEach((message,index)=>{
         sortedCoOrds[message.name] = { latitude: message.latitude, longitude: message.longitude, msg: message.message, room: roomName };
       })
     });
     return () => {
       channel.unbind_all();
       channel.unsubscribe();
     };
  },[messages]);

  useEffect(()=>{
    let rest = [];

    messages.forEach((message,index)=>{
      rest.push({lat:message.latitude, lng:message.longitude});
    })
    // console.log("The rest:", rest);
    setPoints(rest)
  },[messages])

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
    api.post(`/user/${user}/room/${name}`)
    .then(res=>{
      // console.log("room change results:", res.data);
    })
    .catch(err=>{
      console.warn(err)
    })

    api.get(`/messages/sync/${name}`)
    .then(res => {
      setMessages(res.data);
      res.data.forEach((message,index)=>{
        sortedCoOrds[message.name] = { latitude: message.latitude, longitude: message.longitude, msg: message.message, room: name };
      })
    })
    .catch(err=>{
      console.warn(err)
    })
    setRoomName(name);
    props.history.push(`/room/${name}/${user}`);
  }

  // console.log("The messages:", messages);
  return (
    <div className="app">
      <div className="app_body">
        {
          toggleSidebar === true ? <SideBar toggleChat={handleToggleChat} chatToggleStatus={toggleChat} toggleSidebar={handleToggleSidebar} chatRooms={rooms} handleClick={handleRoomChange}  lastMessage={lastMessage} roomName={roomName}/> : <SkinnySidebar toggleSidebar={handleToggleSidebar}/>
        }
        <div className="chat">
          {
            toggleChat === true
            ?
            <Chat messages={messages} roomName={roomName} user={user} rooms={rooms} lastMessage={lastMessage}/>
            :
            <MapContainer messages={messages} points={points} sortedCoOrds={sortedCoOrds} roomName={roomName}/>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;

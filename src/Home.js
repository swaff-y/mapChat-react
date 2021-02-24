import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import api from './api';
import './App.css';
import SideBar from './sidebar/SideBar';
import SkinnySidebar from './sidebar/SkinnySidebar';
import Chat from './chat/Chat';
import MapContainer from './map/MapContainer';
import axios from 'axios';

const Home = (props) => {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [toggleChat, setToggleChat] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [roomName, setRoomName] = useState(props.match.params.name);
  const [user] = useState(props.match.params.user);
  const [lastMessage, setLastMessage] = useState("");
  const [points, setPoints] = useState(null);
  const [sortedCoOrds] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [mapClick, setMapClick] = useState("");
  const [toggleThread, setToggleThread] = useState(true);


  useEffect(() => {
    //get messages
    // setInterval(()=>{
      api.get(`/messages/sync/${roomName}`)
      .then(res => {
        setMessages(res.data);
        res.data.forEach((message,index)=>{
          sortedCoOrds[message.name] = { latitude: message.latitude, longitude: message.longitude, msg: message.message, room: roomName, name: message.name };
        })
      })
      .catch(err=>{
        console.warn(err)
      })
    // },5000)


  axios.get("https://extreme-ip-lookup.com/json/")
    .then((res)=>{
      setLatitude(res.data.lat)
      setLongitude(res.data.lon)
    })
    .catch((err)=>{
      console.warn(err)
    });
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

        if(messages[messages.length - 1].message !== newMessage.message){
         setMessages([...messages, newMessage]);
         setLastMessage(newMessage.message);
         messages.forEach((message,index)=>{
           sortedCoOrds[message.name] = { latitude: message.latitude, longitude: message.longitude, msg: message.message, room: roomName, name: message.name };
         })
        }
     });
     // console.log("tik");
     let data = [];

     messages.forEach((message,index)=>{
       data.push({lat:message.latitude, lng:message.longitude});
     })
     // console.log("The rest:", rest);
     setPoints(data);
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
      // setToggleChat(false);
    }
  }

  const handleToggleThread = () => {
    axios.get("https://extreme-ip-lookup.com/json/")
    .then((res)=>{
      setLatitude(res.data.lat)
      setLongitude(res.data.lon)
    })
    .catch((err)=>{
      console.warn(err)
    });
    if(toggleThread === false){
      setToggleThread(true);
    }else if(toggleThread === true){
      setToggleThread(false);
    }
  }

  const handleRoomChange = (name) => {
    api.post(`/user/${user}/room/${name}`)
    .then(res=>{
    })
    .catch(err=>{
      console.warn(err)
    })

    api.get(`/messages/sync/${name}`)
    .then(res => {
      setMessages(res.data);
      res.data.forEach((message,index)=>{
        sortedCoOrds[message.name] = { latitude: message.latitude, longitude: message.longitude, msg: message.message, room: name, name: message.name};
      })
    })
    .catch(err=>{
      console.warn(err)
    })
    setRoomName(name);
    props.history.push(`/room/${name}/${user}`);
  }

  const handleMapClick = (value) => {
    setMapClick(value);
    setToggleChat(true);
    setToggleThread(false);
  }

  return (
    <div className="app">
      <div className="app_body">
        {
          toggleSidebar === true
          ?
          <SideBar toggleChat={handleToggleChat} chatToggleStatus={toggleChat} toggleSidebar={handleToggleSidebar} chatRooms={rooms} handleClick={handleRoomChange}  lastMessage={lastMessage} roomName={roomName} user={user} history={props.history}/> :
          <SkinnySidebar toggleSidebar={handleToggleSidebar}/>
        }
        <div className="chat">
          {
            toggleChat === true
            ?
            <Chat messages={messages} roomName={roomName} user={user} rooms={rooms} lastMessage={lastMessage} latitude={latitude} longitude={longitude} handleToggleThread={handleToggleThread} toggleThread={toggleThread} mapClick={mapClick}/>
            :
            points !== null ? <MapContainer width={toggleSidebar} messages={messages} points={points} sortedCoOrds={sortedCoOrds} roomName={roomName} latitude={latitude} longitude={longitude} handleMapClick={handleMapClick}/> : <p className="app_center">No Chats on thread</p>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;

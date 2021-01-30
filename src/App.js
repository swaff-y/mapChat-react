import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import api from './api';
import './App.css';
import SideBar from './SideBar';
import Chat from './Chat';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    api.get('/messages/sync')
    .then(res => {
      console.log("The data",res.data);
    })
  },[]);

  useEffect(()=>{
    const pusher = new Pusher('1bf1ac863ab88a3d0532', {
       cluster: 'ap4'
     });

     const channel = pusher.subscribe('messages');
     channel.bind('inserted', (newMessage) => {
       alert(JSON.stringify(newMessage));
       setMessages([...messages, newMessage]);
     });

     console.log("The data",messages);


     return () => {
       channel.unbind_all();
       channel.unsubscribe();
     };
  },[messages]);

  console.log("Fetched messages", messages);

  return (
    <div className="app">
      <div className="app_body">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
}

export default App;

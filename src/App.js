import React, {useEffect, useState} from 'react';
import Pusher from 'pusher-js';
import api from './api';
import './App.css';
import SideBar from './SideBar';
import SkinnySidebar from './SkinnySidebar';
import Chat from './Chat';
import Map from './Map';

function App() {
  const [messages, setMessages] = useState([]);
  const [toggleChat, setToggleChat] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);

  useEffect(() => {
    api.get('/messages/sync')
    .then(res => {
      // console.log("The data",res.data);
      setMessages(res.data);
    })
  },[]);

  useEffect(()=>{
    const pusher = new Pusher('1bf1ac863ab88a3d0532', {
       cluster: 'ap4'
     });

     const channel = pusher.subscribe('messages');
     channel.bind('inserted', (newMessage) => {
       // alert(JSON.stringify(newMessage));
       setMessages([...messages, newMessage]);
     });

     // console.log("The appended",messages);


     return () => {
       channel.unbind_all();
       channel.unsubscribe();
     };
  },[messages]);

  // console.log("Fetched messages", messages);

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
    }
  }

  return (
    <div className="app">
      <div className="app_body">
        {
          toggleSidebar === true ? <SideBar toggleChat={handleToggleChat} toggleSidebar={handleToggleSidebar}/> : <SkinnySidebar toggleSidebar={handleToggleSidebar}/>
        }

        {
          toggleChat === true ? <Chat messages={messages} /> : <Map />
        }
      </div>
    </div>
  );
}

export default App;

import React, {useState} from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import {Avatar, IconButton} from '@material-ui/core';
import SidebarChat from './SidebarChat';
import "./SideBar.css"

const SideBar = (props) => {
  const [search, setSearch] = useState("");
  const [chatRooms, setChatRooms] = useState(null);

  props.chatRooms.forEach((room)=>{
    // console.log(room.name);
  })

  // console.log(props.chatRooms.name);

  const handleChange = (e) => {
     // console.log("Chat Rooms",chatRooms);
    let str = e.target.value;
    console.log(str);
    setSearch(str);
    const index = e.target.value.length - 1;
    console.log(str,index,chatRooms);
    let arr = chatRooms;
    // console.log("comp:", index);
     if(chatRooms === null){
      props.chatRooms.forEach((room)=>{
        console.log("room index:", index);
        let obj = {};
        if(index >= 0){
          if(str.toLowerCase() === room.name[index].toLowerCase()){
            obj['name'] = room.name;
            obj['lastMessage'] = room.lastMessage;
            // console.log(props.chatRooms);
            arr.push(obj);
          }
        }
      })
     }
    else{
      chatRooms.forEach((room)=>{
        // console.log("room index:", index);
        let obj = {};
        if(index >= 0 && index < 1){
          if(str.toLowerCase() === room.name[index].toLowerCase()){
            obj['name'] = room.name;
            obj['lastMessage'] = room.lastMessage;
            // console.log(props.chatRooms);
            arr.push(obj);
          }
        }else if(index === 1){
          // console.log("I ran", str, room.name[index]);
          if(str[index].toLowerCase() === room.name[index].toLowerCase()){
            obj['name'] = room.name;
            obj['lastMessage'] = room.lastMessage;
            // console.log(props.chatRooms);
            arr.push(obj);
          }
        }else if(index === 2){
          // console.log("I ran", str, room.name[index]);
          if(str[index].toLowerCase() === room.name[index].toLowerCase()){
            obj['name'] = room.name;
            obj['lastMessage'] = room.lastMessage;
            // console.log(props.chatRooms);
            arr.push(obj);
          }
        }
      })
    }



    if(index < 0){
      setChatRooms(props.chatRooms);
    }else{
      setChatRooms(arr);
    }

  }
  const handleClick = () => {
    console.log("This is the text: ", search);
  }

  // console.log(chatRooms);
  return(
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars.githubusercontent.com/u/72368535?s=400&u=20eeecfe9dd1f5a481917319985b2de6d695a80c&v=4"/>
        <p><strong>Welcome:</strong> <br/>{props.user}</p>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon onClick={()=>props.history.push('/')}/>
          </IconButton>
          <IconButton>
            <ChatIcon onClick={()=>props.toggleChat()}/>
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={()=>props.toggleSidebar()}/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <form>
            <input placeholder="Search" type="text" onChange={handleChange} />
            <input type="submit" className="hide" onClick={handleClick} />
          </form>
        </div>
      </div>
      <div className="sidebar_chats">
        {
          chatRooms !== null
          ?
          chatRooms.map((room,index) => <SidebarChat key={index} roomName={props.roomName} room={room} lastMessage={props.lastMessage} handleClick={props.handleClick} toggleChat={props.toggleChat} toggleChatStatus={props.chatToggleStatus}/>)
          :
          props.chatRooms.map((room,index) => <SidebarChat key={index} roomName={props.roomName} room={room} lastMessage={props.lastMessage} handleClick={props.handleClick} toggleChat={props.toggleChat} toggleChatStatus={props.chatToggleStatus}/>)
        }
      </div>
    </div>
  )
}

export default SideBar;

import React from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import {Avatar, IconButton} from '@material-ui/core';
import SidebarChat from './SidebarChat';
import "./SideBar.css"

const SideBar = (props) => {

  return(
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://avatars.githubusercontent.com/u/72368535?s=400&u=20eeecfe9dd1f5a481917319985b2de6d695a80c&v=4"/>
        {props.user}
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
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
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        {
          props.chatRooms.map((room,index) => <SidebarChat key={index} roomName={props.roomName} room={room} lastMessage={props.lastMessage} handleClick={props.handleClick} toggleChat={props.toggleChat} toggleChatStatus={props.chatToggleStatus}/>)
        }
      </div>
    </div>
  )
}

export default SideBar;

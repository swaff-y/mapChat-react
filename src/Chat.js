import React, {useEffect, useState} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import "./Chat.css"

const Chat = (props) => {
  return(
    <div className="chat">
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        <p className="chat_message">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat_message chat_reciever">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat_message">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>
        <p className="chat_message chat_reciever">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat_message">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>
        <p className="chat_message chat_reciever">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat_message">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>
        <p className="chat_message chat_reciever">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat_message">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>
        <p className="chat_message chat_reciever">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>

        <p className="chat_message">
          <span className="chat_name">Kyle</span>
          This is a message
          <span className="chat_timestamp">
          {new Date().toUTCString()}
          </span>
        </p>
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input

            placeholder="Type a message"
            type="text"
          />
          <button>Send a message</button>
        </form>
        <MicIcon />
      </div>

    </div>
  ); // return
}; //Function

export default Chat;

import React, {useEffect, useState} from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { animateScroll } from "react-scroll";
import MicIcon from '@material-ui/icons/Mic'
import Message from './Message'
import api from '../api'

const ChatThread = (props) => {

  const [input, setInput] = useState();
  useEffect(()=>{
    scrollToBottom();
  },[props.messages])

  const sendMessage = (e) => {
    e.preventDefault();
    api.post(`/messages/new`, {
      message: input,
      name: props.user,
      timestamp: Date.now(),
      room: props.roomName
    }).then((res=>{
      console.log("Message Succesfully sent");
      setInput("");
    })).catch(err=>console.log("I am throwing and error:", err));
  };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "scroll"
    });
  };

  return(
    <>
      <div className="chat_body" id="scroll">

        {
          props.messages.map((message,index) => <Message key={index} message={message} user={props.user}/>)
        }

      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </>
  )
}

export default ChatThread;

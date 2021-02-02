import React, {useEffect, useState} from 'react';
import Emoji from './Emoji';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { animateScroll } from "react-scroll";
import MicIcon from '@material-ui/icons/Mic'
import Message from './Message'
import api from '../api'

const ChatThread = (props) => {

  const see = props.messages;

  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [input, setInput] = useState('');

  useEffect(()=>{
    scrollToBottom();
  },[props.messages])

  useEffect(()=>{
    document.getElementById("test").focus()
  },[input])

  const sendMessage = (e) => {
    e.preventDefault();
    api.post(`/messages/new`, {
      message: input,
      name: props.user,
      timestamp: Date.now(),
      room: props.roomName,
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

  const handleToggleEmoji = () => {
    if(toggleEmoji === false){
      setToggleEmoji(true);
    }else if(toggleEmoji === true){
      setToggleEmoji(false);
    }
  }

  const setEmoji = (value) => {
    setInput(input + value.emoji)
  }

  return(
    <>
      <div className="chat_body" id="scroll">

        {
          props.messages.map((message,index) => see[index].room === props.roomName ? <Message key={index} message={message} user={props.user} /> : null)
        }

      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon onClick={handleToggleEmoji} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
            id="test"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>

      {
        toggleEmoji === true ? <Emoji getEmoji={setEmoji} handleToggle={handleToggleEmoji}/> : null
      }
    </>
  )
}

export default ChatThread;

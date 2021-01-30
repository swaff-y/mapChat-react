import React, {useEffect, useState} from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import Message from './Message'
import api from './api'

const ChatThread = (props) => {

  const [input, setInput] = useState();

  const sendMessage = (e) => {
    e.preventDefault();
    api.post(`/messages/new`, {
      message: input,
      name: "Fake User",
      timestamp: Date.now(),
      received : false
    }).then((res=>{
      console.log("Message Succesfully sent");
      setInput("");
    })).catch(err=>console.warn(err));
  };

  return(
    <>
      <div className="chat_body">

        {
          props.messages.map((message,index) => <Message key={index} message={message} />)
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

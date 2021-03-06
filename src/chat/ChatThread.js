import React, {useEffect, useState} from 'react';
import Emoji from './Emoji';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { animateScroll } from "react-scroll";
import MicIcon from '@material-ui/icons/Mic'
import Message from './Message'
import axios from 'axios';
import api from '../api'

const ChatThread = (props) => {

  const see = props.messages;

  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [input, setInput] = useState('');
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);
  const [locationOff, setLocationOff] = useState(false);

  // console.log("The browser:", navigator.permissions);

  useEffect(()=>{
    scrollToBottom();
  },[props.messages])

  useEffect(()=>{
    document.getElementById("test").focus();
    navigator.geolocation.getCurrentPosition(getLocation,askLocation);

  },[input])

  function getLocation(data){
    setLatitude(data.coords.latitude)
    setLongitude(data.coords.longitude)
    setLocationOff(false)
  }
  function askLocation(data){
    console.warn("Location not set");
    axios.get("https://extreme-ip-lookup.com/json/")
    .then((res)=>{
      setLatitude(res.data.lat)
      setLongitude(res.data.lon)
    })
    .catch()

    setLocationOff(true);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if( latitude || longitude){
        api.post(`/messages/new`, {
          message: input,
          name: props.user,
          timestamp: Date.now(),
          room: props.roomName,
          latitude: latitude,
          longitude: longitude
        }).then((res=>{
          console.log("Message Succesfully sent");
          setInput("");
        })).catch(err=>console.log("I am throwing and error:", err));
      }else{
        console.warn("NO LATITUDE");
      }

    }


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

      {
        locationOff === true ? <div className=""><strong>Please turn on your location settings</strong> <br/>(We are busy using an estimated location based on you IP Address)</div> : null
      }

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

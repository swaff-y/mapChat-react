import React, {useEffect, useState} from 'react';
import api from '../api';
import './login.css';

const Login = (props) => {
  const[users, setUsers] = useState([]);
  const[toggleDrop, setToggleDrop] = useState(false);

  useEffect(()=>{
    api.get('/users')
    .then(res => {
        // console.log("The user data",res.data);
      setUsers(res.data);
    })
    .catch(err=>{
      console.warn(err)
    })
  },[])

  const handleToggleDrop = () => {

    if( toggleDrop === true ){
      setToggleDrop(false)
    }else if(toggleDrop === false){
      setToggleDrop(true)
    }
  }

  return(
    <>
      <div className="dropdown">
        <button onClick={handleToggleDrop} className="dropbtn">Select User</button>

          {
            toggleDrop === true
            ?
            <div id="myDropdown" className="dropdown-content">
              <a href="#/room/SEI40/User1">User1</a>
              <a href="#/room/SEI40/User2">User2</a>
              <a href="#/room/SEI40/User3">User3</a>
              <a href="#/room/SEI40/User4">User4</a>
              <a href="#/room/SEI40/User5">User5</a>
              <a href="#/room/SEI40/User6">User6</a>
              <a href="#/room/SEI40/User7">User7</a>
              <a href="#/room/SEI40/User8">User8</a>
              <a href="#/room/SEI40/User9">User9</a>
              <a href="#/room/SEI40/User10">User10</a>
              <a href="#/room/SEI40/User11">User11</a>
            </div>
            :
            null
          }
      </div>
    </>
  )
}

export default Login;

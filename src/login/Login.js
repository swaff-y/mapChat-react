import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import api from '../api';
import './login.css';

const Login = (props) => {
  const[users, setUsers] = useState([]);

  useEffect(()=>{
    api.get('/users')
    .then(res => {
        console.log("The user data",res.data);
      setUsers(res.data);
    })
    .catch(err=>{
      console.warn(err)
    })
  },[])

  return(
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            users.map((user, index)=><Dropdown.Item href={"#/room/" + user.lastRoom + "/" + user.name}>{user.name}</Dropdown.Item>)
          }
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="login">
        <h2 className="center_align">Login</h2>
        <form className="frm">
          <div className="cont">
            <label for="uname"><b>Username</b></label>
            <input className="inp" type="text" placeholder="Enter Username" name="uname" required />

            <label for="psw"><b>Password</b></label>
            <input className="inp" type="password" placeholder="Enter Password" name="psw" required />

            <button className="butt" type="submit">Login</button>
          </div>
        </form>
      </div>
      <div className="login">
      <h2 className="center_align">Sign Up</h2>
        <form className="frm">
          <div className="cont">
            <label for="uname"><b>Username</b></label>
            <input className="inp" type="text" placeholder="Enter Username" name="uname" required />

            <label for="psw"><b>Password</b></label>
            <input className="inp" type="password" placeholder="Enter Password" name="psw" required />
            <label for="psw"><b>Confirm Password</b></label>
            <input className="inp" type="password" placeholder="Enter Password" name="psw" required />

            <button className="butt" type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;

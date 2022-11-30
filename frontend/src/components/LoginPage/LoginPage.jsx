import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
// import { UserContext } from '../../App'
import userService from "../../utils/userService"
import {useNavigate} from 'react-router-dom'

function LoginPage({user, setUser}) {
  const navigate = useNavigate();
const [creds, setCreds] = useState({
  username: '',
  password: ''
})

function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token")
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  await userService.login(creds);
  let freshUser = userService.getToken();
  setUser(freshUser);
  navigate("/");
}

  return (
    <div>LoginPage

      <form>
        <label> Username
          <input type="text" value={creds.username} onChange={(e) => setCreds((oldState) => ({...oldState, username: e.target.value}))} />
        </label>
        <label> Password
          <input type="password" value={creds.password} onChange={(e) => setCreds((oldState) => ({ ...oldState, password: e.target.value }))} />
        </label>
        <button onClick={handleSubmit}>submit</button></form>
    </div>
  )
}

export default LoginPage
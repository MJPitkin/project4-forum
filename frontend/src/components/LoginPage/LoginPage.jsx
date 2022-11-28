import React from 'react'
import { useState } from 'react'

function LoginPage() {

const [user, setUser] = useState({
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

function handleSubmit(e) {
  e.preventDefault();
  return fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    mode: "cors",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify(user),
  })
  .then((res) => {
    if (res.ok) return res.json();
    throw new Error("bad credentials");
  })
  .then(({token})=> setToken(token));
}

  return (
    <div>LoginPage

      <form>
        <label> Username
          <input type="text" value={user.username} onChange={(e) => setUser((oldState) => ({...oldState, username: e.target.value}))} />
        </label>
        <label> Password
          <input type="password" value={user.password} onChange={(e) => setUser((oldState) => ({ ...oldState, password: e.target.value }))} />
        </label>
        <button onClick={handleSubmit}>submit</button></form>
    </div>
  )
}

export default LoginPage
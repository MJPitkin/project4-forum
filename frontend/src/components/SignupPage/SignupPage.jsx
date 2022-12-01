import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './SignupPage.css'

function SignupPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
  })

async function handleSubmit(e) {
  e.preventDefault();
  await fetch('http://127.0.0.1:8000/signup/', {
    method: "POST",
    mode: "cors",
    headers: new Headers({
      'Content-Type': "application/json"
    }),
    body: JSON.stringify(details)
  }).catch(error => console.error(error))
  navigate('/login');
}

  return (
    <div className='signup'><h3>Sign up</h3>
      <form className='signupForm'><label>Username<input type='text' value={details.username} onChange={(e) => setDetails((oldState) => ({ ...oldState, username: e.target.value }))}></input></label>
        <label>Email<input type='email' value={details.email} onChange={(e) => setDetails((oldState) => ({ ...oldState, email: e.target.value }))}></input></label>
        <label>Password<input type='password' value={details.password} onChange={(e) => setDetails((oldState) => ({ ...oldState, password: e.target.value }))}></input></label>
        <button onClick={handleSubmit}>submit</button></form>
    </div>
  )
}

export default SignupPage
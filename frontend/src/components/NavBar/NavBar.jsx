import React from 'react'
import {Link} from 'react-router-dom'
import userService from '../../utils/userService'
import './NavBar.css'

function NavBar({user, setUser}) {
    function signout() {
        setUser({})
        userService.logout();
    }

    let nav = localStorage.getItem("token") ? <div>Welcome back, {user.username} | <Link className='loginTab' to='/' onClick={signout}>Log out</Link></div> : <div><Link className='loginTab' to={'login/'}>login</Link> | <Link className='loginTab' to={'signup/'}>sign up</Link></div>
  return (
      <header className='NavBar'><Link className='homeLink' to='/'>Wall Scrawl</Link> {nav}
    
    
    
    {/* user:{user.username} <Link to={'login/'}>login</Link> <Link to={'signup/'}>signup</Link> <button onClick={signout}>Logout</button> */}
    </header>
  )
}

export default NavBar
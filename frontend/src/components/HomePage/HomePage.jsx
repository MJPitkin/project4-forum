import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'

import userService from '../../utils/userService'

function HomePage({user, setUser}) {
  const [boards, setBoards] = useState([])
  console.log(user);

  async function getBoards() {
    return fetch("http://127.0.0.1:8000/boards/", {
      method: 'GET',
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        throw new Error("board retrieve error");
  }).then ((thing) => {
    console.log(thing);
    setBoards(thing);
    console.log(boards);
  })
  }

  useEffect(() => {
   getBoards()
 
  },[])

  function signout() {
    setUser({})
    userService.logout();
  }

  return (
    
    <div>
      {console.log(boards)}
            <div>HomePage, user:{user.username} <Link to={'login/'}>login</Link> <Link to={'signup/'}>signup</Link> <button onClick={signout}>Logout</button>
      boards: {boards.map((board) => (
        <div key={board.id}>
          board topic: <Link to={`boards/${board.id}`}>{board.topic}</Link> board ID: {board.id}
          </div>
      ))} 
      </div>
    </div>
  )
}

// {
//   boards.map((topic) => (
//     <div>
//       Board Topic: {topic} Board ID:
//     </div>
//   )
//   )
// }


export default HomePage
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'

function HomePage(user) {
  const [boards, setBoards] = useState({})
  console.log(user);

  async function getBoards() {
    return fetch("http://127.0.0.1:8000/boards/", {
      method: 'GET',
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Thread retrieve error");
  }).then ((res) => setBoards(res))
  }

  useEffect(() => {
   getBoards()
  },[])

  return (
      <div>HomePage, user:{user.user.username} 
      boards: {boards.map((board) => (
        <div key={board.id}>
          board topic: <Link to={`boards/${board.id}`}>{board.topic}</Link> board ID: {board.id}
          </div>
      ))} 
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
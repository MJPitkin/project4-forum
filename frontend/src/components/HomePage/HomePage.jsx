import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import './HomePage.css'

import userService from '../../utils/userService'

function HomePage({user, setUser}) {
  const [boards, setBoards] = useState([])
  console.log(user);

  async function getBoards() {
    return fetch("https://project4-wallscrawl.herokuapp.com/boards/", {
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


  return (
    
    <div className='homePage'>
      {console.log(boards)}
            <div className='boardsList'>
      {boards.map((board) => (
          <Link key={board.id} className='boardLink' to={`boards/${board.id}`}>{board.topic}</Link>
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
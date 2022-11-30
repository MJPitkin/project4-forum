import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

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
    <div>HomePage, user:{user.user.username} board: {boards.map((topic, id) => (
      <div key={id}>
        Board Topic: {topic} Board ID: {id}
      </div>
    ))}</div>
  )
}


export default HomePage
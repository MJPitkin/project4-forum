import React from 'react'
import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

function BoardPage() {
  const {boardId} = useParams();

  const [threads, setThreads] = useState([])

  async function getThreads() {
    return fetch(`http://127.0.0.1:8000/boards/${boardId}/threads/`, {
      method: 'GET',
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        throw new Error("Thread retrieve error");
      }).then((thing) => {
        console.log(thing);
        setThreads(thing);
        console.log(threads);
      })
  }

  useEffect(() => {
    getThreads()

  }, [])

  return (
    <div>BoardPage: board ID: {boardId}
    
      boards: {threads.map((thread) => (
        <div key={thread.id}>
          thread title: <Link to={`threads/${thread.id}`} relative='path'>{thread.title}</Link> thread ID: {thread.id}
        </div>
      ))}
      {localStorage.getItem("token") ? <Link to='threadform' relative='path'>post new thread</Link> : <Link to='/login'>Please log in to post a new thread</Link>}</div>
  )
}

export default BoardPage
import React from 'react'
import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './BoardPage.css'

function BoardPage() {
  const {boardId} = useParams();

  const [threads, setThreads] = useState([])
  const [board, setBoard] = useState({})

  async function getBoards() {
    return fetch(`http://127.0.0.1:8000/boards/${boardId}/`, {
      method: 'GET',
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        throw new Error("board retrieve error");
      }).then((thing) => {
        console.log(thing);
        setBoard(thing);
        console.log(board);
      })
  }


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
    getBoards()
    getThreads()
  }, [])

  return (
    <div className='boardPage'><h3>{board.topic}</h3>
      {localStorage.getItem("token") ? <Link className='postThreadLink' to='threadform' relative='path'>post new thread</Link> : <Link className='postThreadLink' to='/login'>Please log in to post a new thread</Link>}
      <div className='threadList'>{threads.map((thread) => (
        <div className='threadElement' key={thread.id}>
          <span>thread title: <br/><Link className='threadLink' to={`threads/${thread.id}`} relative='path'>{thread.title}</Link></span>  <span className='threadAuthor'>Author: <br/> {thread.authorname}</span>
        </div>
      ))}
      </div>
</div>
  )
}

export default BoardPage
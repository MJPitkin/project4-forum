import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'

function ThreadPage(user) {
  console.log(user);
  const {boardId, threadId} = useParams();
  console.log(`${boardId}, ${threadId}`)

  const [posts, setPosts] = useState([])
  const [thread, setThread] = useState({})

  async function getPosts() {
    return fetch(`http://127.0.0.1:8000/boards/${boardId}/threads/${threadId}/posts/`, {
      method: 'GET',
      headers: new Headers({ 
        "Content-Type": "application/json" 
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        throw new Error("Thread retrieve error");
      }).then((thing) => {
        console.log(thing);
        setPosts(thing);
        console.log(posts);
      })
  }

  async function getThread() {
    return fetch(`http://127.0.0.1:8000/boards/${boardId}/threads/${threadId}/`, {
      method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
        throw new Error("Thread retrieve error");
      }).then((thing) => {
        console.log(thing);
        setThread(thing);
        console.log(thread);
      })
  }

  useEffect(() => {
    getThread();
    getPosts();
  }, [])

  return (
    <div>Title: {thread.title} by {thread.authorname}

      boards: {posts.map((post) => (
        <div key={post.id}>
          author ID: {post.authorname} post content: {post.content} post ID: {post.id}
        </div>
      ))}
      {localStorage.getItem("token") ? <Link to="postform" relative="path">post reply</Link> : <Link to='/login'>Please log in to reply</Link>}
    </div>
  )
}

export default ThreadPage
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './PostPage.css'


function PostPage(user) {
    const navigate = useNavigate();
const {boardId, threadId} = useParams()
const [reply, setReply] = useState({
    author: user.user.sub,
    content: '',
    thread: threadId
})
console.log(reply);
async function handleSubmit(e) {
e.preventDefault();
    await fetch(`https://project4-wallscrawl.herokuapp.com/boards/${boardId}/threads/${threadId}/posts/`, {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        credentials: 'include',
        headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" }),
        body: JSON.stringify(reply),
    }).catch(error => console.error(error))
    navigate(`/boards/${boardId}/threads/${threadId}`);
}
  return (
    <div className='reply'><h3>Reply to thread</h3>
          <form className='replyForm'><label>Reply:<textarea value={reply.content} onChange={(e) => setReply((oldState) => ({ ...oldState, content: e.target.value })) }></textarea></label>
            <button onClick={handleSubmit}>submit</button></form>
    </div>
  )
}

export default PostPage